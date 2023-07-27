import { getProducts } from './api/swh';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';
import SwhPricing from 'src/components/SwhPricing';



export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}

export default function SwhPage( {products} ) {
  return (
    <SwhPricing products={products}/>
  );
}
