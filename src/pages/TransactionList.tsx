import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AIRLINES, BASE_API_URL } from '../constant';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import { useActiveAirline } from '../store/activeAirline';
import { usePagination } from '../hooks/usePagination';
import { Download } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Moment } from 'moment';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useLocation } from 'react-router-dom';

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
  const selectedAirlines = useActiveAirline(e => e.activeAirline);
  const airlinesIds = Object.keys(AIRLINES);
  const mapping = selectedAirlines
    .map(a => airlinesIds.indexOf(a) + 1)
    .join('');
  const location = useLocation();
  const fileName = location.pathname.replaceAll('/', '');
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
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
  const { data, isLoading } = useQuery(
    ['getData', query, selectedAirlines],
    () => getData(selectedAirlines, query),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true
    }
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 2
        }}
      >
        <Box>
          <Typography sx={{ fontStyle: 'italic', fontWeight: 100 }}>
            ** [available date range - Jan 2022 to Dec 2022]
          </Typography>
        </Box>
        <DesktopDatePicker
          label="Start Date"
          value={startDate}
          onChange={(p: Moment | null) => {
            setStartDate(p);
          }}
          inputFormat="DD-MM-yyyy"
          // InputAdornmentProps={{
          //   sx: { '& > button': { color: '#282C35' } }
          // }}
          renderInput={params => <TextField variant="standard" {...params} />}
        />
        <DesktopDatePicker
          label="End Date"
          value={endDate}
          onChange={(p: Moment | null) => {
            setEndDate(p);
          }}
          inputFormat="DD-MM-yyyy"
          renderInput={params => <TextField variant="standard" {...params} />}
        />
        <Button
          id="create-order-orderlist-btn"
          sx={{ m: 1 }}
          variant="contained"
          startIcon={<Download />}
          onClick={() => {
            if (mapping === '12' || mapping === '21') {
              toast.error('Please select only one Airline', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
              });
            } else if (startDate === null || endDate === null) {
              toast.error('Please select both the dates', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
              });
            } else {
              axios({
                url: `https://api-cardmanagement.ngopos.com/download/transactions/?airline_id=${mapping}&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`,
                method: 'GET',
                responseType: 'blob'
              }).then(response => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                const selectedIdx = selectedAirlines.map(a => a);
                const downloadName =
                  AIRLINES[selectedIdx.toString() as keyof typeof AIRLINES];
                link.setAttribute(
                  'download',
                  `${downloadName}-${fileName === '' ? 'Transactions' : ''}.csv` //transaction route is '/' so need to set
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
                toast.success(`Download Successfull`, {
                  position: 'bottom-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'dark'
                });
              });
            }
          }}
        >
          Download
        </Button>
      </Box>
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
