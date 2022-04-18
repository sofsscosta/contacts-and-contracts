import React, { useMemo, useState } from 'react';
// import {Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getContacts } from '../../../api';

const Contacts = () => {

  const [contacts, setContacts] = useState([0,1])

  useMemo(() => {
    (async () => {
        if (!contacts.length) {
            const retrievedContacts = await getContacts()
            console.log(contacts)
            setContacts(retrievedContacts)
        }
    })()
  }, [contacts])

    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'firstName',
            headerName: 'First name',
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            editable: true,
        },
        {
            field: 'nif',
            headerName: 'NIF',
            editable: true,
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            type: 'date',
            editable: false,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            // upon updating date of birth, trigger webhook to calculate age and retrieve info from there
            valueGetter: (params) =>
            //calculate age from date of birth
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    // const newRows = () => {
    //     const rows = []
    //     for (let i = 0; i < contacts.length; i++) {
    //         rows.push({
    //           id: contacts[i].id,
    //           lastName: contacts[i].field_1,
    //           firstName: contacts[i].field_1,
    //           nif: contacts[i].field_1,
    //           dateOfBirth: contacts[i].field_1,
    //         })
    //     }
    // }  

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

  return (
    <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
    />
  )
}

export default Contacts;