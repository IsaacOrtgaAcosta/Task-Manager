import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const SpinnerComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}