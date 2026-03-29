import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const TextFieldComponent = ({
  id,
  inputLabel,
  type = "text",
  showPassword = false,
  onTogglePassword,
  endAdornment = false,
  error = false,
  helperText = "",
  ...rest
}) => {
  const isPassword = type === "password";
  if (helperText !== "") error = true;

  return (
    <FormControl 
          sx={{
        width: "100%",
        position: "relative",
        mb: 2,
      }} 
    variant="outlined" error={error}>
      <InputLabel htmlFor={id} error={error}>
        {inputLabel}
      </InputLabel>
      <OutlinedInput
        id={id}
        label={inputLabel}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        {...rest}
        endAdornment={
          endAdornment && isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
      {helperText ? (
        <FormHelperText
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            margin: 0,
            marginTop: "4px",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.2,
          }}
        >
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
