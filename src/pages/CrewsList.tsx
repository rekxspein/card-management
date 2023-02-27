import { Box, IconButton, LinearProgress, Pagination } from '@mui/material';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AIRLINES, BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
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
      `uniquecrew_list/airlines=${mapping}?page=${query.pageNo}&size=${query.pageSize}`
  );

  return res.data;
};

export const CrewsListPage: FC = () => {
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
          LoadingOverlay: LinearProgress
        }}
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
