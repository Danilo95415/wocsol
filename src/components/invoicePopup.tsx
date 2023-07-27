import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';

export default function AlertDialog({ invoice }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(invoice)
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">
          {"Invoice Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={6}>
                <Grid item xs={12} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">Invoice Number: {invoice.serie_nr}</Typography>
                            <Typography variant="body1">Invoice Date: {invoice.created_at}</Typography>
                            <Typography variant="body1">{invoice.status === "paid" ? `<b>Payment Date:</b> ${invoice.paid_at}` :   `Due Date: ${invoice.due_at}`}</Typography>
                            <Typography variant="body1">Invoice Status: {invoice.status}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Company</Typography>
                            <Typography variant="body1"><b>Name:</b> {invoice.company}</Typography>
                            <Typography variant="body1"><b>Address:</b> {invoice.company_address}</Typography>
                            <Typography variant="body1"><b>Phone:</b> {invoice.phone_company}</Typography>
                            <Typography variant="body1"><b>Email:</b> {invoice.email}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Billing Address</Typography>
                            <Typography variant="body1"><b>Name:</b> {invoice.name}</Typography>
                            <Typography variant="body1"><b>Phone:</b> {invoice.phone}</Typography>
                            <Typography variant="body1"><b>Company:</b> {invoice.company_profile}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 4, border: "1px solid black", p: 2}}>
                <Grid item xs={12} md={8}>
                    <Typography sx={{ ml: 4, textTransform: 'uppercase' }}><b>Title</b></Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography sx={{ textTransform: 'uppercase' }}><b>Price</b></Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography sx={{ ml: 4, textTransform: 'uppercase' }}><b>Total</b></Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ border: "1px solid black", borderTop: 'none', p: 2}}>
                <Grid item xs={12} md={8}>
                    <Typography sx={{ ml: 4}}>{invoice.title}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography >{invoice.price}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography sx={{ ml: 4}}>{invoice.price}</Typography>
                </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}