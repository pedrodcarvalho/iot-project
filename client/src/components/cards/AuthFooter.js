import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; IoTtendance by&nbsp;
          <Typography component={Link} variant="subtitle2" href="https://github.com/pedrodcarvalho" target="_blank" underline="hover">
            pedrodcarvalho
          </Typography>
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
