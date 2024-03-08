import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Container, Link, Typography, IconButton } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    setErrorMessage(`${message || 'Apologies for the inconvenience...'}`);
  }, []);

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <IconButton sx={{ color: 'error.main', fontSize: 100 }}>
              <ErrorIcon sx={{ fontSize: 100 }} />
            </IconButton>
            <Typography variant='h1' gutterBottom>
              Oh no! Something went wrong.
            </Typography>
            <Typography variant='h5'>
              We&apos;re working on fixing it. Please come back later.
            </Typography>
            <Typography variant='h6'>
              {errorMessage}
            </Typography>
            <Link href='/home' color='inherit'
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
                fontSize: 16,
                fontWeight: 600,
                color: 'primary.main'
              }}
            >
              Go back to home
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ErrorPage;
