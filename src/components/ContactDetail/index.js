import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Modal from "../EmailModal";
import { getContact, getContactEmail, updateAge } from "../../api";
import { processContact, processDate } from "../../utils";
import frLocale from "date-fns/locale/fr";

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
    age: 0,
    contracts: [],
    contacts: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  const openModal = async (selectedContactId) => {
    const contactEmail = await getContactEmail(selectedContactId);
    setContactEmail(contactEmail);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChangeRole = (e) =>
    setContact({ ...contact, role: e.target.value });

  const handleChangeBirthday = (value) =>{
    setContact({ ...contact, dateOfBirth: value });}

  const handlePickDate = async (value) => {
    const updatedContact = await updateAge({ id: contact.id, dateOfBirth: value });
    const { age, dateOfBirth } = processContact(updatedContact)
    setContact({...contact, age, dateOfBirth })
  };

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

  const Row = ({ children, isLastRow }) => (
    <Box
      justifyContent={"start"}
      display={"flex"}
      flexWrap={"wrap"}
      gap={3}
      mb={4}
      sx={
        isLastRow && {
          "&:after": {
            content: '""',
            flex: "auto",
          },
        }
      }
    >
      {children}
    </Box>
  );

  const FirstRow = () => (
    <Row>
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
    </Row>
  );

  const SecondRow = () => (
    <Row>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <DatePicker
          label="Date of Birth"
          value={contact.dateOfBirth}
          onChange={handleChangeBirthday}
          onAccept={handlePickDate}
          renderInput={(params) => (
            <TextField style={{ width: 300 }} {...params} />
          )}
        />
      </LocalizationProvider>
      <Typography width={300} fontSize={20} alignSelf={"end"}>
        Age: {contact.age}
      </Typography>
      <TextField
        label="Email"
        variant="standard"
        value={contact.email}
        style={{ width: 300 }}
      />
    </Row>
  );

  const ThirdRow = () => (
    <Row isLastRow>
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
    </Row>
  );

  const ContactsArea = () => (
    <>
      <Typography mb={1} fontSize={24}>
        Contacts
      </Typography>
      {contact.contacts?.length &&
        contact.contacts.map((el, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Link to={`/contacts/${el.id}`}>{el.identifier}</Link>
            <Button onClick={() => openModal(el.id)}>Send Email</Button>
            {isModalOpen && (
              <Modal
                isModalOpen={isModalOpen}
                handleClose={closeModal}
                mailTo={contactEmail}
              />
            )}
          </Box>
        ))}
    </>
  );

  const ContractsArea = () => (
    <>
      <Typography mb={1} fontSize={24}>
        Contracts
      </Typography>
      {contact.contacts?.length &&
        contact.contacts.map((el, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Link to={`/contacts/${el.id}`}>{el.identifier}</Link>
            <Button onClick={() => openModal(el.id)}>Download Contract</Button>
            {isModalOpen && (
              <Modal
                isModalOpen={isModalOpen}
                handleClose={closeModal}
                mailTo={contactEmail}
              />
            )}
          </Box>
        ))}
    </>
  );

  return (
    <Box m={4}>
      <Box justifyContent={"space-between"} flexWrap={"wrap"} gap={3} mb={8}>
        <FirstRow />
        <SecondRow />
        <ThirdRow />
      </Box>
      <Divider />
      <Box mt={6} mb={6}>
        <ContactsArea />
      </Box>
      <Divider />
      <Box mt={6}>
        <ContractsArea />
      </Box>
    </Box>
  );
};

export default ContactDetail;
