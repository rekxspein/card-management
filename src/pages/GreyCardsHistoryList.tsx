import { Box, CircularProgress, Icon, Typography } from '@mui/material';
import { DataGrid, GridActionsColDef, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { BASE_API_URL, AIRLINES } from '../constant';
import { useActiveAirline } from '../store/activeAirline';
import moment from 'moment';

const getData = async (airlines: string[]) => {
  const airlinesIds = Object.keys(AIRLINES);
  const mapping = airlines.map(a => airlinesIds.indexOf(a) + 1).join('');

  type BlackCardData = {
    createdAt: string;
    CardNumber: string;
    CardHolderName: string;
    TotalAmount: number;
    Total_transaction: number;
    Approved_Transaction: number;
    Declined_Transaction: number;
  }[];

  const res = await axios.get<[BlackCardData]>(
    BASE_API_URL + `black_cards_history/?airline_id=${mapping}`
  );

  return res.data;
};

export const GreyCardsHistoryListPage: FC = () => {
  const selectedAirlines = useActiveAirline(e => e.activeAirline);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['getData', selectedAirlines],
    () => getData(selectedAirlines),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2
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
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <DataGrid
            key={data?.length}
            rows={data ?? []}
            getRowId={rows => rows._id}
            autoHeight
            loading={isLoading}
            columns={column}
            pagination
            disableSelectionOnClick
            disableColumnMenu
          />
        </Box>
      )}
    </Box>
  );
};

const column = new Array<GridColDef | GridActionsColDef>(
  {
    field: 'CardNumber',
    headerName: 'Card Number',
    width: 200
  },
  {
    field: 'CardHolderName',
    headerName: 'Card Holder Name',
    width: 200
  },
  {
    field: 'Total_transaction',
    headerName: 'Total Transaction',
    width: 150
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    width: 100
  },
  {
    field: 'Approved_Transaction',
    headerName: 'Approved Transaction',
    width: 200
  },
  {
    field: 'Declined_Transaction',
    headerName: 'Declined Transaction',
    width: 200
  },
  {
    field: 'DateCreated',
    headerName: 'Blocked On',
    width: 200,
    valueFormatter: e => {
      return moment(e.value).format('Do MMM, YYYY hh:mm A');
    }
  },
  {
    field: 'RemoveDate',
    headerName: 'Unblocked On',
    width: 200,
    valueFormatter: e => {
      return moment(e.value).format('Do MMM, YYYY hh:mm A');
    }
  }
);
