import { Box, LinearProgress, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { Loading } from '../component/Loading';
import { usePageNumber } from '../store/customPage';

const getData = async (pageNumber: number, pageSize: number) => {
  return await axios
    .get(BASE_API_URL + `airasiadata?page=${pageNumber}&size=${pageSize}`)
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const TransactionListPage: FC = () => {
  const pageNumber = usePageNumber(e => e.pageNumber);
  const pageSize = usePageNumber(e => e.pageSize);
  const { data, isLoading } = useQuery(
    ['getData', pageNumber, pageSize],
    () => getData(pageNumber, pageSize),
    {
      keepPreviousData: true
    }
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
        getRowId={rows => rows.employeeId}
        columns={column}
        autoHeight
        disableColumnMenu
        loading={isLoading}
        pagination
        rowsPerPageOptions={[10, 20, 30]}
        components={{
          Pagination: CustomPagination,
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
    width: 300
  },
  {
    field: 'MerchantCity',
    headerName: 'Merchant City',
    width: 300
  },
  {
    field: 'TxDateTime',
    headerName: 'Tx Date Time',
    width: 300
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    width: 300
  },
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 300
  },
  {
    field: 'TxStatus',
    headerName: 'Tx Status',
    width: 300
  },
  {
    field: 'msCardHolderName',
    headerName: 'MS Card Holder Name',
    width: 300
  },
  {
    field: 'TxType',
    headerName: 'Tx Type',
    width: 300
  },
  {
    field: 'BookingInfo_customerName',
    headerName: 'Booking Info Customer Name',
    width: 300
  },
  {
    field: 'BookingInfo_pnr',
    headerName: 'Booking Info PNR',
    width: 300
  },
  {
    field: 'Crew_employeeCode',
    headerName: 'Crew Employee Code',
    width: 300
  },
  {
    field: 'Crew_employeeName',
    headerName: 'Crew Employee Name',
    width: 300
  },
  {
    field: 'OrderNo',
    headerName: 'Order Number',
    width: 300
  },
  {
    field: 'CabinCrew',
    headerName: 'Cabin Crew',
    width: 300
  },
  {
    field: 'Crew',
    headerName: 'Crew',
    width: 300
  },
  {
    field: 'CrewFromArms',
    headerName: 'Crew From Arms',
    width: 300
  },
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    width: 300
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
    <>
      <Typography>{pageNumber}</Typography>
      <Pagination
        count={10}
        color="primary"
        page={pageNumber}
        onChange={(_event, value) => setPageNumber(value)}
      />
    </>
  );
};
