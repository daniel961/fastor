import { useState } from 'react';
import {
  CalendarNavbarContainer,
  MenuButton,
  MenuItem,
  IconsContainer,
  IconButtonStyle,
  VertIcon,
} from './CalendarNavbarStyles';
import { Grid, IconButton, useMediaQuery } from '@mui/material';
import { useSmallScreen } from '../../../libs/hooks';
import { useHistory } from 'react-router-dom';
import logo from '../../../libs/icons/logo.svg';
import profile from '../../../libs/icons/profile.svg';
import share from '../../../libs/icons/share.svg';
import notifications from '../../../libs/icons/notifications.svg';
import Share from './share/Share';
import Profile from './profile/Profile';

export const CalendarNavbar = ({
  openNewAppointmentsDialog,
  openBlockAppointmentsDialog,
}) => {
  const isSmallScreen = useSmallScreen();
  const history = useHistory();
  const hideActionButtonsSize = useMediaQuery('(max-width: 980px)');

  const [anchorShare, setShareAnchor] = useState(null);
  const [anchorProfile, setProfileAnchor] = useState(null);

  const isShareOpened = Boolean(anchorShare);
  const isProfileOpened = Boolean(anchorProfile);

  const handleShareBtnClick = event => {
    setShareAnchor(event.currentTarget);
  };

  const handleProfileBtnClick = event => {
    setProfileAnchor(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchor(null);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  return (
    <CalendarNavbarContainer
      container
      alignItems='center'
      justifyContent='space-between'
      direction='row'
      wrap='nowrap'
    >
      {isSmallScreen && <Grid item style={{ flex: 1 }}></Grid>}

      <Grid item style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <img
          src={logo}
          alt='לוגו'
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/calendar')}
        />
      </Grid>

      {!hideActionButtonsSize && (
        <Grid
          item
          container
          justifyContent='center'
          alignItems='center'
          style={{ height: '100%', flex: 2 }}
        >
          <MenuItem item>
            <MenuButton variant='text' onClick={openNewAppointmentsDialog}>
              קביעת תור
            </MenuButton>
          </MenuItem>

          <MenuItem item>
            <MenuButton variant='text' onClick={openBlockAppointmentsDialog}>
              חסימת תור
            </MenuButton>
          </MenuItem>
        </Grid>
      )}

      {isSmallScreen ? (
        <Grid
          item
          style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
        >
          <IconButton size="large">
            <VertIcon />
          </IconButton>
        </Grid>
      ) : (
        <IconsContainer item container alignItems='center'>
          <IconButtonStyle onClick={handleShareBtnClick}>
            <img src={share} alt='שיתוף' />
          </IconButtonStyle>

          <IconButtonStyle>
            <img src={notifications} alt='התראות' />
          </IconButtonStyle>

          <IconButtonStyle onClick={handleProfileBtnClick}>
            <img src={profile} alt='פרופיל' />
          </IconButtonStyle>
        </IconsContainer>
      )}

      <Share
        open={isShareOpened}
        handleClose={handleShareClose}
        anchorEl={anchorShare}
      />

      <Profile
        open={isProfileOpened}
        handleClose={handleProfileClose}
        anchorEl={anchorProfile}
      />
    </CalendarNavbarContainer>
  );
};

export default CalendarNavbar;
