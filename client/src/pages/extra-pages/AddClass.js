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

const AddStudent = () => {
  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');

    return await axios.post('http://localhost:5000/add-class', values, {
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
            submit: null
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
                    <OutlinedInput
                      id="class-Add"
                      type="class"
                      value={values.class}
                      name="class"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter class name"
                      fullWidth
                      error={Boolean(touched.class && errors.class)}
                    />
                    {touched.class && errors.class && (
                      <FormHelperText error id="standard-weight-helper-text-class-Add">
                        {errors.class}
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

export default AddStudent;
