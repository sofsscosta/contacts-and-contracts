import React, { useMemo, useState } from 'react';
// import {Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getContacts } from '../../../api';
import { Link } from 'react-router-dom';
import { processContact } from '../../../utils';

const Contacts = () => {

  const [contacts, setContacts] = useState([])

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
        { field: 'id', headerName: 'ID', flex: 1, renderCell: (params) => <Link to={`/contacts/${params.row.id}`}>{params.row.id}</Link> },
        {
            field: 'firstName',
            headerName: 'First name',
            editable: true,
            flex: 1
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            editable: true,
            flex: 1
        },
        {
            field: 'nif',
            headerName: 'NIF',
            editable: true,
            flex: 1
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'singleSelect',
            valueOptions: [{ value: 'Teacher', label: 'Teacher' }, { value: 'Student', label: 'Student' }],
            editable: true,
            flex: 1
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            type: 'date',
            editable: true,
            flex: 1
        },
        // {
        //     field: 'contacts',
        //     headerName: 'Contacts',
        //     editable: true,
        //     flex: 1
        // },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            // upon updating date of birth, trigger webhook to calculate age and retrieve info from there
            valueGetter: (params) =>
            params.row.dateOfBirth
            //calculate age from date of birth
            // `${params.row.firstName || ''} ${params.row.lastName || ''}`
            ,
            flex: 1
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            flex: 1
        },
    ];

    const newRows = (() => {
        const rows = []
        for (let i = 0; i < contacts.length; i++) {
            rows.push(processContact(contacts[i]))
        }
        console.log('rows',rows)
        return rows
    })()

  return (
    <>
      <DataGrid
        rows={newRows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  )
}

export default Contacts;