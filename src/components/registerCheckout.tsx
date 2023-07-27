import React, { useEffect, useState } from 'react';
import { Card, FormLabel, RadioGroup, Radio, FormControlLabel, CardHeader, CardContent, Typography, Grid, TextField, Button, FormHelperText, Snackbar } from '@mui/material';
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

  const Form = styled('form')(({ theme }) => ({
    maxWidth: 'auto',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`
  }))

const register = () => {
    const [availabilityResult, setAvailabilityResult] = useState('available');
    const [axios, spinner] = useAxios();
    const [domain, setDomain] = useState('')
    const [selectedTLDs, setSelectedTLDs] = useState(['com']); 
    
    const checkDomain = async e => {
        e.preventDefault()
        await axios.post('/api/checkDomain', {
            sld: domain,
            tld: selectedTLDs[0]
        }).then(({data}) => {
            if(data[domain+'.'+selectedTLDs[0]].status === "unknown"){
                alert("The SLD entered is invalid!")
            }
            setAvailabilityResult(data[domain+'.'+selectedTLDs[0]].status)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
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
                    {availabilityResult && (
                    <div>
                                    
                        { (availabilityResult === "available") && (
                            <AvailableOutput domain={domain} selectedTLDs={selectedTLDs} />
                        )}
                    </div>
                    )}
                </Form>
    )
}

export default register;