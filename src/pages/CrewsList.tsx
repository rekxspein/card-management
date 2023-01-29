import { Box, IconButton, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { MOCKAPI } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { Visibility } from '@mui/icons-material';

export const CrewsListPage: FC = () => {
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
    field: 'actions',
    headerName: 'View',
    type: 'actions',
    width: 100,
    getActions: e => {
      return [
        <IconButton href={`/crews/${e.id ?? ''}/details`} color="primary">
          <Visibility />
        </IconButton>
      ];
    }
  },
  {
    field: 'crewId',
    headerName: 'Crew ID',
    width: 120
  },
  {
    field: 'crewName',
    headerName: 'Crew Name',
    width: 300
  },
  {
    field: 'crewCode',
    headerName: 'Crew Code',
    width: 300
  },
  {
    field: 'crewPosition',
    headerName: 'Crew Position',
    width: 300
  }
);

const CustomPagination = () => {
  return <Pagination count={10} color="primary" />;
};
