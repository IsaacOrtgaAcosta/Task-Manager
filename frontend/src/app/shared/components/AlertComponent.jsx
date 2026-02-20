import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export const AlertComponent = ({severity, alertTitle, alertDescription, ...rest}) => {
  return (
    <>
    <Alert severity={severity} {...rest}>
      <AlertTitle sx={{fontWeight: 'bold', fontSize: '18px'}}>{alertTitle}</AlertTitle>
      {alertDescription}
    </Alert>
    </>
  )
}

