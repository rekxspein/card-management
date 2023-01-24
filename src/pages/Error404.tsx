import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { RouterLink } from '../component/RouterLink';

export const Error404Page: FC = () => {
  return (
    <>
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <Box textAlign="center">
          <Typography variant="h5" component="h5" gutterBottom>
            404 Not Found!
          </Typography>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            href="/"
            LinkComponent={RouterLink}
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
};
