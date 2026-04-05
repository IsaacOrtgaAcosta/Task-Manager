import { Fragment, useState } from "react";
import {
  Box,
  ListItem,
  List,
  Checkbox,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { getTaskById } from "../../api/tasks.api";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { formatDate } from "../../utils/formatter";
import { deleteTask, updateTask } from "../../api/tasks.api";
import { TaskInformation } from "./TaskInformation";
import { ChildModalComponent } from "../../shared/components/ChildModalComponent";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";
import { TaskActionsMenu } from "./TaskActionsMenu";

export const TasksItem = ({ tasksList, filteredTasks, fetchTasks }) => {
  // Local loading state for task-level async actions such as delete/update
  const [loading, setLoading] = useState(false);
   // Stores selected task ids from checkboxes
  const [checked, setChecked] = useState([]);
   // Reference element used by MUI menu to position the actions menu
  const [anchorEl, setAnchorEl] = useState(null);
  // Keeps track of the task currently associated with the open actions menu
  const [activeTaskId, setActiveTaskId] = useState(null);
    // Controls the visibility of the task detail modal
  const [openModal, setOpenModal] = useState(false);
    // Controls the visibility of the confirmation modal
  const [openChildModal, setOpenChildModal] = useState(false);
   // Stores the task currently selected to display detailed information in modal
  const [taskSelected, setTaskSelected] = useState({
    isCompleted: "",
    completedOrDueDate: "",
    due_date: "",
    createdAt: "",
    description: "",
    id: "",
    title: "",
  });

  const [childModalProps, setChildModalProps] = useState({
    title: "",
    text: "",
    actions: "",
  });
  const open = Boolean(anchorEl);
  // Toggle selection state for a single task checkbox
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
  // Opens the actions menu for a specific task and stores its id as active
  const openTaskMenu = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setActiveTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Fetches full task information for the currently active task.
   * This is useful because the list view contains only partial task data,
   * while the modal requires richer information.
   */
  const getTaskData = async () => {
    const result = await getTaskById(activeTaskId);
    const taskCompleted =
      result.task.completed_at !== null
        ? `This task was completed at ${formatDate(result.task.completed_at)}`
        : formatDate(result.task.due_date);
    setTaskSelected((prev) => ({
      ...prev,
      isCompleted: result.task.completed_at,
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
      setChildModalProps({
        title: "Confirm before delete the task",
        text: "Are you sure you want to delete the task?",
        actions: (
          <Button
            onClick={() => {
              deleteTaskAfterAsk(activeTaskId);
            }}
          >
            Confirm
          </Button>
        ),
      });
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

  const deleteTaskAfterAsk = async (taskId) => {
    console.log("Entrando para eliminar: ", taskId);
    setLoading(true);
    try {
      await deleteTask(taskId);
      handleCloseChildModal();
      handleCloseModal();
      fetchTasks();
    } catch (error) {
      console.error("Error deleting the task", error);
    } finally {
      setLoading(false);
    }
  };

  const askAfterComplete = (activeTaskId) => {
    setChildModalProps({
      title: "Confirm before complete the task",
      text: "Are you sure you want to complete the task?",
      actions: (
        <Button
          onClick={() => {
            completeTaskAfterAsk(activeTaskId);
          }}
        >
          Confirm
        </Button>
      ),
    });
    setOpenChildModal(true);
  };

  const askAfterNoComplete = (activeTaskId) => {
    setChildModalProps({
      title: "Confirm before mark the task as no completed",
      text: "Are you sure you want to change the state of the task?",
      actions: (
        <Button
          onClick={() => {
            noCompleteTaskAfterAsk(activeTaskId);
          }}
        >
          Confirm
        </Button>
      ),
    });
    setOpenChildModal(true);
  };

  const noCompleteTaskAfterAsk = async (taskId) => {
    console.log("TASKID: ", taskId);
    setLoading(true);
    const typeOfField = "noComplete";
    const newValue = "noCompleted";
    try {
      await updateTask(taskId, {
        typeOfField,
        newValue,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating the task", error);
    } finally {
      setOpenChildModal(false);
      setOpenModal(false);
      fetchTasks();
      setLoading(false);
    }
  };

  const completeTaskAfterAsk = async (taskId) => {
    setLoading(true);
    const typeOfField = "complete";
    const newValue = "completed";
    try {
      await updateTask(taskId, {
        typeOfField,
        newValue,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating the task", error);
    } finally {
      setOpenChildModal(false);
      setOpenModal(false);
      fetchTasks();
      setLoading(false);
    }
  };

  const visibleTaskIds = filteredTasks.map((task) => task.id);
  const areAllVisibleChecked =
    visibleTaskIds.length > 0 &&
    visibleTaskIds.every((taskId) => checked.includes(taskId));
  const someVisibleChecked = visibleTaskIds.some((taskId) =>
    checked.includes(taskId),
  );

  const handleCheckAllTasks = () => {
    if (areAllVisibleChecked) {
      setChecked((prevChecked) =>
        prevChecked.filter((taskId) => !visibleTaskIds.includes(taskId)),
      );
      return;
    }

    setChecked((prevChecked) => [
      ...prevChecked,
      ...visibleTaskIds.filter((taskId) => !prevChecked.includes(taskId)),
    ]);
  };

  const activeTask = tasksList.find((task) => task.id === activeTaskId);

  return (
    <>
      <Fragment>
        <ListItem
          secondaryAction={
            <Box>
              <Button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreHorizIcon sx={{ color: "var(--secondary)" }} />
              </Button>
            </Box>
          }
        >
          <ListItemIcon sx={{ pl: 1.5, minWidth: 36 }}>
            <Checkbox
              edge="start"
              checked={areAllVisibleChecked}
              indeterminate={someVisibleChecked && !areAllVisibleChecked}
              onChange={handleCheckAllTasks}
            />
          </ListItemIcon>
          <ListItemText primary="Select all" />
        </ListItem>
      </Fragment>
      <Divider></Divider>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {filteredTasks.map((task) => {
          const labelId = `checkbox-list-secondary-label-${task.title}`;
          const isCompleted = task.completed_at !== null;
          const priorityColor =
            task.priority === "high"
              ? "var(--primary)"
              : task.priority === "medium"
                ? "var(--warning)"
                : "var(--secondary)";
          return (
            <Fragment key={task.id}>
              <ListItem
                sx={{
                  backgroundColor: isCompleted
                    ? "rgba(76, 175, 80, 0.06)"
                    : "white",
                  boxShadow: isCompleted
                    ? "0 2px 8px rgba(76, 175, 80, 0.15)"
                    : "0 1px 3px rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
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
                <Box sx={{ pl: 2 }}>
                  <Box size={6}>
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
                  </Box>
                  <Box size={6} sx={{ display: "flex", justifyContent: "end" }}>
                    <ListItemText
                      primary={`Priority: ${task.priority}`}
                      slotProps={{
                        primary: {
                          sx: {
                            color: priorityColor,
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
        <TaskActionsMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          items={
            activeTask?.completed_at === null
              ? [
                  {
                    id: "show",
                    label: "Show",
                    onClick: () => handleOpenModal(),
                    color: "var(--secondary-text",
                  },
                  {
                    id: "complete",
                    label: "Complete",
                    onClick: () => askAfterComplete(activeTaskId),
                    color: "var(--secondary-text)",
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    onClick: askAfterDelete,
                    color: "var(--error)",
                  },
                ]
              : [
                  {
                    id: "show",
                    label: "Show",
                    onClick: () => handleOpenModal(),
                    color: "var(--secondary-text",
                  },
                  {
                    id: "noComplete",
                    label: "No complete",
                    onClick: () => askAfterNoComplete(activeTaskId),
                    color: "var(--secondary-text)",
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    onClick: askAfterDelete,
                    color: "var(--error)",
                  },
                ]
          }
          menuListAriaLabelledby={"basic-button"}
        />
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
                {taskSelected.isCompleted !== null ? (
                  ""
                ) : (
                  <Grid size={5}>
                    <ButtonComponent
                      type="submit"
                      buttonTitle="Complete"
                      onClick={() => askAfterComplete(taskSelected.id)}
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
                )}
              </Grid>
            </>
          }
        >
          <>
            <TaskInformation
              taskSelected={taskSelected}
              setOpenModal={setOpenModal}
              fetchTasks={fetchTasks}
            />
          </>
        </ModalComponent>
      )}
      {openChildModal && (
        <ChildModalComponent
          openChildModal={openChildModal}
          setOpenChildModal={setOpenChildModal}
          childModalProps={childModalProps}
        />
      )}
      {loading && <SpinnerComponent />}
    </>
  );
};
