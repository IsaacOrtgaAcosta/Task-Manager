import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { TasksHeader } from "./TasksHeader";
import { TasksItem } from "./TasksItem";
import { TaskSearcher } from "./TaskSearcher";
import { getTasksList } from "../../api/tasks.api";
import "./TasksPage.css";
import { NoTask } from "./NoTask";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { useTasksUI } from "../../providers/NewTaskProvider";
import { NewTask } from "./NewTask";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";

export const TasksPage = () => {
  const [tasksList, setTasksList] = useState([]);
  const { openNewTaskModal, closeModal } = useTasksUI();
  const [loading, setLoading] = useState(false);
  // Send request to get Tasks:
  // We use useCallback to prevent a new version of fetchTasks from being generated on every render
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTasksList();
      setTasksList(result.tasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <>
        <SpinnerComponent />
      </>
    );
  }

  if (tasksList.length > 0) {
    return (
      <Box sx={{ bgColor: "background.paper", width: "100%", pt: 3 }}>
        <TasksHeader />
        <TaskSearcher />
        <TasksItem
          tasksList={tasksList}
          setTasksList={setTasksList}
          fetchTasks={fetchTasks}
        />
      </Box>
    );
  } else {
    return (
      <>
        <Box sx={{ bgColor: "background.paper", width: "100%", pt: 3 }}>
          <TasksHeader />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoTask />
          </Box>
        </Box>
        <Box>
          <NewTask open={openNewTaskModal} onClose={closeModal} />
        </Box>
      </>
    );
  }
};
