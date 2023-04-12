import React, { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../constant';
import { Box, Fab } from '@mui/material';
import { PostAdd, UploadFileOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

const UploadCSV: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      toast(`File Selected !!!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast(`Please select a File!!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post(`${BASE_API_URL}upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(`Upload Success!!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.message}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        });
      } else {
        toast.error(`An unknown Error Occured!!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        });
      }
      setLoading(false);
    }
  };
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
            onChange={handleFileSelect}
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
          onClick={handleUpload}
          startIcon={<UploadFileOutlined />}
          loading={loading}
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
