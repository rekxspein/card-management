import {
  Box,
  Button,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Pagination
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';

export const CrewDetailsPage: FC = () => {
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
          justifyContent: 'space-between'
        }}
      >
        <Box></Box>
        <Button
          id="create-order-orderlist-btn"
          sx={{ my: 2 }}
          variant="contained"
          href="/crews"
        >
          &lt; Back
        </Button>
      </Box>
      <DataGrid
        rows={CrewDetail}
        columns={column}
        autoHeight
        disableColumnMenu
        getRowId={row => row.employeeId}
        getRowHeight={() => 'auto'}
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: LinearProgress
        }}
      />
    </Box>
  );
};

const CrewDetail = [
  {
    employeeId: '51',
    employeeName: 'Misty Kirlin',
    cardNumber: ['361011000', '0316556', '032131232', '1326466564'],
    cardHolderName: ['Jay Kumar', 'Sarkar', 'Arjun', 'All Pick'],
    cardStatus: [
      'invalid transaction',
      'insufficeint fund',
      'decline',
      'Pin Declined'
    ],
    amount: [250, 250, 322, 800],
    status: [1, 1, 0, 1]
  }
];

const column = new Array<GridColDef>(
  {
    field: 'employeeId',
    headerName: 'Employee ID',
    width: 100
  },
  {
    field: 'employeeName',
    headerName: 'Employee Name',
    width: 150
  },
  {
    field: 'cardNumber',
    headerName: 'Card Number',
    width: 200,
    renderCell: params => {
      const data = params.value;
      return (
        <List>
          {data.map((e: any, idx: number) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={e} />
                <Divider />
              </ListItem>
            );
          })}
        </List>
      );
    }
  },
  {
    field: 'cardHolderName',
    headerName: 'Card Holder Name',
    width: 180,
    renderCell: params => {
      const data = params.value;
      return (
        <List>
          {data.map((e: any, idx: number) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={e} />
              </ListItem>
            );
          })}
        </List>
      );
    }
  },
  {
    field: 'cardStatus',
    headerName: 'Card Status',
    width: 300,
    renderCell: params => {
      const data = params.value;
      return (
        <List>
          {data.map((e: any, idx: number) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={e} />
              </ListItem>
            );
          })}
        </List>
      );
    }
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    renderCell: params => {
      const data = params.value;
      return (
        <List>
          {data.map((e: any, idx: number) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={e} />
              </ListItem>
            );
          })}
        </List>
      );
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: params => {
      const data = params.value;
      return (
        <List>
          {data.map((e: any, idx: number) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={e} />
              </ListItem>
            );
          })}
        </List>
      );
    }
  }
);

const CustomPagination = () => {
  return <Pagination count={10} color="primary" />;
};
