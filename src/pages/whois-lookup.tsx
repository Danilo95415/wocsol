import axios from 'axios'
// ** React Imports
import { useState, ChangeEvent, MouseEvent, FormEvent } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

import { FormHelperText  } from '@mui/material';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import CircularProgress from '@mui/material/CircularProgress';


// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: '80%',
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))


export default function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDomainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDomain(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`https://api.whoisfreaks.com/v1.0/whois?apiKey=61cb0a893bbf4ca88cc17f01c1229daa&whois=live&domainName=${domain}`);
      setParsedData(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader title='WHOIS Lookup Tool' titleTypographyProps={{ variant: 'h3', textAlign: 'center', paddingTop:'20px'  }} />
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h5'>Lookup WHOIS Records</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField 
              fullWidth 
              label='Enter Domain Name' 
              placeholder='example.com' 
              name='domainName' 
              type="text" 
              value={domain} 
              onChange={handleDomainChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
                Lookup
              </Button>
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <CircularProgress />
              ) : (
                <FormHelperText variant='h5' 
                sx={{
                  textAlign: 'center',
                  maxHeight: 'auto',
                  overflowY: 'auto',
                  margin: '0 auto',
                  width: '80%',
              }}>
                  {parsedData ? (
                    <div>
                      <h2>WHOIS Records for {domain}</h2>
                      <ul>
                        {Object.entries(parsedData).map(([key, value]) => (
                          <li key={key}>{key}: {JSON.stringify(value)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <h2>No WHOIS Records Found</h2>
                  )}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  );
}
