import { getProducts } from './api/swh';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';
import SwhPricing from 'src/components/SwhPricing';
import { useAxios } from 'utils/axios';

export default function SwhPage() {

  const [products, setProducts] = useState<Array<Object>>([])
  const [axios, spinner] = useAxios()

  useEffect(async () => {
    await axios.get('/api/swh')
      .then(({data}) => {
        setProducts(data)
      })
  }, [])

  return (
    <Box>
      {spinner}
      <SwhPricing products={products}/>
    </Box>
  );
}
