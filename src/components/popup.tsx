import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function AlertDialog({server}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(server)
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Manage
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Server Management"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                <Grid container spacing={4}>
                    <Grid item xs={12} justifyContent={'center'}>
                        <Typography variant="body1"><b>Domain:</b> { server.domain }</Typography>
                        <Typography variant="body1"><b>Server Name:</b> { server.server.name }</Typography>
                        <Typography variant="body1"><b>Hosting Plan:</b> { server.hosting_plan.name }</Typography>
                        <Typography variant="body1"><b>Server IP:</b> { server.server.ip }</Typography>
                        <Typography variant="body1"><b>Account IP:</b> { server.ip }</Typography>
                        <Typography variant="body1"><b>Username:</b> { server.username }</Typography>
                        <Typography variant="body1"><b>Nameserver 1:</b> { server.server.ns1 }</Typography>
                        <Typography variant="body1"><b>Nameserver 2:</b> { server.server.ns2 }</Typography>
                        <Typography variant="body1"><b>Nameserver 3:</b> { server.server.ns3 }</Typography>
                        <Typography variant="body1"><b>Nameserver 4:</b> { server.server.ns4 }</Typography>
                        <Typography variant="body1"><b>Bandwidth:</b> { server.hosting_plan.bandwidth } MB/per month</Typography>
                        <Typography variant="body1"><b>Disk Quota:</b> { server.hosting_plan.quota } MB</Typography>
                    </Grid>
                </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {window.location.href= server.server.cpanel_url}} autoFocus>
            Open Cpanel Url
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}