import React, { useState, useMemo } from "react";
import { getContracts } from "../../../api";
// import {Typography} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { processContract } from "../../../utils";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "issuer",
    headerName: "Requested by",
    flex: 0.5,
  },
  {
    field: "sender",
    headerName: "Requested To",
    flex: 0.5,
  },
  {
    field: "file",
    headerName: "File",
    flex: 1.5,
    renderCell: (params) => (
      <a target="_blank" href={params.value.url} rel="noreferrer">
        {params.value.label}
      </a>
    ),
  },
];

const Contracts = () => {
  const [contracts, setContracts] = useState([]);

  useMemo(() => {
    (async () => {
      if (!contracts.length) {
        const retrievedContracts = await getContracts();

        setContracts(retrievedContracts);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = contracts.map((el) => processContract(el));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      disableSelectionOnClick
    />
  );
};

export default Contracts;
