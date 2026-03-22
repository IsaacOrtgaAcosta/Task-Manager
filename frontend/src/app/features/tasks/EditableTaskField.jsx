import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import CheckIcon from "@mui/icons-material/Check";
import { updateTask } from "../../api/tasks.api";

export const EditableTaskField = ({
  value,
  idTaskRecived,
  typeOfField,
}) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const saveTaskModification = () => {
    updateTask(idTaskRecived, {newValue: newValue, typeOfField: typeOfField})
  }
  return (
    <Grid container size={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Grid size={9}>
        <TextFieldComponent value={newValue} onChange={(e) => { ( setNewValue(e.target.value ))}}/>
      </Grid>
      <Grid size={2}>
        <CheckIcon sx={{cursor: 'pointer'}} onClick={saveTaskModification}/>
      </Grid>
    </Grid>
  );
};
