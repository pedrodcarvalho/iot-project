import React from 'react';
import axios from 'axios';

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

import MainCard from 'components/MainCard';

import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';

const AttendanceCheck = () => {
  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    return await axios.post('http://localhost:5000/add-student', values, {
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
      <MainCard title="Add new student" content="Enter student informations to add">
        <Formik
          initialValues={{
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            studentNumber: Yup.string().max(255).matches(/^[0-9]+$/, 'Student number must be a number')
              .min(8, 'Student number must be at least 8 characters').required('Student number is required'),
            course: Yup.string().max(255).matches(/^[a-zA-Z\s]+[0-9]+$/, 'Course must include the name followed by a space and the year level')
              .required('Course is required'),
            cardId: Yup.string().max(255).required('Card ID is required')
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
                    <InputLabel htmlFor="name-Add">Name</InputLabel>
                    <OutlinedInput
                      id="name-Add"
                      type="name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="standard-weight-helper-text-name-Add">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="studentNumber-Add">Student number</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.studentNumber && errors.studentNumber)}
                      id="studentNumber-Add"
                      type="text"
                      value={values.studentNumber}
                      name="studentNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student number"
                    />
                    {touched.studentNumber && errors.studentNumber && (
                      <FormHelperText error id="standard-weight-helper-text-studentNumber-Add">
                        {errors.studentNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="course-Add">Course</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.course && errors.course)}
                      id="course-Add"
                      type="text"
                      value={values.course}
                      name="course"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student course (name and year level)"
                    />
                    {touched.course && errors.course && (
                      <FormHelperText error id="standard-weight-helper-text-course-Add">
                        {errors.course}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="cardId-Add">Card ID</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.cardId && errors.cardId)}
                      id="cardId-Add"
                      type="text"
                      value={values.cardId}
                      name="cardId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student card ID"
                    />
                    {touched.cardId && errors.cardId && (
                      <FormHelperText error id="standard-weight-helper-text-cardId-Add">
                        {errors.cardId}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Add
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
