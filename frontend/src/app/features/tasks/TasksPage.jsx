import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { TasksHeader } from "./TasksHeader";
import { TasksItem } from "./TasksItem";
import { TaskSearcher } from "./TaskSearcher";
import { getTasksList } from "../../api/tasks.api";
import "./TasksPage.css";
import { NoTask } from "./NoTask";

export const TasksPage = () => {
  const [tasksList, setTasksList] = useState([]);
  // Send request to get Tasks:
  const fetchTasks = useCallback(async () => {
    try {
      const result = await getTasksList();
      setTasksList(result.tasks);
      console.log("Task: ", taskList);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
      <Box sx={{ bgColor: "background.paper", width: "100%", pt: 3 }}>
        <TasksHeader />
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <NoTask />
        </Box>
      </Box>
    );
  }
};
