import { Fragment, useEffect, useState } from "react";
import {
  Box,
  ListItem,
  List,
  Checkbox,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ModalComponent } from "../../shared/components/ModalComponent";

export const TasksItem = ({ tasksList, deleteTask }) => {
  const [checked, setChecked] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const openTaskMenu = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setActiveTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleCloseMenu();
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const sendRequestToDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter(t => t.id !== taskId));
    } catch (error) {}
  };

  return (
    <>
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {tasksList.map((task) => {
        const labelId = `checkbox-list-secondary-label-${task.title}`;
        return (
          <Fragment key={task.id}>
            <ListItem
              secondaryAction={
                <Box>
                  <Button
                    id={`tasks-buttonMenu-${task.id}`}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => openTaskMenu(e, task.id)}
                  >
                    <MoreHorizIcon sx={{ color: "var(--secondary)" }} />
                  </Button>
                </Box>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(task.id)}
                  checked={checked.includes(task.id)}
                  slotProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={task.title}
                slotProps={{
                  primary: {
                    noWrap: true,
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                }}
                sx={{ overflow: "hidden" }}
              />
            </ListItem>
            <Divider />
          </Fragment>
        );
      })}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem sx={{ color: "var(--secondary-text)" }} onClick={handleOpenModal}>
          Show
        </MenuItem>
        <MenuItem sx={{ color: "var(--secondary-text)" }} onClick={handleCloseMenu}>
          Completed
        </MenuItem>
        <MenuItem
          sx={{ color: "var(--error)" }}
          onClick={() => {
            sendRequestToDeleteTask(activeTaskId);
            handleCloseMenu();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </List>
    {openModal && (
      <ModalComponent open={openModal} onClose={handleCloseModal} modalTitle='Este es el modal' modalText='Este es el texto'/>
    )}
    </>
  );
};
