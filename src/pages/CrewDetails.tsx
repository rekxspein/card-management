import { Box, List, ListItem, ListItemText } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';

export const CrewDetails: FC = () => {
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
        rows={CrewDetail}
        columns={column}
        autoHeight
        disableColumnMenu
        getRowId={row => row.employeeId}
        hideFooterPagination
        rowHeight={200}
      />
    </Box>
  );
};

const CrewDetail = [
  {
    employeeId: '51',
    employeeName: 'Misty Kirlin',
    cardNumber: ['361011000', '0316556', '032131232'],
    cardHolderName: ['Jay Kumar', 'Sarkar', 'Arjun'],
    cardStatus: ['invalid transection', 'do not honor', 'decline'],
    amount: [250, 250, 322],
    status: [1, 1, 0]
  }
];

const column = new Array<GridColDef>(
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
    field: 'cardNumber',
    headerName: 'Card Number',
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
    field: 'cardHolderName',
    headerName: 'Card Holder Name',
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
    field: 'status',
    headerName: 'Status',
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
  }
);
