import { useEffect, useState } from 'react';
import { GradientButton, ContinueButton } from '../../components/styled';
import { Grid } from '@material-ui/core';
import { AlreadyHaveAccountText } from './LoginStyle';
import { TextField, Checkbox, Button, ErrorText } from '../../ui';
import { useFastorForm } from '../../libs/hooks';
import { useHistory } from 'react-router-dom';
import { loginFormSchema } from './loginSchemas';
import Cookies from 'universal-cookie';
import http from '../../axios';

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFastorForm({ schema: loginFormSchema });
  const [errorText, setErrorText] = useState('');
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      history.push('/');
    }
  });

  const onSubmit = async formValues => {
    const { email, password } = formValues;
    try {
      const { data } = await http.post('/users/login', { email, password });

      if (data.token) {
        const dateToRemoveCookie = new Date().setTime(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        );

        cookies.set('token', data.token, {
          path: '/',
          expires: new Date(dateToRemoveCookie),
        });

        setErrorText('');

        if (data.completeRegisteration) {
          history.push('/calendar');
        } else {
          history.push('/business-information');
        }
      }
    } catch (err) {
      console.log(err);
      setErrorText(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorText text={errorText}>
        <Grid container style={{ margin: '0 auto', maxWidth: '29rem' }}>
          <Grid
            container
            justifyContent='center'
            style={{ marginBottom: '4rem' }}
          >
            <GradientButton
              onClick={() => {
                history.push('/register');
              }}
            >
              אני רוצה להירשם בחינם
            </GradientButton>
          </Grid>

          <Grid
            container
            justifyContent='center'
            style={{ marginBottom: '3rem' }}
          >
            <AlreadyHaveAccountText>יש לי כבר חשבון</AlreadyHaveAccountText>
          </Grid>

          <Grid container justifyContent='center'>
            <span>כניסה לאיזור האישי</span>
          </Grid>

          <Grid
            container
            direction='column'
            alignItems='center'
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <TextField
                name='email'
                control={control}
                label='מייל'
                helperText={errors?.email?.message}
              />
            </Grid>

            <Grid item>
              <TextField
                name='password'
                control={control}
                label='סיסמה'
                type='password'
                helperText={errors?.password?.message}
              />
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            style={{ marginBottom: '3rem' }}
          >
            <Grid item>
              <Checkbox
                name='remember'
                control={control}
                label='זכור אותי'
                disabled
              />
            </Grid>

            <Grid item>
              <Button variant='text' disabled>
                שכחתי את הסיסמה
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <ContinueButton type='submit'>כניסה</ContinueButton>
          </Grid>
        </Grid>
      </ErrorText>
    </form>
  );
};

export default Login;
