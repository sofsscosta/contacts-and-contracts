import React from 'react';
// import {Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', height: '100%', width: '100%' },
  {
    field: 'requestedBy',
    headerName: 'Requested by',
  },
  {
    field: 'requestedTo',
    headerName: 'RequestedTo',
  },
  {
    field: 'file',
    headerName: 'File',
    type: 'file',
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Contracts = () => {
  return (
    <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
    />
  )
}

export default Contracts;