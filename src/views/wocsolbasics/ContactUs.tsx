/* eslint-disable lines-around-comment */

import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

import sendEmail from '../api/sendMail';
import Snackbar from '@mui/material/Snackbar';



const ContactUs = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formValues;

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.text();
      console.log(data);

      setOpenSnackbar(true); // display the snackbar when the email is sent successfully
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Card>
      <CardHeader title="Contact WOCSOL" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name here."
                name="name"
                value={formValues.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="example@mail.com"
                helperText="You can use letters, numbers & periods"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Phone No."
                placeholder="+1-123-456-8790"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Message"
                placeholder="Type your message here and than hit the submit button below."
                name="message"
                value={formValues.message}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MessageOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message="Your message has been sent successfully. The Wocsol support team will contact you back shortly."
          />
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default ContactUs