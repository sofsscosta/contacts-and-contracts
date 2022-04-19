import React, {
  useMemo,
  //   useRef,
  //   useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { getContact } from "../../api";
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { processContact } from "../../utils";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ContactDetail = () => {
  const { id } = useParams();

  const [contact, setContact] = useState({
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    nif: "",
    role: "",
    dateOfBirth: "",
    age: "",
    contracts: "",
    contacts: "",
  });

  const getAge = () => 20;

  const openModal = () => {};

  const handleChangeRole = (e) =>
    setContact({ ...contact, role: e.target.value });

  const handleChangeBirthday = (e) =>
    setContact({ ...contact, dateOfBirth: e });

  const fetchApi = useCallback(async () => {
    const result = await getContact(id);
    console.log("result", result);
    const processedContact = processContact(result);
    setContact(processedContact);
    console.log("contact", contact);
  }, [contact, id]);

  useMemo(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box m={4}>
      <Box justifyContent={"space-between"} flexWrap={"wrap"} gap={3} mb={4}>
        <Box
          justifyContent={"start"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          mb={4}
        >
          <TextField
            label="ID"
            variant="standard"
            value={contact.id}
            disabled
            style={{ width: 300 }}
          />
          <TextField
            label="First Name"
            variant="standard"
            value={contact.firstName}
            style={{ width: 300 }}
          />
          <TextField
            label="Last Name"
            variant="standard"
            value={contact.lastName}
            style={{ width: 300 }}
          />
        </Box>
        <Box
          justifyContent={"start"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          mb={4}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={contact.dateOfBirth}
              onChange={handleChangeBirthday}
              renderInput={(params) => <TextField  style={{ width: 300 }} {...params} />}
            />
          </LocalizationProvider>
          <Typography width={300} fontSize={20} alignSelf={"end"}>
            Age: {getAge()}
          </Typography>
          <TextField
            label="Email"
            variant="standard"
            value={contact.email}
            style={{ width: 300 }}
          />
        </Box>
        <Box
          justifyContent={"start"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          mb={4}
          sx={{
            "&:after": {
              content: '""',
              flex: "auto",
            },
          }}
        >
          <TextField
            label="NIF"
            variant="standard"
            value={contact.nif}
            style={{ width: 300 }}
          />
          <FormControl style={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={contact.role}
              label="Role"
              variant="standard"
              onChange={handleChangeRole}
            >
              <MenuItem value={"Teacher"}>Teacher</MenuItem>
              <MenuItem value={"Student"}>Student</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Contracts"
            variant="standard"
            value={contact.contracts}
            style={{ width: 300 }}
          />
        </Box>
      </Box>
      <Box>
        Contacts
        {contact.contacts.length &&
          contact.contacts.map((el, index) => (
            <Box key={index} display={"flex"} flexDirection={"row"}>
              <Link to={`/contacts/${el.id}`}>{el.identifier}</Link>
              <Button onClick={openModal}>Send Email</Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ContactDetail;
