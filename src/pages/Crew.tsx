import { Box } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { MOCKAPI } from '../constant';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';

export const Crew: FC = () => {
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
      <DataGrid rows={data} columns={column} autoHeight disableColumnMenu />
    </Box>
  );
};

const column: GridColDef[] = [
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
];
