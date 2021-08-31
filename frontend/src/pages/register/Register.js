import { useState, useEffect } from 'react';
import { TextField } from '../../ui';
import { ContinueButton } from '../../components/styled';
import { Grid, Typography } from '@material-ui/core';
import { useFastorForm } from '../../libs/hooks';
import { registerFormSchema } from './registerSchemas';
import { useHistory } from 'react-router-dom';
import { ErrorTextStyle } from '../login/LoginStyle';
import http from '../../axios';
import Cookies from 'universal-cookie';

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFastorForm({ schema: registerFormSchema });
  const [errorText, setErrorText] = useState('');
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      history.push('/');
    }
  });

  const onSubmit = async formValues => {
    const { fullName, email, password } = formValues;

    try {
      const response = await http.post('/users/register', {
        fullname: fullName,
        email,
        password,
      });

      if (response.data) {
        const dateToRemoveCookie = new Date().setTime(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        cookies.set('token', response.data.token, {
          path: '/',
          expires: new Date(dateToRemoveCookie),
        });

        setErrorText('');
        history.push('/calendar');

        if (response.data.completeRegisteration) {
          history.push('/calendar');
        } else {
          history.push('/business-information');
        }
      } else {
        setErrorText('משהו השתבש. שננסה שוב?');
      }
    } catch (e) {
      setErrorText(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorTextStyle text={errorText}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          direction='column'
          style={{ maxWidth: '29rem', margin: '0 auto' }}
        >
          <Grid
            item
            container
            justifyContent='center'
            style={{ marginBottom: '2rem' }}
          >
            <Typography component='h1' variant='h1'>
              כבר מתחילים...
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              label='שם מלא'
              name='fullName'
              control={control}
              helperText={errors?.fullName?.message}
            />
          </Grid>

          <Grid item>
            <TextField
              label='מייל'
              name='email'
              type='email'
              control={control}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item>
            <TextField
              label='סיסמה'
              name='password'
              type='password'
              control={control}
              helperText={errors?.password?.message}
            />
          </Grid>

          <Grid item style={{ marginBottom: '4rem' }}>
            <TextField
              label='אימות סיסמה'
              name='verifyPassword'
              type='password'
              control={control}
              helperText={errors?.verifyPassword?.message}
            />
          </Grid>

          <Grid item container>
            <ContinueButton type='submit'>הרשמה</ContinueButton>
          </Grid>
        </Grid>
      </ErrorTextStyle>
    </form>
  );
};

export default Register;
