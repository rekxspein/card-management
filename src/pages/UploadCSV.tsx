import { Add } from '@mui/icons-material';
import { Fab, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState } from 'react';

export const UploadCSV: FC = () => {
  const [fileName, setFileName] = useState('');
  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setFileName(file.name);
  };
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
          <Typography sx={{ fontStyle: 'italic', fontWeight: 100 }}>
            Please select CSV file by clicking the add button
          </Typography>
        </Box>
      </Box>
      <label htmlFor="upload-photo">
        <input
          style={{ display: 'none' }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleFileInputChange}
        />
        {fileName && (
          <Paper elevation={3} sx={{ m: '5px', p: '5px', maxWidth: '300px' }}>
            Selected file: {fileName}
          </Paper>
        )}
        <Fab
          color="primary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <Add /> Add
        </Fab>
      </label>
    </Box>
  );
};
