import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Person from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

const Copyright = (props) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        IoT Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const defaultTheme = createTheme();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.username && formValues.username.length != 0) {
      errors.username = 'Invalid username';
    }

    if (formValues.password.length < 8 && formValues.password.length != 0) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:5000/auth/login', formValues)
        .then(() => {
          window.location.href = '/home';
        });
    }
    else {
      // TODO - handle form validation errors
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
            <Person />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              onChange={handleInputChange}
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              error={!!validateForm().username}
              helperText={validateForm().username}
            />
            <TextField
              onChange={handleInputChange}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              error={!!validateForm().password}
              helperText={validateForm().password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleToggleVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/reset-password' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
