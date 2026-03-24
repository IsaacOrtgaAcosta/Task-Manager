import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography, Divider, boxClasses } from "@mui/material";
import { EditableTaskField } from "./EditableTaskField";

export const TaskInformation = ({ taskSelected, setOpenModal }) => {
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [taskData, setTaskData] = useState(taskSelected);

  useEffect(() => {
    setTaskData(taskSelected);
  }, [taskSelected]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {editTitle ? (
          <Box sx={{ mt: 2 }}>
            <EditableTaskField
              value={taskData.title}
              idTaskRecived={taskData.id}
              typeOfField={"title"}
              setOpenModal={setOpenModal}
              setEditTitle={setEditTitle}
              setTaskData={setTaskData}
            />
          </Box>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {taskData.title}
            </Typography>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setEditTitle(true)}
            />
          </>
        )}
      </Box>
      <Divider sx={{ m: 4 }}></Divider>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontWeight: "500", textDecoration: "underline" }}
            component="h5"
          >
            Description of the task:
          </Typography>
          {!editDescription ? (
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setEditDescription(true)}
            />
          ) : (
            ""
          )}
        </Box>
        {editDescription ? (
          <Box sx={{ mt: 2 }}>
            <EditableTaskField
              value={taskData.description}
              idTaskRecived={taskData.id}
              typeOfField={"description"}
              setOpenModal={setOpenModal}
              setEditDescription={setEditDescription}
              setTaskData={setTaskData}
            />
          </Box>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {taskData.description}
          </Typography>
        )}
      </Box>
      <Divider sx={{ mt: 4 }}></Divider>
      <Box sx={{ mt: 4 }}>
        <Typography>
          <Typography
            sx={{ fontWeight: "500", textDecoration: "underline" }}
            component="span"
          >
            Created at:
          </Typography>
          &nbsp;{taskSelected.createdAt}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <Typography
            sx={{ fontWeight: "500", textDecoration: "underline" }}
            component="span"
          >
            Due date:
          </Typography>
          &nbsp;{taskSelected.completedOrDueDate}
        </Typography>
      </Box>
    </Box>
  );
};
