import { useEffect, useState } from 'react';

import { Box, Container, Link, Typography } from '@mui/material';
import WarningOutlined from '@ant-design/icons/WarningOutlined';

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
            <Box sx={{ color: 'error.main', fontSize: 100 }}>
              <WarningOutlined sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant='h1' gutterBottom>
              Oh no! Something went wrong.
            </Typography>
            <Typography variant='h5'>
              We&apos;re working on fixing it. Please come back later.
            </Typography>
            <Typography variant='h6'>
              {errorMessage}
            </Typography>
            <Link href='/login' color='inherit'
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
              Go back to login page
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ErrorPage;
