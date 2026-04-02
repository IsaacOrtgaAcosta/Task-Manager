import { useState } from "react";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import {
  Box,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";
import { saveNewTask } from "../../api/tasks.api";
import { ChildModalComponent } from "../../shared/components/ChildModalComponent";
import { useNavigate } from "react-router";

export const NewTask = ({ open, onClose, fetchTasks }) => {
  const [loading, setLoading] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: null,
    dueDate: null,
    priority: "",
  });

  const sendNewTask = async () => {
    setLoading(true);
    try {
      const payload = {
        ...newTask,
        startDate: newTask.startDate?.format("YYYY-MM-DD HH:mm:ss"),
        dueDate: newTask.dueDate?.format("YYYY-MM-DD HH:mm:ss"),
      };
      await saveNewTask(payload);
      onClose();
      setOpenChildModal(true);

      setTimeout(() => {
        setOpenChildModal(false);
        fetchTasks();
      }, 3000);
      setNewTask({
        title: "",
        description: "",
        startDate: null,
        dueDate: null,
        priority: "",
      });
    } catch (error) {
      setErrorMessage(true);
      console.error("Something was wrong saving the new task", error);
    } finally {
      setLoading(false);
    }
  };

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
                {errorMessage && (
                  <Typography
                    sx={{ color: "var(--primary)", pt: 2, fontWeight: "bold" }}
                  >
                    Something was wront, try again or wait a few minutes
                  </Typography>
                )}
              </Box>
              <Divider></Divider>
              <Box>
                <Box>
                  <TextFieldComponent
                    value={newTask.title}
                    onChange={(e) => {
                      setNewTask((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }}
                    inputLabel="Title"
                  ></TextFieldComponent>
                </Box>
                <Box>
                  <TextFieldComponent
                    value={newTask.description}
                    onChange={(e) => {
                      setNewTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                    }}
                    inputLabel="Description"
                  ></TextFieldComponent>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Start day"
                    value={newTask.startDate}
                    onChange={(newValue) =>
                      setNewTask((prev) => ({
                        ...prev,
                        startDate: newValue,
                      }))
                    }
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Due day"
                    value={newTask.dueDate}
                    onChange={(newValue) =>
                      setNewTask((prev) => ({
                        ...prev,
                        dueDate: newValue,
                      }))
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="p"
                  sx={{
                    display: "flex",
                    justifySelf: "center",
                    pt: 2,
                    pb: 2,
                    fontSize: "18px",
                  }}
                >
                  Priority
                </Typography>

                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifySelf: "center",
                  }}
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
              </Box>
            </>
          }
          actions={
            <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
              <ButtonComponent
                buttonTitle={"Save"}
                onClick={() => sendNewTask()}
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
      <ChildModalComponent
        openChildModal={openChildModal}
        setOpenChildModal={setOpenChildModal}
        childModalProps={{
          title: "New task saved",
          text: "The task has been save",
        }}
      />
      {loading && <SpinnerComponent />}
    </>
  );
};
