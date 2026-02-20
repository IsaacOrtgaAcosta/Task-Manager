import { Button } from "@mui/material"
export const ButtonComponent = ({buttonTitle, color, ...rest}) => {
  return (
    <>
    <Button variant="contained" {...rest} color={color} >{buttonTitle}</Button>
    </>
  )
}

