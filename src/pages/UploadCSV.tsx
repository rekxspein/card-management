import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../constant';
import {
  Box,
  CircularProgress,
  Divider,
  Fab,
  Paper,
  Typography
} from '@mui/material';
import { PostAdd, UploadFileOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation, useQuery } from 'react-query';

const UploadCSV: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    mutate: uploadFile,
    isLoading: isUploading,
    isSuccess
  } = useMutation(
    async (data: { file: File }) => {
      const formData = new FormData();
      formData.set('file', data.file);

      const res = await axios.post(`${BASE_API_URL}uploadfile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return res.data;
    },
    {
      onSuccess: () => {
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

        setSelectedFile(null);
      },
      onError: e => {
        if (e instanceof AxiosError) {
          toast.error(`${e.message}`, {
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
      }
    }
  );

  const { data: serverStatus } = useQuery(
    ['status', 'report'],
    async () => {
      const res = await axios.get<
        Array<{
          _id: number;
          Status: string;
          Message: string;
        }>
      >(`${BASE_API_URL}status_report/`);

      return res.data;
    },
    {
      select: d => d?.[0],
      refetchInterval: d => {
        if (d?.Status === 'Processing') {
          return 5000;
        }

        return false;
      },
      enabled: isSuccess
    }
  );

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

    uploadFile({ file: selectedFile });
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
        <Box fontStyle={'italic'} fontWeight={100} fontSize={18}>
          {selectedFile?.name
            ? 'File Name: ' +
              selectedFile?.name +
              ' | File Size: ' +
              (selectedFile.size / 1000000).toFixed(1) +
              ' MB'
            : '** No file selected'}
        </Box>
        <LoadingButton
          size="small"
          onClick={handleUpload}
          startIcon={<UploadFileOutlined />}
          loading={isUploading}
          loadingPosition="start"
          variant="contained"
        >
          <span>Upload</span>
        </LoadingButton>
      </Box>
      <Divider
        sx={{ my: 1, borderBottomWidth: 2, borderColor: '#cac7c7' }}
        variant="middle"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          minWidth: '380px',
          padding: '1em'
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography component="span" fontWeight={500}>
              Server Data Merging Status:{' '}
              <Typography
                component="span"
                fontWeight={500}
                color={'darkorange'}
              >
                {serverStatus?.Status || 'N/A'}
              </Typography>
            </Typography>
            {serverStatus?.Status === 'Processing' && (
              <CircularProgress size={15} />
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UploadCSV;
