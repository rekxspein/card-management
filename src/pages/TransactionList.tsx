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
import { useActiveAirline } from '../store/activeAirline';
import { usePagination } from '../hooks/usePagination';

const getData = async (
  airlines: string[],
  pageNumber: number,
  pageSize: number
) => {
  // console.log('ASDASSAD', airlines);
  const maping = {
    'Air Asia': 1,
    'Go Airlines': 2,
    'Air Asia,Go Airlines': 12,
    'Go Airliens,Air Asia': 12
  };
  const a = airlines.toString();
  return await axios
    .get(
      BASE_API_URL +
        `transaction_list/airlines=${maping[a]}?page=${pageNumber}&size=${pageSize}`
    )
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const TransactionListPage: FC = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  // const pageSize = usePageNumber(e => e.pageSize);
  const airlines = useActiveAirline(e => e.activeAirline);
  const { page, pageSize, query, total, setTotal, setPage, setPageSize } =
    usePagination();
  const { data, isLoading } = useQuery(['getData', pageNumber, pageSize], () =>
    getData(airlines, pageNumber, pageSize)
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
        rows={data.items || []}
        getRowId={rows => rows._id}
        loading={isLoading}
        columns={column}
        getRowHeight={() => 'auto'}
        rowsPerPageOptions={[20, 30, 50]}
        rowCount={total}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        disableSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar
        }}
      />
    </Box>
  );
};

const column = new Array<GridColDef | GridActionsColDef>(
  {
    field: 'MerchantName',
    headerName: 'Merchant Name',
    width: 200
  },
  {
    field: 'MerchantCity',
    headerName: 'Merchant City',
    width: 150
  },
  {
    field: 'TxDateTime',
    headerName: 'Tx Date Time',
    width: 200
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    width: 100
  },
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 200
  },
  {
    field: 'TxStatus',
    headerName: 'Tx Status',
    width: 200
  },
  {
    field: 'CardHolderName',
    headerName: 'MS Card Holder Name',
    width: 250
  },
  {
    field: 'TxType',
    headerName: 'Tx Type',
    width: 100
  },
  {
    field: 'BookingInfo_customerName',
    headerName: 'Booking Info Customer Name',
    width: 250
  },
  {
    field: 'BookingInfo_pnr',
    headerName: 'Booking Info PNR',
    width: 150
  },
  {
    field: 'BookingInfo_mobile',
    headerName: 'Booking Info Mobile',
    width: 200
  },
  {
    field: 'Origin',
    headerName: 'Origin',
    width: 100
  },
  {
    field: 'Destination',
    headerName: 'Destination',
    width: 100
  }
);

const CustomPagination = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  const setPageNumber = usePageNumber(e => e.setPageNumber);
  return (
    <>
      <Pagination
        count={10}
        color="primary"
        page={pageNumber}
        onChange={(_event, value) => setPageNumber(value)}
      />
    </>
  );
};
