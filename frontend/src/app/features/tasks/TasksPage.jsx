import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TasksHeader } from "./TasksHeader";
import { TasksItem } from "./TasksItem";
import { TaskSearcher } from "./TaskSearcher";
import { getTasksList, deleteTask } from "../../api/tasks.api";
import './TasksPage.css';

export const TasksPage = () => {
  const [tasksList, setTasksList] = useState([]);
  useEffect(() => {
    // Send request to get Tasks:
    const sendRequestToGetTasks = async () => {
      const result = await getTasksList();
      console.log('result: ', result.tasks)
      setTasksList(result.tasks);
    };
    sendRequestToGetTasks();
  }, []);

  if(tasksList.length > 0) return <TasksItem tasksList={tasksList} deleteTask={deleteTask}/>
  return (
    <Box sx={{bgColor: 'background.paper', width: '100%', pt: 3}}>
        <TasksHeader />
        <TaskSearcher />
    </Box>
  )
}