import { Box, Typography } from '@mui/material';
import Logotype from "../../../assets/logotype.png";
import './LoginPage.css';

export const LoginPage = () => {
  return (
    <Box className="loginPage-content">
      <Box className='loginPage-logoContent'>
        <img src={Logotype} alt="Task Manager Logotype" />
      </Box>
      <Box>
        <Typography variant="h1" component="h5" sx={{fontSize: '35px', fontWeight: 'bold', mt: 5}} className='loginPage-title'>Wellcome Back</Typography>
        <Typography sx={{ mt: 1, fontSize: '18px', fontWeight: '300', letterSpacing: '1px;' }}>Please sign to your account.</Typography>
      </Box>
    </Box>
  )
}
