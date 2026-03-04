import { Button } from "@mui/material"
export const ButtonComponent = ({buttonTitle, type, color, ...rest}) => {
  return (
    <>
    <Button type={type} variant="contained" {...rest} color={color}>{buttonTitle}</Button>
    </>
  )
}

