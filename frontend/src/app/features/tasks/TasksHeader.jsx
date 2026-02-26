import { Box, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ButtonComponent } from "../../shared/components/ButtonComponent";

export const TasksHeader = () => {
    const buttonTitle = <MoreHorizIcon />;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        pb: 3
      }}
    >
      <Box sx={{flex: 1, display: 'flex', justifyContent: 'start'}}>
        <Typography variant="h4" sx={{fontWeight: 'bold'}}>My Tasks</Typography>
      </Box>
      <Box sx={{flex: 1, display: 'flex', justifyContent: 'end'}}>
        <ButtonComponent buttonTitle={buttonTitle} color={'var(--primary)'} sx={{backgroundColor: 'var(--background-color)', width: '30%'}}/>
      </Box>
    </Box>
  );
};
