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
  error=false,
  helperText,
  ...rest
}) => {
  const isPassword = type === "password";
  if(helperText !== '') error = true;

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" error={error}>
      <InputLabel htmlFor={id} error={error}>{inputLabel}</InputLabel>
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
                  showPassword ? 'hide the password' : 'display the password'
                }
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
