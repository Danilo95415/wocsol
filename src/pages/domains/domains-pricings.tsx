import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';

import { Card, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';

export default function DomainPricing() {
    const [domainPricingDiv, setDomainPricingDiv] = useState<string | null>(null);


    useEffect(() => {
        const fetchDomainPricingTable = async () => {
          try {
            const response = await fetch('/api/domainPricing');

            const html = await response.text();
            const $ = cheerio.load(html);
            const domainPricingDiv = $('.row-white').html();
            setDomainPricingDiv(domainPricingDiv);
          } catch (error) {
            console.error('Error occurred:', error);
          }
        };
      
        fetchDomainPricingTable();
      }, []);
      
      
      return (
        <div>
          <h1>Domain Pricings</h1>
          {domainPricingDiv && <div dangerouslySetInnerHTML={{ __html: domainPricingDiv }} />}
        </div>
      );
      
      

      
}
