import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ButtonComponent } from "./ButtonComponent";

export const CardComponent = ({ img = "", icon = "", cardTitle, cardText }) => {
  return (
    <Card sx={{ width: "100%", height: "100%", p: 4 }}>
      {icon}

      <CardContent>
          {cardTitle}
          {cardText}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <ButtonComponent
          buttonTitle={"Create a task"}
          type={"button"}
          sx={{
            backgroundColor: "var(--primary)",
            color: "white",
            transition: "0.3s ease-in",
            "&:hover": {
              backgroundColor: "var(--secondary)",
            },
          }}
        />
      </CardActions>
    </Card>
  );
};
