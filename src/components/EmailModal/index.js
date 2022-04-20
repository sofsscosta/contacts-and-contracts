import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormLabel, TextareaAutosize } from "@mui/material";
import { sendEmail } from "../../api";
import { FormControl } from '@mui/material';

const EmailModal = ({isModalOpen, handleClose, mailTo}) => {

    const [form, setForm] = useState({
        mailTo,
        subject: '',
        content: ''
    })

    const handleSend = async (e) => {
        console.log('form befresending', form)
        await sendEmail(form)
        handleClose()
    }

    const updateForm = (field, event) => {
      console.log(field, event, {...form, [field]: event.target.value})
      setForm({...form, [field]: event.target.value})
    }
    
  return (
    <>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please introduce the following data to send an email to {mailTo}
          </DialogContentText>
          <FormControl fullWidth value={form}>
            <TextField
                autoFocus
                margin="dense"
                id="suject"
                label="Subject"
                value={form.subject}
                onChange={(event) => updateForm('subject', event)}
                type="text"
                fullWidth
                variant="standard"
                style={{marginBottom: 30}}
            />
            <FormLabel htmlFor="content">Content</FormLabel>
            <TextareaAutosize
                margin="dense"
                id="content"
                label="Content"
                value={form.content}
                onChange={(event) => updateForm('content', event)}
                type="text"
                fullWidth
                variant="standard"
                minRows={6}
                placeholder="Content"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default EmailModal;
