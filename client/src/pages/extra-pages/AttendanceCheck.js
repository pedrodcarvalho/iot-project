import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  List,
} from '@mui/material';

import { DeleteOutlined } from '@ant-design/icons';

import MainCard from 'components/MainCard';

import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';

import { setUser } from 'store/reducers/user';

const AttendanceCheck = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(user);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  let [classes, setClasses] = useState([]);
  let [presentStudents, setPresentStudents] = useState([]);

  const fetchUser = () => {
    try {
      setToken(localStorage.getItem('token'));

      axios.get('http://localhost:5000/user', {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          setUserData(userData);
          dispatch(setUser(res.data));
          console.log(res.data);
        });
    }
    catch (err) {
      window.location.href = `/error?message=${err.message}`;
    }
  };

  const fetchClasses = async () => {
    try {
      await axios.get(`http://localhost:5000/get-classes`, {
        headers: {
          Authorization: token
        }
      }).then((res) => {
        setClasses(res.data);
        console.log(res.data);
      });
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchClasses();
  }, []);

  /*  */

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = async (message) => {
      console.log('Received message:', message.data);
      try {
        await axios.get(`http://localhost:5000/find-student/${message.data}`, {
          headers: {
            Authorization: token
          }
        }).then((res) => {
          if (!presentStudents.includes(res.data.name)) {
            setPresentStudents([...presentStudents, res.data.name]);
          }

          console.log(res.data);
        });
      }
      catch (err) {
        console.log(err);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, [token, presentStudents]);

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    values.students = presentStudents;

    return await axios.post('http://localhost:5000/make-attendance', values, {
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <>
      <MainCard title="Add new class">
        <Formik
          initialValues={{
            submit: null,
            class: ''
          }}
          validationSchema={Yup.object().shape({
            class: Yup.string().max(255).required('Class name is required')
          })}
          onSubmit={async function (values, { setErrors, setStatus, setSubmitting }) {
            try {
              setStatus({ success: false });
              setSubmitting(false);

              const err = await handleSubmit(values);

              if (err) {
                setErrors({ submit: 'Something went wrong... Please try again.' });
              }
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="class-Add">Class</InputLabel>
                    <Select
                      id="class-Add"
                      type="class"
                      value={values.class}
                      name="class"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter class name"
                      fullWidth
                      error={Boolean(touched.class && errors.class)}
                    >
                      {classes.map((_class) => (
                        <MenuItem key={_class.name} value={_class.name}>{_class.name}</MenuItem>
                      ))}
                    </Select>
                    {touched.class && errors.class && (
                      <FormHelperText error id="standard-weight-helper-text-class-Add">
                        {errors.class}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {presentStudents.map((student) => (
                      <MenuItem key={student} value={student}>
                        <Grid item xs={12} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                        >
                          {student}
                          <Button onClick={() => {
                            setPresentStudents(presentStudents.filter((s) => s !== student));
                          }}><DeleteOutlined /></Button>
                        </Grid>
                      </MenuItem>
                    ))}
                  </List>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Make Attendance
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </ MainCard>
    </>
  );
};

export default AttendanceCheck;
