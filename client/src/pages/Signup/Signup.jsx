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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const defaultTheme = createTheme();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
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

    if (!formValues.firstName && formValues.firstName.length != 0) {
      errors.firstName = 'First name is required';
    }
    if (!formValues.lastName && formValues.lastName.length != 0) {
      errors.lastName = 'Last name is required';
    }
    if ((!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) && formValues.email.length != 0) {
      errors.email = 'Invalid email address';
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
      axios.post('http://localhost:5000/auth/register', formValues);
    }
    else {
      // TODO - handle form validation errors
      console.error('Form validation failed:', errors);
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
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  error={!!validateForm().firstName}
                  helperText={validateForm().firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  error={!!validateForm().lastName}
                  helperText={validateForm().lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  error={!!validateForm().email}
                  helperText={validateForm().email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='new-password'
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary' />}
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
