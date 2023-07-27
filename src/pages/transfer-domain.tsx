import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';
import DomainSearchForm from 'src/views/services/domain/DomainSearchForm';

export default function blankPage() {
  
  return (
  <Grid sx={{ mt:'20px' }}>
   <DomainSearchForm />

  </Grid>

  );
}
