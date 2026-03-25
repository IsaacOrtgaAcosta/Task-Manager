import { Box, Menu, MenuItem } from "@mui/material";
import React from "react";

export const TaskActionsMenu = ({
  anchorEl,
  open,
  onClose,
  items,
  menuListAriaLabelledby = "basic-button",
}) => {

  const handleItemClick = (itemOnClick) => {
    if (typeof itemOnClick === "function") {
      itemOnClick();
    }
    onClose?.();
  };

  return (
    <Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        slotProps={{
          list: {
            "aria-labelledby": menuListAriaLabelledby,
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={item.id ?? `${item.label}-${index}`}
            sx={{ color: item.color ?? "inherit" }}
            onClick={() => handleItemClick(item.onClick)}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
