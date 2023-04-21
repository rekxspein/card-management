import { Download } from '@mui/icons-material';
import {
  Box,
  Button,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Tooltip
} from '@mui/material';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      `black_cards/?airline_id=${mapping}&page=${query.pageNo}&size=${query.pageSize}`
  );

  return res.data;
};

export const GreyListPage: FC = () => {
  const selectedAirlines = useActiveAirline(e => e.activeAirline);
  const airlinesIds = Object.keys(AIRLINES);
  const mapping = selectedAirlines
    .map(a => airlinesIds.indexOf(a) + 1)
    .join('');
  const location = useLocation();
  const fileName = location.pathname.replaceAll('/', '');
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
          justifyContent: 'flex-end'
        }}
      >
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
            } else {
              axios({
                url: `https://api-cardmanagement.ngopos.com/download/black_cardlist/?airline_id=${mapping}`,
                method: 'GET',
                responseType: 'blob'
              })
                .then(response => {
                  const href = URL.createObjectURL(response.data);

                  const link = document.createElement('a');
                  link.href = href;
                  const selectedIdx = selectedAirlines.map(a => a);
                  const downloadName =
                    AIRLINES[selectedIdx.toString() as keyof typeof AIRLINES];
                  link.setAttribute(
                    'download',
                    `${downloadName}-${fileName}.csv`
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
                })
                .catch(err => {
                  toast.error(`${err}`, {
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
    field: 'actions',
    headerName: 'Action',
    type: 'actions',
    width: 100,
    getActions: e => {
      if (e.row.CardNumber) {
        return [
          <Tooltip
            title="This will remove this Card from Grey List"
            placement="top"
          >
            <IconButton color="primary">
              <Icon>wb_incandescent</Icon>
            </IconButton>
          </Tooltip>
        ];
      } else {
        return []; // This will prevent rendering of this Cell before data is fetched
      }
    }
  },
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 200
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
    width: 180
  },
  {
    field: 'Declined_Transaction',
    headerName: 'Declined Transaction',
    width: 180
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
