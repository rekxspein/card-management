import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { RouterLink } from '../component/RouterLink';

export const Next: FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1>Next Page</h1>

      <Button href="/" variant="outlined" LinkComponent={RouterLink}>
        &lt; Back
      </Button>
    </Box>
  );
};
