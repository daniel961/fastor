import { useState } from 'react';
import { TextField } from '../../ui';
import { ContinueButton } from '../../components/styled';
import { Grid, Typography } from '@material-ui/core';
import { useFastorForm } from '../../libs/hooks';
import { FlowWrapperStyle } from './RegisterStyle';
import { registerFormSchema } from './registerSchemas';
import { useHistory } from 'react-router-dom';
// import { login } from "../../functions";
import { ErrorTextStyle } from '../login/LoginStyle';
import http from '../../axios';
import moment from 'moment';

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFastorForm(registerFormSchema);
  const [errorText, setErrorText] = useState('');
  const history = useHistory();

  const onSubmit = async formValues => {
    const { fullName, email, personalPhoneNumber, password } = formValues;

    try {
      const response = await http.post('/user/signup', {
        fullname: fullName,
        email,
        personalPhoneNumber,
        password,
      });

      if (response.data.isSuccess) {
        const loginResponse = await http.post('/user/signin', {
          email,
          password,
        });

        const sevenDaysFromNow = moment().add(7, 'd').format('YYYY-MM-DD');
        const dateToRemoveCookie = new Date().setTime(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        // login(loginResponse.data.res, sevenDaysFromNow, dateToRemoveCookie);

        setErrorText('');

        return history.push('/business-register');
      } else {
        setErrorText('משהו השתבש. שננסה שוב?');
      }

      throw new Error();
    } catch (e) {
      setErrorText('המייל שבחרת כבר קיים במערכת'); // TODO : Change the error message according to server error response
    }
  };

  return (
    <FlowWrapperStyle size='small' onSubmit={handleSubmit(onSubmit)}>
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
              label='נייד'
              name='personalPhoneNumber'
              type='tel'
              control={control}
              helperText={errors?.personalPhoneNumber?.message}
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
    </FlowWrapperStyle>
  );
};

export default Register;
