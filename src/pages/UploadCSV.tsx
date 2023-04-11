import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUploadOutlined } from '@mui/icons-material';
import axios from 'axios';

export const UploadCSV: FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    axios.post('localhost:3000/upload', {});
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFileDialogActive } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: '.csv'
    });
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
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 2
        }}
      >
        <Box>
          <Typography sx={{ fontStyle: 'italic', fontWeight: 100 }}>
            Please select CSV file by clicking the upload icon
          </Typography>
        </Box>
      </Box>
      {!isFileDialogActive && (
        <Box
          {...getRootProps({
            className:
              'relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100'
          })}
        >
          <input {...getInputProps()} />
          <Box className="flex justify-center">
            <Box component="span" className=" hover:bg-neutral-800">
              {isDragActive ? (
                <p>Drop the file now !!</p>
              ) : (
                <FileUploadOutlined className="icon" />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
