import {
  Box,
  Icon,
  IconButton,
  LinearProgress,
  Pagination
} from '@mui/material';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loading } from '../component/Loading';
import { BASE_API_URL } from '../constant';
import { usePageNumber } from '../store/customPage';

const getData = async (pageNumber: number, pageSize: number) => {
  return await axios
    .get(
      BASE_API_URL +
        `airasia_all_data/black_cards?page=${pageNumber}&size=${pageSize}`
    )
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const GreyListPage: FC = () => {
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
    headerName: 'Action',
    type: 'actions',
    width: 100,
    getActions: e => {
      if (e.row.CardNumber) {
        return [
          <IconButton href={``} color="primary">
            <Icon>wb_incandescent</Icon>
          </IconButton>
        ];
      } else {
        return [];
      }
    }
  },
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 250
  },
  {
    field: 'CardHolderName',
    headerName: 'Card Holder Name',
    width: 300
  },
  {
    field: 'TotalAmount',
    headerName: 'Total Amount',
    width: 150
  },
  {
    field: 'Total_transaction',
    headerName: 'Total Transaction',
    width: 150
  },
  {
    field: 'Approved_Transaction',
    headerName: 'Approved Transaction',
    width: 200
  },
  {
    field: 'Declined_Transaction',
    headerName: 'Declined Transaction',
    width: 300
  }
);

const CustomPagination = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  return <Pagination count={10} color="primary" page={pageNumber} />;
};
