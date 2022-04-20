import React, { useMemo, useState } from "react";
// import {Typography} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { getContacts } from "../../../api";
import { Link } from "react-router-dom";
import { processContact } from "../../../utils";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useMemo(() => {
    (async () => {
      if (!contacts.length) {
        const retrievedContacts = await getContacts();
        setContacts(retrievedContacts);
      }
    })();
  }, [contacts]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/contacts/${params.row.id}`}>{params.row.id}</Link>
      ),
    },
    {
      field: "firstName",
      headerName: "First name",
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      editable: true,
      flex: 1,
    },
    {
      field: "nif",
      headerName: "NIF",
      editable: true,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: [
        { value: "Teacher", label: "Teacher" },
        { value: "Student", label: "Student" },
      ],
      editable: true,
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      type: "date",
      editable: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: false,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      flex: 1,
    },
  ];

  const newRows = contacts.map((el) => processContact(el))

  return (
    <>
      <DataGrid
        rows={newRows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  );
};

export default Contacts;
