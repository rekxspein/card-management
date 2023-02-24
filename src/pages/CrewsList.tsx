import { Box, IconButton, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { Visibility } from '@mui/icons-material';
import { usePageNumber } from '../store/customPage';

const getData = async (pageNumber: number, pageSize: number) => {
  return await axios
    .get(
      BASE_API_URL +
        `uniquecrew_list/airlines=1?page=${pageNumber}&size=${pageSize}`
    )
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const CrewsListPage: FC = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  const pageSize = usePageNumber(e => e.pageSize);
  const { data, isLoading } = useQuery(['getData', pageNumber, pageSize], () =>
    getData(pageNumber, pageSize)
  );

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
        rows={data.items}
        getRowId={rows => rows._id}
        columns={column}
        autoHeight
        disableColumnMenu
        loading={isLoading}
        pagination
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress
        }}
        disableSelectionOnClick
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
      if (e.row.employeeCode) {
        return [
          <IconButton
            href={`/crews/${e.row.employeeId ?? ''}/details/`}
            color="primary"
          >
            <Visibility />
          </IconButton>
        ];
      } else {
        return [];
      }
    }
  },
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    width: 120
  },
  {
    field: 'employeeName',
    headerName: 'Employee Name',
    width: 300
  },
  {
    field: 'employeeCode',
    headerName: 'Employee Code',
    width: 300
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 300
  }
);

const CustomPagination = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  const setPageNumber = usePageNumber(e => e.setPageNumber);
  return (
    <Pagination
      count={10}
      color="primary"
      page={pageNumber}
      onChange={(_event, value) => setPageNumber(value)}
    />
  );
};
