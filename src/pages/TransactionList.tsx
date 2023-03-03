import { Box, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AIRLINES, BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { useActiveAirline } from '../store/activeAirline';
import { usePagination } from '../hooks/usePagination';

const getData = async (
  airlines: string[],
  query: { pageNo: number; pageSize: number }
) => {
  const airlinesIds = Object.keys(AIRLINES);
  const mapping = airlines.map(a => airlinesIds.indexOf(a) + 1).join('');

  const res = await axios.get<{ items: any[]; total: number }>(
    BASE_API_URL +
      `transaction_list/airlines=${mapping}?page=${query.pageNo}&size=${query.pageSize}`
  );

  return res.data;
};

export const TransactionListPage: FC = () => {
  const airlines = useActiveAirline(e => e.activeAirline);
  const {
    page,
    query,
    total,
    pageSize,
    setTotal,
    totalPages,
    setPage,
    setPageSize
  } = usePagination({
    pageSize: 20
  });
  const { data, isLoading } = useQuery(['getData', query, airlines], () =>
    getData(airlines, query)
  );

  useEffect(() => {
    setTotal(Math.min(data?.total ?? 0, 100 * pageSize));
  }, [setTotal, data?.total, pageSize]);

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
        rows={data?.items ?? []}
        getRowId={rows => rows._id}
        autoHeight
        loading={isLoading}
        columns={column}
        rowCount={total}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        disableSelectionOnClick
        disableColumnMenu
        components={{
          Pagination: CustomPagination(totalPages, query.pageNo, setPage),
          LoadingOverlay: LinearProgress
        }}
      />
    </Box>
  );
};

const column = new Array<GridColDef | GridActionsColDef>(
  {
    field: 'MerchantName',
    headerName: 'Merchant Name',
    width: 250
  },
  {
    field: 'MerchantCity',
    headerName: 'Merchant City',
    width: 130
  },
  {
    field: 'TxDateTime',
    headerName: 'Tx Date Time',
    width: 200
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    width: 80
  },
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 150
  },
  {
    field: 'TxStatus',
    headerName: 'Tx Status',
    width: 120
  },
  {
    field: 'CardHolderName',
    headerName: 'MS Card Holder Name',
    width: 240
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

const CustomPagination = (
  totalPages: number,
  page: number,
  setPage: (p: number) => void
) => {
  return () => {
    return (
      <Box>
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={(_event, value) => {
            setPage(value);
          }}
        />
      </Box>
    );
  };
};
