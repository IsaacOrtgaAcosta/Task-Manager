import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Logotype from "../../assets/logotype.png";

export const AppLayout = () => {
  const { user } = useAuth();
  const name = user?.name;
  let nbsp = "\u00A0";
  return (
    <>
      {/* Navbar MUI */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "var(--background-color)",
          color: "var(--primary)",
          height: "70px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "var(--primary)" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            className="appLayout-logotypeContent"
            sx={{ flex: 1, display: "flex", justifyContent: "center" }}
          >
            <img src={Logotype} style={{ width: 190, height: 45 }} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                color: "var(--secondary)",
                transition: '0.3s ease-in',
                "&:hover": { color: "var(--primary)" },
              }}
            >
              {name}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ px: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
