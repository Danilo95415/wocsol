// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

import { Card, CardHeader,  Grid,  FormHelperText, Snackbar } from '@mui/material';

import { useRouter } from 'next/router'
// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useAxios } from '../../utils/axios'
import Cookie from 'js-cookie'
// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

type State = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
};

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState<State>({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const router = useRouter();
  const [axios, spinner] = useAxios();

  // ** Hook
  const theme = useTheme()


  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generateString = (length:Number) => {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i:Number = 0; i < length; i+=1 ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Prepare the user data
    const userData = {
      auto_login: true,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      password_confirm: values.confirm_password,
      address_1: values.address_1,
      address_2: values.address_2,
      city: values.city,
      state: values.state,
      country: values.country,
      postcode: values.postcode,
      phone: values.phone,
      currency: 'INR'
    };

    try {
      // Send a POST request to the API endpoint to create a user
      axios.post('/api/handleLogin', userData)
      .then(({data}) => {
        if(data.status === 200){
          console.log(data)
          // router.push('/login');
          const uid_token:string = btoa(generateString(10) + data.user.toString() + generateString(10));
          Cookie.set('uid_token', uid_token)
          router.push('/dashboard')
        }
        else{
          alert("Failed to create user.")
        }
      })
    } catch (error) {
      console.error('An error occurred while creating the user', error);
    }
  };
  
  return (
    <Grid container spacing={6} sx={{mt: 16, mb: 16}} justifyContent="center" alignItems="center">
    {spinner}
    <Box className='content-center' sx={{ width: "70vw" }}>
      <Card sx={{ zIndex: 1, width: "100% !important" }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
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
                id="last_name"
                label='Last Name'
                sx={{ marginBottom: 4 }}
                value={values.last_name}
                onChange={handleChange('last_name')}
              />
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-register-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{mb: 4}}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Confirm Password</InputLabel>
                  <OutlinedInput
                    label='Confirm Password'
                    value={values.confirm_password}
                    id='auth-register-password'
                    onChange={handleChange('confirm_password')}
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showConfirmPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
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
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
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
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
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
                id='state'
                label='State'
                sx={{ marginBottom: 4 }}
                value={values.state}
                onChange={handleChange('state')}
              />
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
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
                id='postcode'
                label='Postal Code'
                sx={{ marginBottom: 4 }}
                value={values.postcode}
                onChange={handleChange('postcode')}
              />
              </Grid>
            </Grid>
           <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7, marginTop: "1rem" }} onClick={handleRegister}>
            Sign up
          </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
     
    </Box>
    </Grid>
  )
}


export default RegisterPage
