import {
  Box,
  Button,
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
import { Loading } from '../component/Loading';
import { BASE_API_URL } from '../constant';

const getData = async (id: string | undefined) => {
  return await axios
    .get(BASE_API_URL + `airasia_all_data/findempid/${id}`)
    .then(r => {
      return r.data;
    })
    .catch(error => error);
};

export const CrewDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(['getData', id], () => getData(id), {
    keepPreviousData: true
  });

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
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee Name : {data[0].EmployeeName}</TableCell>
                <TableCell align="right">
                  Employee ID : {data[0].EmployeeId}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
      <DataGrid
        rows={data}
        columns={column}
        autoHeight
        disableColumnMenu
        pagination
        getRowId={row => row.id}
        getRowHeight={() => 'auto'}
      />
    </Box>
  );
};

const column = new Array<GridColDef>(
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
    width: 200
  }
);
