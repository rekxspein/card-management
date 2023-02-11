import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
      <Box sx={{ minHeight: '300px' }}></Box>
      <CircularProgress />
    </Box>
  );
};
