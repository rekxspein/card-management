import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { BASE_API_URL } from '../constant';
import { useActiveAirline } from '../store/activeAirline';

const getData = async (
  id: string | undefined,
  airlines: string[],
  airline: string | undefined
) => {
  const res = await axios.get<
    [
      {
        id: string;
        EmployeeName: string;
        EmployeeId: number;
        CardNumber: string;
        CardHolderName: string;
        Amount: number;
        Status: string;
      }
    ]
  >(BASE_API_URL + `find_by_empid/airlines=${airline}/emp_id=${id}`);

  return res.data;
};

export const CrewDetailsPage: FC = () => {
  const { id, airline } = useParams();
  const airlines = useActiveAirline(e => e.activeAirline);
  const { data, isLoading } = useQuery(['getData', id, airlines, airline], () =>
    getData(id, airlines, airline)
  );
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
          sx={{ m: 1 }}
          variant="contained"
          href="/crews"
        >
          &lt; Back
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Crew Name : {(data && data[0]?.EmployeeName) ?? 'N/A'}
                </TableCell>
                <TableCell align="right">
                  Employee ID : {(data && data[0]?.EmployeeId) ?? 'N/A'}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
      <DataGrid
        rows={data ?? []}
        columns={column}
        autoHeight
        disableColumnMenu
        pagination
        loading={isLoading}
        getRowId={row => row.id}
        getRowHeight={() => 'auto'}
        components={{
          LoadingOverlay: LinearProgress
        }}
      />
    </Box>
  );
};

const column = new Array<GridColDef>(
  {
    field: 'EmployeeName',
    headerName: 'Crew Name',
    width: 200
  },
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
    field: 'Amount',
    headerName: 'Amount',
    width: 200
  },
  {
    field: 'Status',
    headerName: 'Rejection Reason',
    width: 400
  }
);
