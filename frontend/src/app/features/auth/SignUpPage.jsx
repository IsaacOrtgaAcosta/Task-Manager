import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Divider, Link } from "@mui/material";
import {
  emailValidation,
  passwordValidation,
  passwordsMatch,
} from "../../utils/validators";
import { TextFieldComponent } from "../../shared/components/TextFieldComponent";
import { ButtonComponent } from "../../shared/components/ButtonComponent";
import { AlertComponent } from "../../shared/components/AlertComponent";
import { SpinnerComponent } from "../../shared/components/SpinnerComponent";
import { useAuth } from "../../providers/AuthProvider";
import Logotype from "../../../assets/logotype.png";
import "./LoginPage.css";
import { signup } from "../../api/auth.api";

export const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordMatch: "",
  });
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  const comebackToLoginPage = () => {
    navigate("/");
  };

  const validateUserData = () => {
    if (emailValidation(email) === false) return;
    if (passwordValidation(password) === false) return;
    if (passwordsMatch(password, secondPassword) === false) {
      setFieldErrors((prev) => {
        return { ...prev, passwordMatch: "Passwords must match" };
      });
    }
    if (
      email !== "" &&
      name !== "" &&
      password !== "" &&
      secondPassword !== ""
    ) {
      sendSignUpRequest(email, name, lastName, password);
    }else{
      setLoading(false);
    }
  };

  const { login: saveSession } = useAuth();
  const sendSignUpRequest = async (email, name, lastName, password) => {
    setLoading(true);
    try {
      const data = await signup({email, name, lastName, password});
      return;
      saveSession(data);
    } catch (error) {
      console.error('Error with the registration', error);
      setAuthError(true);
    }finally{
      navigate("/tasks");
      setLoading(false);
    }
  }

  const validateIfPasswordsMatch = () => {
    if (passwordsMatch(password, secondPassword) === false) {
      setFieldErrors((prev) => {
        return { ...prev, passwordMatch: "Passwords must match" };
      });
    } else {
      setFieldErrors((prev) => {
        return { ...prev, passwordMatch: "" };
      });
    }
  };
  const onTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onToggleSecondPassword = () => {
    setShowSecondPassword((showSecondPassword) => !showSecondPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUserData();
  };

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
            Sign up to start managing your tasks
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }} component="form" onSubmit={handleSubmit}>
          <Box>
            <TextFieldComponent
              id="loginPage-textFieldEmail"
              inputLabel="Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => meetEmailTheRequirements(e.target.value)}
              helperText={fieldErrors.email}
              fullWidth
            />
          </Box>
          <Box>
            <TextFieldComponent
              id="loginPage-textFieldEmail"
              inputLabel="Name *"
              type="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={fieldErrors.name}
              fullWidth
            />
          </Box>
          <Box>
            <TextFieldComponent
              id="loginPage-textFieldEmail"
              inputLabel="Last name"
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              helperText={fieldErrors.lastName}
              fullWidth
            />
          </Box>
          <Box>
            <TextFieldComponent
              id="loginPage-textFieldPassword"
              inputLabel="Password *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => meetPasswordTheRequirements(e.target.value)}
              endAdornment={true}
              showPassword={showPassword}
              onTogglePassword={onTogglePassword}
              helperText={fieldErrors.password}
              fullWidth
            />
          </Box>
          <Box sx={{ pt: fieldErrors.password ? "32px" : 0 }}>
            <TextFieldComponent
              id="loginPage-textFieldPassword"
              inputLabel="Repeat the password *"
              type="password"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              onBlur={(e) => validateIfPasswordsMatch()}
              endAdornment={true}
              showPassword={showSecondPassword}
              onTogglePassword={onToggleSecondPassword}
              helperText={fieldErrors.passwordMatch}
              fullWidth
            />
          </Box>
          <Box>
            <ButtonComponent
              type="submit"
              buttonTitle="Send"
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
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography
            sx={{ color: "var(--secondary-text)", textDecoration: "none" }}
          >
            Do you already have an account?{" "}
            <Link
              onClick={() => {
                comebackToLoginPage();
              }}
              sx={{
                color: "var(--primary)",
                textDecorationColor: "var(--primary)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log-in
            </Link>
          </Typography>
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
            {loading && <SpinnerComponent />}
      
    </Box>
  );
};
