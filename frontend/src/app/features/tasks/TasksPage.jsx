import { Box } from "@mui/material";
import { TasksHeader } from "./TasksHeader";
import { TasksItem } from "./TasksItem";
import { TaskSearcher } from "./TaskSearcher";

export const TasksPage = () => {

  return (
    <Box sx={{bgColor: 'background.paper', width: '100%', pt: 3}}>
        <TasksHeader />
        <TaskSearcher />
        <TasksItem />
    </Box>
  )
}