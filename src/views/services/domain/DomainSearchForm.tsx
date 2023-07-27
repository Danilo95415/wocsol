import { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  styled,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel
} from '@mui/material'



import { Icon } from '@iconify/react';
import { BoxProps } from '@mui/material';
import { useAxios } from 'utils/axios';
import { useRouter } from 'next/router';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styles from '../../../../styles/SnackbarStyles.module.css';



// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    border: `1px solid ${theme.palette.divider}`
  }
}))


// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 'auto',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))



const DomainSearchForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [domain, setDomain] = useState('')
  const [selectedTLDs, setSelectedTLDs] = useState(['com']); 
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [axios, spinner] = useAxios()
  const router = useRouter()

  const handleTLDChange = (event) => {
    const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedTLDs(selectedValues);
  };
  
  const checkDomain = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('/api/checkDomain', {
        sld: domain,
        tld: selectedTLDs[0]
      });
  
      if (!data.result) {
        setSnackbarOpen(true);
        setAvailabilityResult(null); // Clear the result for invalid SLD
      } else {
        setAvailabilityResult("available");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };

  
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h4' sx={{ fontWeight:'800', marginBottom: 3.5 }}>
            Domain Name Search - Buy a Domain In Minutes
            </Typography>
            <Typography variant='h6'>With Privacy Protection and lots more</Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Box sx={{ p: 2 }}>
              <Typography variant='h6' sx={{ fontWeight:'800', mb: 2 }}>
                Domain Search
              </Typography>
              <Form onSubmit={checkDomain}>
                <Grid container spacing={4} alignItems='center'>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      required
                      name="domain"
                      label='Type the Domain Name you want'
                      value={domain}
                      onChange={e => setDomain(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth required>
                      <InputLabel>TLD</InputLabel>
                    <Select label='TLD' value={selectedTLDs} onChange={handleTLDChange}>
                        <MenuItem value='com'>.com</MenuItem>
                        <MenuItem value='net'>.net</MenuItem>
                        <MenuItem value='org'>.org</MenuItem>
                        <MenuItem value='info'>.info</MenuItem>
                        <MenuItem value='online'>.online</MenuItem>
                        <MenuItem value='dev'>.dev</MenuItem>
                        <MenuItem value='live'>.live</MenuItem>
                        <MenuItem value='email'>.email</MenuItem>                        
                        <MenuItem value='shop'>.shop</MenuItem>
                        <MenuItem value='site'>.site</MenuItem>                        
                        <MenuItem value='blog'>.blog</MenuItem>
                        <MenuItem value='biz'>.biz</MenuItem>
                        <MenuItem value='io'>.io</MenuItem>
                        <MenuItem value='ca'>.ca</MenuItem>
                        <MenuItem value='co'>.co</MenuItem>                        
                        <MenuItem value='us'>.us</MenuItem>
                        <MenuItem value='uk'>.uk</MenuItem>
                        <MenuItem value='in'>.in</MenuItem>                        
                        <MenuItem value='gov'>.gov</MenuItem>
                        <MenuItem value='edu'>.edu</MenuItem>
                        <MenuItem value='game'>.game</MenuItem>
                        
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid md={2} xs={12} sx={{paddingLeft: '1rem', justifyContent: 'center'}}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                      Search
                    </Button>
                  </Grid>
                </Grid>

                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                  style={{ width: '80%', margin: '0 auto' }}
                  className={styles['custom-snackbar']}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%' }}
                  >
                    The SLD entered is invalid. Please enter the domain term only in the search field and select the domain extension from the options field.
                 </MuiAlert>

                 </Snackbar>

                {availabilityResult && (
                  <div>
                                 
                    {availabilityResult === "available" ? (
                      <Card sx={{ mt:15, padding:3 }}>
                        <h2>Domain Availability Result:</h2>       
                         <CardContent sx={{ p:0, m:0 }}>
                         <Box sx={{ p:0, color: 'green' }}>
                        <h3>Domain Name: {domain + '.' + selectedTLDs[0]}</h3>
                        <h3>Status: Domain is available.</h3>
                        </Box>
                        <Button sx={{ float: 'right' }} type='submit' variant='contained' color='success' onClick={() => {router.push({
                          pathname: '/checkout',
                          query: {
                            sld: domain,
                            tld: selectedTLDs[0],
                            plan: 1,
                            promo: false,
                            action: 'register'
                          }
                        })}}>
                        Purchase Domain
                        </Button>    
                        </CardContent>                   
                      </Card>
                    ) : (
                      <Card sx={{ mt:15,  padding:3 }}>
                        <h2>Domain Availability Result:</h2>       
                        <CardContent sx={{ p:0, m:0 }}>
                        <Box sx={{ p:0, color: 'red' }}>
                        <h3>Domain Name: {domain + '.' + selectedTLDs[0]}</h3>
                        <h3>Status: Domain is not available.</h3>
                        </Box>
                        <p>If you are the owner of this domain, you can transfer your domain to your Wocsol account.</p>
                        <Button sx={{ float: 'right' }} type='submit' variant='contained' color='info' onClick={() => {router.push({
                          pathname: '/checkout',
                          query: {
                            sld: domain,
                            tld: selectedTLDs[0],
                            plan: 1,
                            promo: false,
                            action: 'transfer'
                          }
                        })}}>
                        Transfer Now
                        </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}



              </Form>
            </Box>

            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .com
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid>
              <Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .net
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid><Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .org
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid><Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .io
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid><Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .in
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid>
              <Grid item xs={12} md={5}>
                <StyledBox>
                  <Box sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6' sx={{ marginRight: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.75rem !important' }}>
                    .dev
                    </Typography>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '0.75rem !important' }}>
                    $8.99 USD
                    </Typography>                    
                  </Box>                  
                </StyledBox>
              </Grid>
              
            </Grid>
          </CardContent>
        </Grid>

        <Grid item md={4} xs={12}>
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
            }}
          >
            <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                
                <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '2.75rem !important' }}>
                 Current Offer
                </Typography>
                
              </Box>
              
              <Card>
              <Icon icon="clarity:host-solid" color="#a22e50" width="200"  />
                <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                  <Typography variant='h6' sx={{ marginBottom: 2 }}>
                   Free Shared Web Hosting
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>$0.00</Typography>
                  <Typography variant='body2'>
                    3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz
                  </Typography>
                </CardContent>
                <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onClick={() => {router.push({
                          pathname: '/checkout',
                          query: {
                            plan: 1,
                            promo: false
                          }
                        })}}>
                 Buy Now
                </Button>
              </Card>
              
            </Box>
          </CardContent>
        </Grid>

      </Grid>
    </Card>
  )
}

export default DomainSearchForm
