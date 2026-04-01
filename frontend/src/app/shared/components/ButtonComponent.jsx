import { Button } from "@mui/material"
export const ButtonComponent = ({buttonTitle, type="button", ...rest}) => {
  return (
    <>
    <Button type={type} variant="contained" {...rest} >{buttonTitle}</Button>
    </>
  )
}

