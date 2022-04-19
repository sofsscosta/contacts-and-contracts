import React, { useMemo, useState } from 'react';
// import {Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getContacts } from '../../../api';

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

    const newRows = () => {
        const rows = []
        for (let i = 0; i < contacts.length; i++) {
            let basePerson = {
              id: contacts[i].id,
              lastName: contacts[i].field_3_raw.last,
              firstName: contacts[i].field_3_raw.first,
              email: contacts[i].field_5_raw.email,
              nif: contacts[i].field_6,
              role: contacts[i].field_7,
              dateOfBirth: contacts[i].field_4,
              contracts: contacts[i].field_1
            }
            switch(basePerson.role) {
                case('Student'): 
                    basePerson = {...basePerson, teachers: [contacts[i].field_8_raw]}
                break;
                case('Teacher'): 
                    basePerson = {...basePerson, students: contacts[i].field_8}
                break;
                default: return basePerson
            }
            rows.push(basePerson)
        }
        console.log(rows)
        return rows
    }  

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', nif: 222333444, age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', nif: 222333444, age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', nif: 222333444, age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', nif: 222333444, age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', nif: 222333444, age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, nif: 222333444, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', nif: 222333444, age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', nif: 222333444, age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', nif: 222333444, age: 65 },
    // ];

  return (
    <>
      <DataGrid
        rows={newRows()}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  )
}

export default Contacts;