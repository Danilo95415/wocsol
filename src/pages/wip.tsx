import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';

export default function blankPage() {
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '80vh'}}>
        <Typography variant="h3" sx={{textTransform: "uppercase"}}>Work In Progress</Typography>
        <Typography variant="body2">We will notify you once it is implemented.</Typography>
    </Box>
  );
}
