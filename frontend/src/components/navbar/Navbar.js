import { Grid } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../ui';
import { Logo, NavbarContainer, GridStyle } from './NavbarStyle';
import Cookies from 'universal-cookie';
import http from '../../axios';
import logo from '../../libs/icons/logo.svg';

export const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleConnectClick = () => {
    history.push('/login');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await http.post('/users/logout');

      if (response.status === 200) {
        cookies.remove('token');
        history.push('/');
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err); // TODO: Turn on some screen that displays nice error for that
    }
  };

  return (
    <>
      {!location.pathname.includes('calendar') && (
        <NavbarContainer
          container
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Logo src={logo} alt='לוגו' onClick={() => history.push('/')} />
          </Grid>

          <GridStyle item>
            {token ? (
              <Button onClick={handleLogoutClick}>התנתק</Button>
            ) : (
              location.pathname !== '/login' && (
                <Button onClick={handleConnectClick}>כניסה</Button>
              )
            )}
          </GridStyle>
        </NavbarContainer>
      )}
    </>
  );
};

export default Navbar;
