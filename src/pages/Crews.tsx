import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { MOCKAPI } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { Visibility } from '@mui/icons-material';

export const Crews: FC = () => {
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
  }
);
