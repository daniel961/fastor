import styled from 'styled-components/macro';
import { Typography, makeStyles } from '@material-ui/core';

export const BusinessInformationContainer = styled.div`
  margin: 0 auto;
  max-width: 96rem;
  padding-top: 6rem;
`;

export const InformationHeading = styled(Typography)`
  max-width: 28rem;
  margin: 0 auto 1rem;
  text-align: center;
  font-size: 3rem;
`;

export const useStyles = makeStyles({
  root: {
    width: '35rem',
    flexGrow: 1,
    margin: '0 auto',
    background: 'none',
  },
});
