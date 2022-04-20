import React from 'react';
// import {Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID' },
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

const rows = []

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