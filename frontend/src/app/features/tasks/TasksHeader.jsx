import { Box, Typography } from "@mui/material";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import { useTasksUI } from "../../providers/NewTaskProvider";

export const TasksHeader = () => {
  const buttonTitle = <AddIcon />;
  const {openModal} = useTasksUI();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        pb: 3,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "start" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          My Tasks
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
        <ButtonComponent
          buttonTitle={buttonTitle}
          onClick={() => openModal()}
          sx={{
            backgroundColor: "var(--primary)",
            color: "white",
            width: "30%",
            transition: "0.3s ease-in",
            "&:hover": { backgroundColor: "var(--secondary)" },
          }}
        />
      </Box>
    </Box>
  );
};
