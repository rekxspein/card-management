import {
  Box,
  Button,
  CircularProgress,
  Icon,
  Pagination,
  Popover,
  TextField,
  Tooltip,
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

  const res = await axios.get<{
    items: [
      {
        _id: 'string';
        MerchantName: 'string';
        MerchantCity: 'string';
        TxDateTime: 'string';
        MID: 'string';
        TID: 'string';
        Cust_Device_Id: 0;
        TipAmount: 0;
        Amount: 0;
        CardNumber: 'string';
        TxStatus: 'string';
        Type: 'string';
        AuthNo: 'string';
        RRNo: 0;
        Cr_DbType: 'string';
        BatchNo: 0;
        Login_ID: 0;
        CardHolderName: 'string';
        CardHolderMobile: 0;
        RefNo: 'string';
        ExtraNotes: 'string';
        TxType: 'string';
        BookingInfo: 'string';
        TotalAmount: 0;
        FlightNumber: 'string';
        TimestampDateTime: 'string';
        Destination: 'string';
        Origin: 'string';
        Crew: ['string'];
      }
    ];
    total: number;
  }>(
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
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['getData', query, selectedAirlines],
    () => getData(selectedAirlines, query),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2
    }
  );

  const [info, setInfo] = useState<
    | {
        customerName: string;
        pnr: string;
        seatNumber: string;
      }
    | string
  >('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTotal(Math.min(data?.total ?? 0, 100 * pageSize));
  }, [setTotal, data?.total, pageSize]);

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
      field: 'BookingInfo',
      headerName: 'Booking Info',
      width: 120,
      renderCell: params => {
        const bookingInfo = params.row.BookingInfo;
        return (
          <Tooltip title="Click to see Details" placement="bottom-start">
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setInfo(bookingInfo);
              }}
            >
              <Icon>feed</Icon>
            </Button>
          </Tooltip>
        );
      },
      resizable: true
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

  if (isError) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <Icon>error_outline</Icon>
        <Typography sx={{ fontStyle: 'italic', fontWeight: 100 }}>
          {(error as any).message}
        </Typography>
      </Box>
    );
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
      {isFetching || isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
              renderInput={params => (
                <TextField variant="standard" {...params} />
              )}
            />
            <DesktopDatePicker
              label="End Date"
              value={endDate}
              onChange={(p: Moment | null) => {
                setEndDate(p);
              }}
              inputFormat="DD-MM-yyyy"
              renderInput={params => (
                <TextField variant="standard" {...params} />
              )}
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
                      `${downloadName}-${
                        fileName === '' ? 'Transactions' : ''
                      }.csv` //transaction route is '/' so need to set
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
            key={data?.items.length}
            rows={data?.items ?? []}
            getRowId={rows => rows._id}
            autoHeight
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
              Pagination: CustomPagination(totalPages, query.pageNo, setPage)
            }}
          />
          <Popover
            id={data?.items[0]._id}
            open={info ? true : false}
            anchorEl={anchorEl}
            onClose={() => setInfo('')}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Typography sx={{ p: 2 }}>
              Customer Name:{' '}
              {typeof info === 'object' ? info.customerName : info}
              <br />
              PNR: {typeof info === 'object' ? info.pnr : info}
              <br />
              Seat Number: {typeof info === 'object' ? info.seatNumber : info}
            </Typography>
          </Popover>
        </Box>
      )}
    </Box>
  );
};

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
