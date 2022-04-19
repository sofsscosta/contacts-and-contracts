import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { getContact } from "../../api";
import { TextField, Box, Button, InputLabel, Typography } from "@mui/material";
import { processContact } from "../../utils";

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

  const fetchApi = useCallback(async () => {
    const result = await getContact(id);
    console.log("result", result);
    setContact(processContact(result));
    console.log("contact", contact);
  }, [contact, id]);

  useMemo(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box m={4}>
      <Box
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
        mb={4}
      >
        <Box
          justifyContent={"start"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          mb={4}
        >
          <TextField label="ID" variant="standard" value={contact.id} disabled/>
          <TextField
            label="First Name"
            variant="standard"
            value={contact.firstName}
          />
          <TextField
            label="Last Name"
            variant="standard"
            value={contact.lastName}
          />
        </Box>
        <Box
          justifyContent={"start"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          mb={4}
        >
          <TextField
            label="Date of Birth"
            variant="standard"
            value={contact.dateOfBirth}
          />
          <TextField label="Age" variant="standard" value={contact.age} />
          <TextField label="Email" variant="standard" value={contact.email} />
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
          <TextField label="NIF" variant="standard" value={contact.nif} />
          <TextField label="Role" variant="standard" value={contact.role} />
          <TextField
            label="Contracts"
            variant="standard"
            value={contact.contracts}
          />
        </Box>
      </Box>
      <Box>
        Contacts
        {contact.contacts.length &&
          contact.contacts.map((el, index) => (
            <div key={index}>
              <Button>{el.identifier}</Button>
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default ContactDetail;
