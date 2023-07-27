// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useAxios } from 'utils/axios'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

type State = {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postcode: string | null;
  phone: string | null;
  email: string | null;
};

const TabAccount = ({ token }) => {
  // ** State
  const [values, setValues] = useState<State>({
    id: token,
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    phone: '',
    email: ''
  });

  const router = useRouter();
  const [axios, spinner] = useAxios();
  
  useEffect(async () => {
    await axios.get(`/api/client/?id=${token}&field=id&field=first_name&field=last_name&field=address_1&field=address_2&field=city&field=state&field=country&field=postcode&field=phone&field=email`)
    .then(({ data }) => {
      if(data.status === 200){
        setValues(data.data)
      }
      else{
        alert("There was an error in fetching your details.")
        window.location.href = '/dashboard'
      }
    })
  }, [])

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Testing")

    await axios.post('/api/update', values)
      .then(({data}) => {
        if(data.status === 200){
          alert("Account details updated successfully.")
        }
        else{
          alert("Failed to update account details")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <CardContent>
      {spinner}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                required
                fullWidth 
                id='first_name' 
                label='First Name' 
                sx={{ marginBottom: 4 }} 
                value={values.first_name}
                onChange={handleChange('first_name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                required
                id="last_name"
                label='Last Name'
                sx={{ marginBottom: 4 }}
                value={values.last_name}
                onChange={handleChange('last_name')}
              />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
                required
                id='phone' 
                type="number"
                label='Phone Number' 
                sx={{ marginBottom: 4 }} 
                value={values.phone}
                onChange={handleChange('phone')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                required
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
                required
                id='address_1' 
                label='Address Line 1' 
                sx={{ marginBottom: 4 }} 
                value={values.address_1}
                onChange={handleChange('address_1')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                id='address_2'
                label='Address Line 2'
                sx={{ marginBottom: 4 }}
                value={values.address_2}
                onChange={handleChange('address_2')}
              />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth
                required 
                id='city' 
                label='City' 
                sx={{ marginBottom: 4 }} 
                value={values.city}
                onChange={handleChange('city')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                required
                id='state'
                label='State'
                sx={{ marginBottom: 4 }}
                value={values.state}
                onChange={handleChange('state')}
              />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
                required
                id='country' 
                label='Country' 
                sx={{ marginBottom: 4 }} 
                value={values.country}
                onChange={handleChange('country')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                fullWidth
                required
                id='postcode'
                label='Postal Code'
                sx={{ marginBottom: 4 }}
                value={values.postcode}
                onChange={handleChange('postcode')}
              />
              </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          </Grid>
          </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
