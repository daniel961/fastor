import { Grid } from '@mui/material';
import styled from 'styled-components/macro';
import { mobile } from '../../libs/styles';

export const NavbarContainer = styled(Grid)`
  position: relative;
  padding: 2.3rem 10rem;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  height: 8rem;
  max-width: 100%;
  z-index: 2;

  @media ${mobile} {
    padding: 2.3rem 2rem;
  }
`;

export const Logo = styled.img`
  cursor: pointer;

  @media ${mobile} {
    max-width: 114.58px;
  }
`;

export const GridStyle = styled(Grid)`
  min-width: 5.5rem;
`;
