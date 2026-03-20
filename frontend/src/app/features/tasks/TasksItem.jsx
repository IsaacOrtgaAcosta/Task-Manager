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
  Typography,
  Grid,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { getTaskById } from "../../api/tasks.api";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { formatDate } from "../../utils/formatter";
import { deleteTask } from "../../api/tasks.api";

export const TasksItem = ({ tasksList }) => {
  const [checked, setChecked] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({
    completedAt: "",
    createdAt: "",
    description: "",
    id: "",
    title: "",
    updatedAt: "",
    user_id: "",
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

  const handleOpenModal = async () => {
    const result = await getTaskById(activeTaskId);
    console.log(result);
    const taskCompleted =
      result.task.completed_at !== null
        ? result.task.completed_at
        : "This task is not completed yet";
    setTaskSelected((prev) => ({
      ...prev,
      id: result.task.id,
      completedAt: taskCompleted,
      title: result.task.title,
      description: result.task.description,
      createdAt: formatDate(result.task.created_at),
    }));
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const confirmToDelete = async (taskId) => {
    console.log('ENTRA AQUÍ: ', taskId)
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {}
  };

  return (
    <>
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
              confirmToDelete(activeTaskId);
              handleCloseMenu();
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
          title={taskSelected.title}
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
                    onClick={() => confirmToDelete(taskSelected.id)}
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
                    buttonTitle="Edit"
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
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontWeight: "500", textDecoration: 'underline' }} component="h5">
                Description of the task:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {taskSelected.description}
              </Typography>
            </Box>
            <Divider sx={{mt: 4}}></Divider>
            <Box sx={{ mt: 4 }}>
              <Typography>
                <Typography sx={{ fontWeight: "500", textDecoration: 'underline' }} component="span">
                  Created At:
                </Typography>
                &nbsp;{taskSelected.createdAt}
              </Typography>
              <Typography sx={{mt: 2}}>
                <Typography sx={{ fontWeight: "500", textDecoration: 'underline'  }} component="span">
                  Completed at:
                </Typography>
                &nbsp;{taskSelected.completedAt}
              </Typography>
            </Box>
          </>
        </ModalComponent>
      )}
    </>
  );
};
