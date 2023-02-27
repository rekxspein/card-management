import { Box, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AIRLINES, BASE_API_URL } from '../constant';
import {
  DataGrid,
  GridActionsColDef,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid';
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
      `declinedcardlist/airlines=${mapping}?page=${query.pageNo}&size=${query.pageSize}`
  );

  return res.data;
};

export const DeclinedCardListPage: FC = () => {
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
        disableColumnFilter
        components={{
          Pagination: CustomPagination(totalPages, query.pageNo, setPage),
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar
        }}
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
