import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Grid,
  TextField,
  FormHelperText,
  Snackbar,
  FormControlLabel as MuiFormControlLabel, // Rename the import to avoid conflict with the styled component
} from '@mui/material';

import axios from 'axios';
import { getSession } from 'next-auth/react';
import AuthWrapper from 'src/pages/api/AuthWrapper';
import Cookie from 'js-cookie';

// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode } from 'react';

// ** Next Imports
import Link from 'next/link';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { useAxios } from "../../utils/axios";
import { Buffer } from "buffer";

// ** Icons Imports
import Google from 'mdi-material-ui/Google';
import Github from 'mdi-material-ui/Github';
import Twitter from 'mdi-material-ui/Twitter';
import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

export async function getServerSideProps (context: { req: any; }){
  const { req } = context;
  const uid = req.cookies.uid_token;

  let redirect = false
  if(uid !== undefined){
    redirect = true
  }

  return {
    props: {
      redirect: redirect
    }
  }
}

const LoginPage = ({ redirect }) => {
  // ** State
  const [values, setValues] = useState<State>({
    email: '', // Add the email property with an initial empty string
    password: '',
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const [axios, spinner ] = useAxios();

  useEffect(() => {
    if(redirect){
      router.push('/dashboard')
    }
  }, [])

  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generateString = (length:Number) => {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i:Number = 0; i < length; i+=1 ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Your client-side code
  const handleLogin = async (e: React.FormEvent) => {
    const { email, password } = values;
  
    try {
      const response = await axios.post('/api/login', { email, password })
      .then(({data}) => {
        const uid_token:string = btoa(generateString(10) + data.result.id.toString() + generateString(10));
        Cookie.set('uid_token', uid_token)
        router.push('/dashboard')
      })
    } catch (error) {
      console.log(error); // Handle network or other errors
    }
  };
  

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    
      <Grid container spacing={6} sx={{ mt: 3 }} justifyContent="center" alignItems="center" height="90vh">
        {spinner}
        <Box className="content-center">
          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Welcome to {themeConfig.templateName}! 👋🏻
                </Typography>
                <Typography variant="body2">Please sign-in to your account and start the adventure</Typography>
              </Box>

              {/* <iframe width="auto" height="200" src="https://secure.webhosting.live/embed/loginform" frameborder="0"></iframe> */}

              <form noValidate autoComplete="off" onSubmit={handleLogin}>
                <FormControl fullWidth>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    autoFocus
                    fullWidth
                    id="email"
                    label="Email"
                    sx={{ marginBottom: 4 }}
                    value={values.email} // Add value attribute and bind it to the values.email state
                    onChange={handleChange('email')} // Add onChange attribute and bind it to handleChange('email')
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-login-password">Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    value={values.password}
                    id="auth-login-password"
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {/* <Box
                  sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                >
                  <FormControlLabel control={<Checkbox />} label="Remember Me" />
                  <Link passHref href="/">
                    <LinkStyled onClick={(e) => e.preventDefault()}>Forgot Password?</LinkStyled>
                  </Link>
                </Box> */}
                <Button fullWidth size="large" variant="contained" sx={{ marginBottom: 7, mt: 4 }} onClick={handleLogin}>
                  Login
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    New on our platform?
                  </Typography>
                  <Typography variant="body2">
                    <Link passHref href="/register">
                      <LinkStyled>Create an account</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
  
  );
};

export default LoginPage;
