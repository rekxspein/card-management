import React from 'react';
import { Box, Fab } from '@mui/material';
import { PostAdd, UploadFileOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

const UploadCSV: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 2,
        alignItems: 'normal',
        border: '3px dashed #747c85'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 2,
          minWidth: '380px',
          padding: '1em'
        }}
      >
        <label htmlFor="file-input">
          <input
            style={{ display: 'none' }}
            id="file-input"
            name="file-input"
            type="file"
            accept=".csv"
            capture="environment"
          />
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <PostAdd />
            Select CSV
          </Fab>
        </label>
        <LoadingButton
          size="small"
          startIcon={<UploadFileOutlined />}
          loading={false}
          loadingPosition="start"
          variant="contained"
        >
          <span>Upload</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UploadCSV;
