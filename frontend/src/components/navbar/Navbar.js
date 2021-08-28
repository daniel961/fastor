import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../ui';
import { Logo, NavbarContainer, GridStyle } from './NavbarStyle';
import Cookies from 'universal-cookie';

export const Navbar = ({ showPrevButton = true }) => {
  const history = useHistory();
  const location = useLocation();
  const cookies = new Cookies();
  const token = cookies.get('token');

  // const handleGoBack = () => {};

  const handleConnectClick = () => {
    history.push('/login');
  };

  const handleLogoutClick = () => {
    // logout();
    history.push('/');
    window.location.reload(); // clear redux states
  };

  return (
    <>
      {!location.pathname.includes('admin-panel') && (
        <NavbarContainer
          container
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Logo src='' alt='לוגו' onClick={() => history.push('/')} />
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
