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

const EditStudent = () => {
  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    return await axios.post(`http://localhost:5000/edit-student/${values.action}`, values, {
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
      <MainCard title="Edit student" content="Enter student informations to edit">
        <Formik
          initialValues={{
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            studentNumber: Yup.string().max(255).matches(/^[0-9]+$/, 'Student number must be a number').
              min(8, 'Student number must be at least 8 characters').required('Student number is required'),
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
                    <InputLabel htmlFor="name-Edit">Name</InputLabel>
                    <OutlinedInput
                      id="name-Edit"
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
                      <FormHelperText error id="standard-weight-helper-text-name-Edit">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="studentNumber-Edit">Student number</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.studentNumber && errors.studentNumber)}
                      id="studentNumber-Edit"
                      type="text"
                      value={values.studentNumber}
                      name="studentNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student number"
                    />
                    {touched.studentNumber && errors.studentNumber && (
                      <FormHelperText error id="standard-weight-helper-text-studentNumber-Edit">
                        {errors.studentNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="course-Edit">Course</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.course && errors.course)}
                      id="course-Edit"
                      type="text"
                      value={values.course}
                      name="course"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student course (name and year level)"
                    />
                    {touched.course && errors.course && (
                      <FormHelperText error id="standard-weight-helper-text-course-Edit">
                        {errors.course}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="cardId-Edit">Card ID</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.cardId && errors.cardId)}
                      id="cardId-Edit"
                      type="text"
                      value={values.cardId}
                      name="cardId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter student card ID"
                    />
                    {touched.cardId && errors.cardId && (
                      <FormHelperText error id="standard-weight-helper-text-cardId-Edit">
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
                <Grid item xs={12}
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: '1fr 1fr'
                  }}
                >
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" onClick={() => values.action = 'update'}>
                      Update
                    </Button>
                  </AnimateButton>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" onClick={() => values.action = 'delete'}>
                      Delete
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

export default EditStudent;
