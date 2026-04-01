import { Typography } from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { CardComponent } from "../../shared/components/CardComponent";

export const NoTask = () => {
  const buttonProperties = {};

  return (
    <>
      <CardComponent
        icon={
          <CrisisAlertIcon sx={{ color: "var(--warning)", fontSize: "75px" }} />
        }
        cardTitle={<Typography variant={"h4"}>No tasks yet</Typography>}
        cardText={<Typography>Start managing tasks by creating a</Typography>}
      />
    </>
  );
};
