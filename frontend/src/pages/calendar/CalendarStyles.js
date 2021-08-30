import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';

export const CalendarContainer = styled.div`
  background: ${props => props.theme.palette.primary.light};
  min-height: 100%;
`;

export const useDatepickerStyles = makeStyles(
  {
    staticWrapperRoot: {
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
  { name: 'MuiPickersStaticWrapper' },
);
