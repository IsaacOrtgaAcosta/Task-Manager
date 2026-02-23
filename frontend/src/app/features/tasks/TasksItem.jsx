import { useState } from "react";
import {
  ListItem,
  List,
  Checkbox,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const TasksItem = () => {
  const [checked, setChecked] = useState([1]);

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
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <>
            <ListItem key={value}>
              <ListItemIcon>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.includes(value)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
                <ListItem>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItem>
              </ListItemIcon>
              <ListItem secondaryAction={<MoreHorizIcon sx={{color: 'var(--secondary)'}}/>}></ListItem>
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};
