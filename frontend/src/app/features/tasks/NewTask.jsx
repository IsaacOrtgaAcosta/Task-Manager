import { useState } from "react";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import { Box, Typography, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ButtonComponent } from "../../shared/components/ButtonComponent";

export const NewTask = ({ open, onClose }) => {
  const [startDate, setStartDate] = useState();
  const [dueDate, setDueDate] = useState();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalComponent
          open={open}
          onClose={onClose}
          children={
            <>
              <Box sx={{ pb: 2 }}>
                <Typography variant="h5">New Task</Typography>
              </Box>
              <Divider></Divider>
              <Box>
                <Box>
                  <TextFieldComponent inputLabel="Title"></TextFieldComponent>
                </Box>
                <Box>
                  <TextFieldComponent inputLabel="Description"></TextFieldComponent>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Start day"
                    value={startDate}
                    onChange={(newStartDateValue) =>
                      setStartDate(newStartDateValue)
                    }
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Due day"
                    value={dueDate}
                    onChange={(newDueDateValue) => setDueDate(newDueDateValue)}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant='p' sx={{display: 'flex', justifySelf: 'center',pt: 2, pb: 2, fontSize: '18px'}}>Priority</Typography>
                <FormGroup sx={{display: 'flex', flexDirection: 'row', justifySelf: 'center'}}>
                    <FormControlLabel control={<Checkbox />} label="Low"/>
                    <FormControlLabel control={<Checkbox />} label="Medium"/>
                    <FormControlLabel control={<Checkbox />} label="High"/>
                </FormGroup>
              </Box>
            </>
          }
          actions={
            <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
              <ButtonComponent
                buttonTitle={"Save"}
                sx={{
                  backgroundColor: "var(--primary)",
                  minWidth: "200px",
                  transition: "0.3s ease-in",
                  "&:hover": {
                    backgroundColor: "var(--secondary)",
                  },
                }}
              />
            </Box>
          }
        />
      </LocalizationProvider>
    </>
  );
};
