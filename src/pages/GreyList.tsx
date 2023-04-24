import { Download } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Icon,
  Pagination,
  Typography,
  Tooltip
} from '@mui/material';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_API_URL, AIRLINES } from '../constant';
import { usePagination } from '../hooks/usePagination';
import { useActiveAirline } from '../store/activeAirline';

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

  const getGreyListData = async (
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

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['getGreyListData', query, selectedAirlines],
    () => getGreyListData(selectedAirlines, query),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2
    }
  );

  const [cardID, setCardId] = useState('');

  const client = useQueryClient();

  const removeCardFromBlackList = async (cardId: string) => {
    const res = await axios.delete(
      BASE_API_URL + `black_cards/airlines=${mapping}/${cardID}`
    );
    return res.data;
  };
  const { mutate } = useMutation(removeCardFromBlackList, {
    onSuccess: async () => {
      await client.invalidateQueries('getGreyListData');
      setCardId('');
    }
  });

  const handleRemove = (cardNumber: string) => {
    mutate(cardNumber);
  };

  useEffect(() => {
    setTotal(Math.min(data?.total ?? 0, 100 * pageSize));
  }, [setTotal, data?.total, pageSize]);

  const column = new Array<GridColDef | GridActionsColDef>(
    {
      field: 'actions',
      headerName: 'Action',
      width: 100,
      renderCell: params => {
        const rowData = params.row;
        return (
          <Tooltip
            title="Clicking here will remove this card from Grey Cards List"
            placement="top"
          >
            <Button onClick={() => setCardId(rowData.CardNumber)}>
              <Icon>wb_incandescent</Icon>
            </Button>
          </Tooltip>
        );
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
                        AIRLINES[
                          selectedIdx.toString() as keyof typeof AIRLINES
                        ];
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
          <Dialog open={cardID ? true : false} onClose={() => setCardId('')}>
            <DialogTitle id="alert-dialog-title">
              {'Remove this Card from Black List ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will remove this Card from Black List!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setCardId('');
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  handleRemove(cardID);
                }}
              >
                Remove
              </Button>
            </DialogActions>
          </Dialog>
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
