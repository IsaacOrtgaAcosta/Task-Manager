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
import { PaginationComponent } from "../../shared/components/PaginationComponent";

export const TasksPage = () => {
  const [tasksList, setTasksList] = useState([]);
  const { openNewTaskModal, closeModal } = useTasksUI();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  const itemsPerPage = 10;

  // Send request to get Tasks:
  // We use useCallback to prevent a new version of fetchTasks from being generated on every render
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTasksList({
        page,
        limit: itemsPerPage,
      });
      setTasksList(result.tasks);
      setTotalTasks(result.total);
      if (page > Math.ceil(result.total / itemsPerPage)) {
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading) {
    return (
      <>
        <SpinnerComponent />
      </>
    );
  }

  if (tasksList.length > 0) {
    return (
      <>
        <Box sx={{ bgcolor: "background.paper", width: "100%", pt: 3 }}>
          <TasksHeader />
          <TaskSearcher />
          <TasksItem
            tasksList={tasksList}
            setTasksList={setTasksList}
            fetchTasks={fetchTasks}
          />
          <PaginationComponent
            page={page}
            count={Math.ceil(totalTasks / itemsPerPage)}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
        <Box>
          <NewTask
            open={openNewTaskModal}
            onClose={closeModal}
            fetchTasks={fetchTasks}
            setPage={setPage}
          />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ bgcolor: "background.paper", width: "100%", pt: 3 }}>
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
          <NewTask
            open={openNewTaskModal}
            onClose={closeModal}
            fetchTasks={fetchTasks}
            setPage={setPage}
          />
        </Box>
      </>
    );
  }
};
