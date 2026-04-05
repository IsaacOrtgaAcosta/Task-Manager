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
import { useFilteredTasks } from "../../shared/hooks/useFilteredTasks.jsx";

export const TasksPage = () => {
  // Stores the current list of tasks retrieved from backend (paginated)
  const [tasksList, setTasksList] = useState([]);
  // UI state for modal (global state handled via context)
  const { openNewTaskModal, closeModal } = useTasksUI();
  // Loading state for async operations (fetching tasks)
  const [loading, setLoading] = useState(false);
  // Current pagination page
  const [page, setPage] = useState(1);
  // Total number of tasks (used to calculate total pages)
  const [totalTasks, setTotalTasks] = useState(0);
  // Search input state (used for client-side filtering)
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;

  /**
   * Fetch tasks from backend with pagination.
   * Wrapped in useCallback to avoid unnecessary re-creations,
   * especially because it's used inside useEffect dependencies.
   */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTasksList({
        page,
        limit: itemsPerPage,
      });
      setTasksList(result.tasks);
      setTotalTasks(result.total);

      // If current page exceeds total pages (e.g. after deletion),
      // reset to first page to avoid empty results
      if (page > Math.ceil(result.total / itemsPerPage)) {
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  //Fetch tasks whenever page changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //Scroll to top when page changes (UX improvement for pagination)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filteredTasks = useFilteredTasks(tasksList, search, "title");

  // Prevents rendering content before data is ready
  if (loading) {
    return (
      <>
        <SpinnerComponent />
      </>
    );
  }

  // TASKS EXIST:
  if (tasksList.length > 0) {
    return (
      <>
        <Box sx={{ bgcolor: "background.paper", width: "100%", pt: 3 }}>
          <TasksHeader />
          <TaskSearcher search={search} onSearchChange={setSearch} />
          <TasksItem
            tasksList={tasksList}
            filteredTasks={filteredTasks}
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
  }

  //NO TASKS EXIST AT ALL
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
};
