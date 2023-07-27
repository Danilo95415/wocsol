import React, { useEffect, useState } from 'react';
import { Card, FormLabel, RadioGroup, Radio, FormControlLabel, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useAxios } from 'utils/axios';
import { remark } from 'remark';
import AvailableOutput from 'src/components/availableOutput'
import html from 'remark-html';
import {
    CardMedia,
    Box,
    Divider,
    styled,
    FormControl,
    MenuItem,
    Select,
    InputLabel
  } from '@mui/material'

  import Snackbar from '@mui/material/Snackbar';
  import MuiAlert from '@mui/material/Alert';
  import styles from '../../styles/SnackbarStyles.module.css';
  

  const getCurrency = async (client_id:number) => {
    const response = await fetch('https://secure.webhosting.live/api/admin/client/get', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: client_id
          })
      })
  
    const currency = await response.json()
    return currency.result.currency;
  }
  
  const convert = async (amount : number, currency: string) => {
    const server = await fetch('https://secure.webhosting.live/api/guest/currency/format', {
                method: 'POST',
                headers: {
                'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: amount, 
                    code: currency
                })
            })

  
    const dat = await server.json()
    return dat.result
  }

export async function getServerSideProps(context){
    const { query } = context
    const {req} = context
    const uid = req.cookies.uid_token

    try{
        const uid_token:number = +atob(uid).split(' ')[1].substring(10,)
    }
    catch(err){
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    if(query.plan !== undefined && query.promo !== undefined){

        try{
            const uid_token:number = +atob(uid).split(' ')[1].substring(10,)

            const currency = await getCurrency(uid_token)
            const response = await fetch('https://secure.webhosting.live/api/guest/product/get', {
                method: 'POST',
                body: JSON.stringify({
                    id: +query.plan
                })
            })

            let temp = await response.json()
            
            if(+query.plan === 1){
                const prices = temp.result.pricing['.' + query.tld]
                
                temp.result.pricing['.' + query.tld].price_registration = (await convert(+prices.price_registration, currency))
                temp.result.pricing['.' + query.tld].price_renew = (await convert(+prices.price_renew, currency))
                temp.result.pricing['.' + query.tld].price_transfer = (await convert(+prices.price_transfer, currency))

                const data ={
                    client_id: uid_token,
                    product_id: +query.plan,
                    tld: query.tld,
                    sld: query.sld,
                    action: query.action,
                    product: temp
                }

                return {
                    props: {
                        promo: query.promo,
                        data: data
                    }
                }
            }
            else{
                const cost1 = await convert(+temp.result.pricing.recurrent['1M'].price, currency)
                const cost2 = await convert(+temp.result.pricing.recurrent['6M'].price, currency)
                const cost3 = await convert(+temp.result.pricing.recurrent['1Y'].price, currency)
                temp.result.pricing.recurrent['1M'].price = cost1.toString()
                temp.result.pricing.recurrent['6M'].price = cost2.toString()
                temp.result.pricing.recurrent['1Y'].price = cost3.toString()

                const data ={
                    client_id: uid_token,
                    product_id: +query.plan,
                    product: temp
                }

                return {
                    props: {
                        promo: query.promo,
                        data: data
                    }
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        return {
            props: {}
        }
    }
}

const Form = styled('form')(({ theme }) => ({
    maxWidth: 'auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`
  }))


export default function blankPage({ data, promo }) {
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter()
    const [description, setDescription] = useState("")
    const [availabilityResult, setAvailabilityResult] = useState('available');
    const [domain, setDomain] = useState('')
    const [selectedTLDs, setSelectedTLDs] = useState(['com']); 
    const [selectedPricing, setPricing] = useState(['1M']); 
    const [axios, spinner] = useAxios();
    const [upi, setUPI] = useState('');
    const [period, setPeriod] = useState(1)
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState({})
    const [currency, setCurrency] = useState('INR')
    const [transferCode, setTransferCode] = useState('')
    const [action, setAction] = useState('register')

    const handleTLDChange = (event) => {
        const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
        setSelectedTLDs(selectedValues);
      };

      const handlePeriodChange = (event) => {
        const selectedValues = event.target.value
        setPeriod(selectedValues);
      };

    const handlePricingChange = (event) => {
        const selectedValues = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
        setPricing(selectedValues);
      };

    useEffect(async () => {
        if(promo === 'true'){
            setPricing(['1Y'])
        }

        await axios.get(`/api/client/?id=${data.client_id}&field=currency&field=id`)
                .then(({data}) => {
                    setCurrency(data.data.currency)
                })
                .catch(err => {
                    console.log(err)
                })

        if(data.product_id === 1){
            setCost(data.product.result.pricing["."+data.tld])
            const number = Math.round((+(data.product.result.pricing["."+data.tld].price_registration.substring(1,)) + ((period-1)*(+(data.product.result.pricing["."+data.tld].price_renew.substring(1,)))))*100)/100
            setPrice('$' + number.toFixed(2).toString())
        }

        if(data.product_id !== 1){
            const processedContent = await remark()
                .use(html)
                .process(data.product.result.description);
            const contentHtml = processedContent.toString();
            setDescription(contentHtml)
        }
    }, [])

    useEffect(() => {
        if(data.product_id === 1){
            const number = Math.round((+(data.product.result.pricing["."+data.tld].price_registration.substring(1,)) + ((period-1)*(+(data.product.result.pricing["."+data.tld].price_renew.substring(1,)))))*100)/100
            setPrice('$' + number.toFixed(2).toString())
        }
    }, [period])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.product_id !== 1){
            const dats = {
                client_id: data.client_id,
                product_id: data.product_id,
                service_type: "hosting",
                config: {
                server_id: "1",
                domain: {
                    action: action === 'register' ? ("register") : ("owndomain"),
                    register_sld: action === 'register' ? domain : null,
                    register_tld: action === 'register' ? "." + selectedTLDs[0] : null,
                    owndomain_sld: action !== 'register' ? domain : null,
                    owndomain_tld: action !== 'register' ? "." + selectedTLDs[0] : null
                }
                },
                invoice_option: "issue-invoice",
                title: data.product.result.title + " for " + domain + "."+selectedTLDs[0],
                price: data.product.result.pricing.recurrent[selectedPricing[0]].price.substring(1, ),
                period: selectedPricing[0],
                notes: upi
            }

            if(data.product_id === 2){
                dats.price = 0
                dats.period = '1Y'
            }

            await axios.post('/api/handleOrder', dats)
                .then(({data}) => {
                    if(data.status === 200){
                        router.push('/dashboard')
                    }
                    else{
                        alert("Failed to place your order.")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            if(data.action === 'register'){
              const dats = {
                client_id: data.client_id,
                product_id: data.product_id,
                service_type: "domain",
                invoice_option: "issue-invoice",
                config: {
                  action: data.action,
                  register_sld: data.sld,
                  register_tld: '.' + data.tld,
                  register_years: period,
                },
                title: 'Domain registration for ' + data.sld + '.' + data.tld,
                period: "1Y",
                price: Math.round((+(cost.price_registration.substring(1,)) + ((period-1)*(+(cost.price_renew.substring(1,)))))*100)/100,
                notes: upi,
                currency: currency
              }

              await axios.post('/api/handleOrder', dats)
                .then(({data}) => {
                    if(data.status === 200){
                        router.push('/dashboard')
                    }
                    else{
                        alert("Failed to place your order.")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }   
            else{
                const dats = {
                    client_id: data.client_id,
                    product_id: data.product_id,
                    service_type: "domain",
                    invoice_option: "issue-invoice",
                    config: {
                      action: data.action,
                      transfer_sld: data.sld,
                      transfer_tld: data.tld,
                      transfer_code: transferCode
                    },
                    notes: upi
                }

                await axios.post('/api/handleOrder', dats)
                .then(({data}) => {
                    if(data.status === 200){
                        router.push('/dashboard')
                    }
                    else{
                        alert("Failed to place your order.")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }

  
      const checkDomain = async (e) => {
        e.preventDefault();
      
        try {
          const { data } = await axios.post('/api/checkDomain', {
            sld: domain,
            tld: selectedTLDs[0]
          });
      
          if (data[domain + '.' + selectedTLDs[0]].status === 'unknown') {
            setSnackbarOpen(true);
            setAvailabilityResult(null); // Clear the result for invalid SLD
          } else {
            setAvailabilityResult(data[domain + '.' + selectedTLDs[0]].status);
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
    <Grid container spacing={4} mt={4}>
        {spinner}
        <Grid item xs={12} md={4}>
            <Card>
                <CardContent>
                <Typography variant="h4">Product Name</Typography>
                    <Typography variant="h4">{data.product.result.title}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    { data.product_id === 1 ? (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: 4, border:'1px solid black', borderRadius: '8px'}}>
                            {
                                data.action === 'transfer' ? 
                                (
                                <Typography variant="h5" sx={{mt: 4, mb: 4}}>
                                    Transfer for {price}
                                </Typography>) : 
                                (<Typography variant="h5" sx={{mt: 4, mb: 4}}>Register for {price}</Typography>)
                            }
                        </Box>
                    ) : null}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={8}>
            { data.product_id === 1 ? null : 
             (<Card>
                <CardContent>
                <Form onSubmit={e => {checkDomain(e)}}>            
                    <Grid container spacing={4} alignItems='center'>
                        <Grid item xs={12}>
                            <FormControl>
                              <FormLabel sx={{ fontSize: '0.875rem' }}>Domain</FormLabel>
                              <RadioGroup row value={action} onChange={(e) => {setAction(e.target.value)}} aria-label='gender' name='account-settings-info-radio'>
                                  <FormControlLabel value='own' label='Own Domain' control={<Radio />} />
                                  <FormControlLabel value='register' label='Register Domain' control={<Radio />} />
                                  <FormControlLabel value='transfer' label='Transfer Domain' control={<Radio />} />
                              </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            required
                            name="domain"
                            label='Type the Domain Name'
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
                          { action === 'register' ? 
                          <Button fullWidth type='submit' variant='contained' color='primary'>
                            Search
                          </Button>
                           : null }
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
                </CardContent>
            </Card>)}
            <Card sx={{mt: 4}}>
                <CardContent>
                <Typography variant="h6">Order Placing Instructions</Typography>

                <ul>
                    <li><p>Choose the desired period/pricing from available options.</p></li>
                    <li><p>Pay the final amount on the company upi id / or scan the QR Code or Use the bank transfer method to make a payment.</p></li>

                    <li><p>Enter your txn id or the upi id or the mobile number of your upi id which you used to pay the amount, in the UPI ID/Number field and than click on place order.</p></li>
                    <li><p>Our backend team will review your order and once your payment is confirmed your order will be activated and you will recieve the response on your registered email.</p></li>
                </ul>

                <Card>
                    <Typography>Payment Account Information</Typography>
                   
                    
                    
                </Card>

                <Card>
      <CardContent>
        <Grid container spacing={4}>
          {/* UPI Payment */}
          <Grid item xs={12} md={6}>
          <Typography variant="h5">UPI Payment</Typography>
            <Box mt={4}  display="flex" alignItems="center" flexDirection="column" sx={{ border:'1px solid black', borderRadius: '8px'}}>
             
              <Box mt={4} >
                <img src="/images/payment/qrcode.png" alt="UPI QR Code" style={{ width: '200px', height: '200px' }} />

                <Typography variant="body1" mt={2}>
                UPI ID: wocsol@axisbank
              </Typography>
              </Box>
              
            </Box>
          </Grid>

          {/* Bank Transfer */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography variant="h5">Bank Transfer</Typography>
              <Divider sx={{ my: 2 }} />
              <TableContainer sx={{border:'1px solid black', borderRadius: '8px'}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Bank:</TableCell>
                      <TableCell>AXISBANK</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account Holder Name:</TableCell>
                      <TableCell>WEBSITE OPTION CYBER SOLUTIONS</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account number:</TableCell>
                      <TableCell>922020019513994</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">IFSC Code:</TableCell>
                      <TableCell>UTIB0004310</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

                
                    <Form onSubmit={handleSubmit}>
                    
                      <Grid container spacing={4} alignItems='center'>
                      
                      { data.product_id !== 1 ? null : (
                        <>
                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            required
                            name="domain"
                            label='Your Reference TXN No./URN/UPI ID/M.Number'
                            value={upi}
                            onChange={e => setUPI(e.target.value)}
                            />
                        </Grid>
                        {
                            data.action === "transfer" ? (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                    fullWidth
                                    required
                                    name="transferCode"
                                    label='Transfer Code'
                                    value={transferCode}
                                    onChange={e => setTransferCode(e.target.value)}
                                    />
                                </Grid>
                            ) : null
                        }
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                            <InputLabel>Period</InputLabel>
                            <Select label='Period' value={period} onChange={handlePeriodChange}>
                                <MenuItem value={1}>1 Year</MenuItem>
                                <MenuItem value={2}>2 Years</MenuItem>
                                <MenuItem value={3}>3 Years</MenuItem>
                                <MenuItem value={4}>4 Years</MenuItem>
                                <MenuItem value={5}>5 Years</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                      </>
                        )}


                      { 
                      
                      (data.product_id === 2 || data.product_id === 1) ? 
                      
                        (null) 
                        
                        : 
                        
                        (<>
                        <Grid item xs={12} md={6}>
                            
                            <TextField
                            fullWidth
                            required
                            name="domain"
                            label='Your Reference TXN No./URN/UPI ID/M.Number'
                            value={upi}
                            onChange={e => setUPI(e.target.value)}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                            <InputLabel>Pricing</InputLabel>
                            <Select label='Pricing' value={selectedPricing} onChange={handlePricingChange}>
                                <MenuItem value='1M'>{data.product.result.pricing.recurrent['1M'].price} every 1 Month</MenuItem>
                                <MenuItem value='6M'>{data.product.result.pricing.recurrent['6M'].price} every 6 Months</MenuItem>
                                <MenuItem value='1Y'>{data.product.result.pricing.recurrent['1Y'].price} every 1 Year</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        </>)    
                    }

                        <Grid xs={12} sx={{ mt: 4, paddingLeft: '1rem', justifyContent: 'center'}}>
                            <Button fullWidth type='submit' variant='contained' color='primary'>
                            PLACE ORDER
                            </Button>
                        </Grid>
                      </Grid>
                    </Form>
                </CardContent>
            </Card>
            
        </Grid>

        

    </Grid>  

  );
}
