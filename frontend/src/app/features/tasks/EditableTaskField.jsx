import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import CheckIcon from "@mui/icons-material/Check";
import { updateTask } from "../../api/tasks.api";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";

export const EditableTaskField = ({
  value,
  idTaskRecived,
  typeOfField,
  setEditTitle,
  setEditDescription,
  setTaskData
}) => {
  const [loading, setLoading] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const saveTaskModification = async () => {
    console.log('newValue: ', newValue)
    try {
      setLoading(true);
      await updateTask(idTaskRecived, {
        newValue,
        typeOfField,
      });

      setTaskData((prev) => ({
        ...prev,
        [typeOfField]: newValue,
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      if (typeOfField === "title") setEditTitle(false);
      if (typeOfField === "description") setEditDescription(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid
        container
        size={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid size={9}>
          <TextFieldComponent
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          />
        </Grid>
        <Grid size={2}>
          <CheckIcon
            sx={{ cursor: "pointer" }}
            onClick={saveTaskModification}
          />
        </Grid>
      </Grid>
      {loading && <SpinnerComponent loading={loading} />}
    </>
  );
};
