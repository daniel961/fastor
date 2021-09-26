import styled from 'styled-components';
import { Card } from '@mui/material';

export const AppointmentCard = styled(Card)`
  margin-bottom: 2rem;
  max-width: ${props => props.viewMode === 'column' && '100%'};
`;
