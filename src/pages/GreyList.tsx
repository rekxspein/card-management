import {
  Box,
  Icon,
  IconButton,
  LinearProgress,
  Pagination
} from '@mui/material';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL, AIRLINES } from '../constant';
import { usePagination } from '../hooks/usePagination';
import { useActiveAirline } from '../store/activeAirline';

const getData = async (
  airlines: string[],
  query: { pageNo: number; pageSize: number }
) => {
  const airlinesIds = Object.keys(AIRLINES);
  const mapping = airlines.map(a => airlinesIds.indexOf(a) + 1).join('');

  const res = await axios.get<{ items: any[]; total: number }>(
    BASE_API_URL +
      `black_cards/airlines=${mapping}?page=${query.pageNo}&size=${query.pageSize}`
  );

  return res.data;
};

export const GreyListPage: FC = () => {
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
        return []; // This will prevent rendering of this Cell before data is fetched
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
