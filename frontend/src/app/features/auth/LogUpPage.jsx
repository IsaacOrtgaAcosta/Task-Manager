import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Divider, Link } from "@mui/material";
import { login } from "../../api/auth.api";
import { emailValidation, passwordValidation } from "../../utils/validators";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { AlertComponent } from "../../shared/components/AlertComponent";
import { useAuth } from "../../providers/AuthProvider";
import Logotype from "../../../assets/logotype.png";
import "./LoginPage.css";

export const LogUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const meetEmailTheRequirements = (email) => {
    const isOK = emailValidation(email);
    //If the email is valid or the field is empty, then update the email value
    if (email === "") {
      setFieldErrors((prev) => {
        return { ...prev, email: "" };
      });
    } else if (isOK) {
      setFieldErrors((prev) => {
        return { ...prev, email: "" };
      });
    } else {
      setFieldErrors((prev) => {
        return { ...prev, email: "Invalid email address" };
      });
    }
  };

  //Function that validates wether the password meets the requirements
  const meetPasswordTheRequirements = (password) => {
    const isOK = passwordValidation(password);
    //If the password is valid or the field is empty, then update the password value
    if (password === "") {
      setFieldErrors((prev) => {
        return { ...prev, password: "" };
      });
    } else if (isOK) {
      setFieldErrors((prev) => {
        return { ...prev, password: "" };
      });
    } else {
      setFieldErrors((prev) => {
        return {
          ...prev,
          password: `The password must be at least 6-12 characteres long and include one number`,
        };
      });
    }
  };

  return (
    <Box className="loginPage-container">
      <Box className="loginPage-content">
        <Box className="loginPage-logoContent">
          <img src={Logotype} alt="Task Manager Logotype" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: "38px", fontWeight: "bold", mt: 5 }}
            className="loginPage-title"
          >
            Wellcome
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: "22px",
              fontWeight: "400",
              letterSpacing: "1px;",
              color: "var(--secondary-text)",
            }}
          >
            Please sign to your account.
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }} component="form" onSubmit={handleSubmit}>
          <Box>
            <TextFieldComponent
              id="loginPage-textFieldEmail"
              inputLabel="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => meetEmailTheRequirements(e.target.value)}
              helperText={fieldErrors.email}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextFieldComponent
              id="loginPage-textFieldPassword"
              inputLabel="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => meetPasswordTheRequirements(e.target.value)}
              endAdornment={true}
              showPassword={showPassword}
              onTogglePassword={onTogglePassword}
              helperText={fieldErrors.password}
            />
          </Box>
          <Box>
            <ButtonComponent
              type="submit"
              buttonTitle="Sign In"
              size={"large"}
              sx={{
                width: "100%",
                height: "50px",
                mt: 4,
                fontSize: "17px",
                textTransform: "none",
                letterSpacing: "1.2px",
                backgroundColor: "var(--primary)",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 3, width: "100%" }}>
          <Divider />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Box>
            <Link
              href="#"
              sx={{ color: "var(--secondary-text)", textDecoration: "none" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{ color: "var(--secondary-text)", textDecoration: "none" }}
            >
              Don't have an account?{" "}
              <Link
                onClick={navigateToLogUpPage}
                sx={{
                  color: "var(--primary)",
                  textDecorationColor: "var(--primary)",
                  fontWeight: "bold",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      {authError && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: "1000",
          }}
        >
          <AlertComponent
            severity="error"
            sx={{
              backgroundColor: "var(--primary)",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
            color="white"
            alertTitle="Error"
            alertDescription="Unable to connect to the server. Please try again."
          />
        </Box>
      )}
    </Box>
  );
};
