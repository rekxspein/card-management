import { Add } from '@mui/icons-material';
import { Fab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';

export const UploadCSV: FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 2
        }}
      >
        <Box>
          <Typography
            sx={{ fontStyle: 'italic', fontWeight: 100 }}
          ></Typography>
        </Box>
      </Box>
      <label htmlFor="upload-photo">
        <input
          style={{ display: 'none' }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        <Fab
          color="primary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <Add /> Upload CSV
        </Fab>
      </label>
    </Box>
  );
};
