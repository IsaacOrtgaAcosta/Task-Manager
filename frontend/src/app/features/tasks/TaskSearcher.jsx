import React from "react";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import { Box } from "@mui/material";

export const TaskSearcher = () => {
  return (
    <Box sx={{px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3}}>
      <TextFieldComponent inputLabel="Search Task..." helperText="" />
    </Box>
  );
};
