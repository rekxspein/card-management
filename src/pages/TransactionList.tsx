import { Box, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { usePageNumber } from '../store/customPage';

const getData = async (pageNumber: number, pageSize: number) => {
  return await axios
    .get(BASE_API_URL + `airasia_all_data?page=${pageNumber}&size=${pageSize}`)
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const TransactionListPage: FC = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  const pageSize = usePageNumber(e => e.pageSize);
  const { data, isLoading } = useQuery(['getData', pageNumber, pageSize], () =>
    getData(pageNumber, pageSize)
  );
  useEffect(() => {
    getData(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

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
    width: 300
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
