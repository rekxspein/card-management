import { Box, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { MOCKAPI } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';

export const RejectedCardListPage: FC = () => {
  const getData = async () => {
    return await axios
      .get(MOCKAPI + 'crewData')
      .then(r => {
        return r.data;
      })
      .catch(error => error);
  };

  const { data, isLoading } = useQuery('MockData', getData);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DataGrid
        rows={data}
        columns={column}
        autoHeight
        disableColumnMenu
        loading={isLoading}
        pagination
        rowsPerPageOptions={[10, 20, 30]}
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress
        }}
      />
    </Box>
  );
};

const column = new Array<GridColDef | GridActionsColDef>(
  {
    field: 'crewId',
    headerName: 'Card Number',
    width: 120
  },
  {
    field: 'crewName',
    headerName: 'Card Holder Name',
    width: 300
  },
  {
    field: 'crewCode',
    headerName: 'Reason',
    width: 300
  }
);

const CustomPagination = () => {
  return <Pagination count={10} color="primary" />;
};
