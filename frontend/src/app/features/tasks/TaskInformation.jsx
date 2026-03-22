import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography, Divider, boxClasses } from "@mui/material";
import { EditableTaskField } from "./EditableTaskField";

export const TaskInformation = ({ taskSelected }) => {
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {editTitle ? (
          <Box sx={{ mt: 2 }}>
            <EditableTaskField
              value={taskSelected.title}
              idTaskRecived={taskSelected.id}
              typeOfField={"title"}
            />
          </Box>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {taskSelected.title}
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
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setEditDescription(true)}
          />
        </Box>
        {editDescription ? (
          <Box sx={{ mt: 2 }}>
            <EditableTaskField
              value={taskSelected.description}
              idTaskRecived={taskSelected.id}
              typeOfField={"description"}
            />
          </Box>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {taskSelected.description}
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
