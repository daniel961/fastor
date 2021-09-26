import styled from 'styled-components/macro';
import makeStyles from '@mui/styles/makeStyles';

export const CalendarContainer = styled.div`
  background: ${props => props.theme.palette.primary.light};
  min-height: 100%;
`;

export const StaticDatepickerWrapper = styled.div`
  padding-top: 3rem;

  & > div {
    max-width: 320px;
    margin: 0 auto;
    background-color: transparent;
  }

  .MuiPickersDay-root {
    background-color: transparent;
  }

  .Mui-selected {
    background-color: ${props => props.theme.palette.primary.main};
  }
`;

export const useDatepickerStyles = makeStyles(
  {
    root: {
      maxWidth: '32rem',
      margin: '5rem auto 5rem',
      background: 'transparent',
      '& .MuiToolbar-root': {
        display: 'none',
      },
      '& .MuiPickersCalendar-week': {
        '& .MuiPickersDay-current': {
          fontWeight: 'bold',
        },
      },
      '& .MuiPickersCalendarHeader-switchHeader': {
        '& .MuiButtonBase-root': {
          background: 'transparent',
        },
      },
      '& .MuiPickersSlideTransition-transitionContainer': {
        '& > .MuiTypography-root': {
          fontWeight: 'bold',
        },
      },
      '& .MuiPickersCalendarHeader-daysHeader span': {
        fontWeight: 'bold',
        color: '#000',
        fontSize: '1.6rem',
      },
      '& .MuiPickersToolbar-toolbar': {
        background: 'transparent',
        '& .MuiPickersToolbarText-toolbarTxt': {
          color: '#000',
        },
      },
    },
  },
  { name: 'PrivatePickersToolbar' },
);
