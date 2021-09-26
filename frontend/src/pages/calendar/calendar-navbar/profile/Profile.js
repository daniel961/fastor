// import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import http from '../../../../axios';
import Cookies from 'universal-cookie';

export const Profile = ({ open, handleClose, anchorEl }) => {
  const cookies = new Cookies();
  const history = useHistory();

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
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleLogoutClick}>התנתק</MenuItem>
    </Menu>
  );
};

export default Profile;
