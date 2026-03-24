import { Fragment, useEffect, useState } from "react";
import {
  Box,
  ListItem,
  List,
  Checkbox,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { getTaskById } from "../../api/tasks.api";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { formatDate } from "../../utils/formatter";
import { deleteTask } from "../../api/tasks.api";
import { TaskInformation } from "./TaskInformation";
import { ChildModalComponent } from "../../shared/components/ChildModalComponent";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";

export const TasksItem = ({ tasksList, setTasksList }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({
    completedOrDueDate: "",
    due_date: "",
    createdAt: "",
    description: "",
    id: "",
    title: "",
  });
  const open = Boolean(anchorEl);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const openTaskMenu = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setActiveTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getTaskData = async () => {
    const result = await getTaskById(activeTaskId);
    console.log(result);
    const taskCompleted =
      result.task.completed_at !== null
        ? `This task was completed at ${formatDate(result.task.completed_at)}`
        : formatDate(result.task.due_date);
    setTaskSelected((prev) => ({
      ...prev,
      id: result.task.id,
      completedOrDueDate: taskCompleted,
      title: result.task.title,
      description: result.task.description,
      createdAt: formatDate(result.task.created_at),
    }));
  };

  const handleOpenModal = async () => {
    try {
      await getTaskData();
      setOpenModal(true);
      handleCloseMenu();
    } catch (error) {
      console.error("An error ocurred trying get data from the task", error);
    }
  };

    const askAfterDelete = async () => {
    try {
      await getTaskData();
      setOpenChildModal(true);
      handleCloseMenu();
    } catch (error) {
      console.error("An error ocurred trying get data from the task", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseChildModal = () => {
    setOpenChildModal(false);
  };

  const confirmedToDeleteTask = async (taskId) => {
    console.log("Entrando para eliminar: ", taskId);
    setLoading(true);
    try {
      await deleteTask(taskId);
      handleCloseChildModal();
      handleCloseModal();
      setTasksList((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error trying to delete the task", error);
    } finally {
      setLoading(false);
    }
  };



  const handleCheckAllTasks = (allIdTasks) => {
    // Check all task when is pressend
  };

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ pl: 1.5, minWidth: 36 }}>
          <Checkbox edge="start" onChange={handleCheckAllTasks()} />
        </ListItemIcon>
        <ListItemText primary="Select all" />
      </ListItem>
      <Divider></Divider>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasksList.map((task) => {
          const labelId = `checkbox-list-secondary-label-${task.title}`;
          return (
            <Fragment key={task.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <Button
                      id={`tasks-buttonMenu-${task.id}`}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => openTaskMenu(e, task.id)}
                    >
                      <MoreHorizIcon sx={{ color: "var(--secondary)" }} />
                    </Button>
                  </Box>
                }
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(task.id)}
                    checked={checked.includes(task.id)}
                    slotProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={task.title}
                  slotProps={{
                    primary: {
                      noWrap: true,
                      sx: {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    },
                  }}
                  sx={{ overflow: "hidden" }}
                />
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem
            sx={{ color: "var(--secondary-text)" }}
            onClick={handleOpenModal}
          >
            Show
          </MenuItem>
          <MenuItem
            sx={{ color: "var(--secondary-text)" }}
            onClick={handleCloseMenu}
          >
            Completed
          </MenuItem>
          <MenuItem
            sx={{ color: "var(--error)" }}
            onClick={() => {
              askAfterDelete();
              // handleCloseMenu();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </List>
      {openModal && (
        <ModalComponent
          open={openModal}
          onClose={handleCloseModal}
          actions={
            <>
              <Grid
                container
                spacing={10}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Grid size={5}>
                  <ButtonComponent
                    type="submit"
                    buttonTitle="Delete"
                    size={"large"}
                    onClick={() => askAfterDelete(taskSelected.id)}
                    sx={{
                      width: "100%",
                      height: "50px",
                      mt: 4,
                      fontSize: "17px",
                      textTransform: "none",
                      letterSpacing: "1.2px",
                      backgroundColor: "var(--primary)",
                    }}
                  />
                </Grid>
                <Grid size={5}>
                  <ButtonComponent
                    type="submit"
                    buttonTitle="Completed"
                    size={"large"}
                    sx={{
                      width: "100%",
                      height: "50px",
                      mt: 4,
                      fontSize: "17px",
                      textTransform: "none",
                      letterSpacing: "1.2px",
                      backgroundColor: "var(--secondary)",
                    }}
                  />
                </Grid>
              </Grid>
            </>
          }
        >
          <>
            <TaskInformation
              taskSelected={taskSelected}
              setOpenModal={setOpenModal}
            />
          </>
        </ModalComponent>
      )}
      {openChildModal && (
        <ChildModalComponent
          subModalTitle={"Confirm before delete"}
          subModalText={`Do you want to delete the task: ${taskSelected.id}`}
          openChildModal={openChildModal}
          setOpenChildModal={setOpenChildModal}
          subModalActions={
            <>
              <Button
                onClick={() => {
                  confirmedToDeleteTask(taskSelected.id);
                }}
              >
                Confirm
              </Button>
            </>
          }
        />
      )}
      {loading && <SpinnerComponent />}
    </>
  );
};
