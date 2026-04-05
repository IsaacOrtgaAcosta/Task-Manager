import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import { Box } from "@mui/material";

export const TaskSearcher = ({ search, onSearchChange }) => {
  return (
    <Box
      sx={{
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: 3,
      }}
    >
      <TextFieldComponent
        value={search}
        inputLabel="Search Task..."
        helperText=""
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Box>
  );
};