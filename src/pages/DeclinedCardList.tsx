import { Box, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../constant';
import {
  DataGrid,
  GridActionsColDef,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { usePageNumber } from '../store/customPage';

const getData = async (pageNumber: number, pageSize: number) => {
  return await axios
    .get(
      BASE_API_URL +
        `declinedcardlist/airlines=1?page=${pageNumber}&size=${pageSize}`
    )
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const DeclinedCardListPage: FC = () => {
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
        pagination
        loading={isLoading}
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar
        }}
        disableSelectionOnClick
      />
    </Box>
  );
};

const column = new Array<GridColDef | GridActionsColDef>(
  {
    field: 'CardHolderName',
    headerName: 'Card Holder Name',
    width: 200
  },
  {
    field: 'First_6_digit_of_Card',
    headerName: 'First 6 Digits of Card',
    width: 200
  },
  {
    field: 'Card_Last_Digits',
    headerName: 'Card Last Digits',
    width: 200
  },
  {
    field: 'TerminalDisplay',
    headerName: 'Reason',
    width: 200
  },
  {
    field: 'ResponseCode',
    headerName: 'Response Code',
    width: 200
  },
  {
    field: 'Counts',
    headerName: 'No. of Attempts',
    width: 200
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
