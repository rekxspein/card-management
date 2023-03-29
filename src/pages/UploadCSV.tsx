import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadCSV: FC = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
    </Box>
  );
};
