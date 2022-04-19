import React, { useMemo, useRef } from 'react'
import { useParams } from 'react-router';
import { getContact } from '../../api';
import { TextField } from '@mui/material';

const ContactDetail = ({ person }) => {
    const { id } = useParams();
    let contact = useRef(person || undefined)

    useMemo(() => {
      (async () => {
          if ( !contact) {
              contact.current = await getContact(id)
              console.log(contact)
          }
      })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </>
    )
}

export default ContactDetail