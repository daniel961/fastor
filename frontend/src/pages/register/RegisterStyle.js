import loginBackground from '../../libs/images/login_background.svg';
import { FlowWrapper } from '../../components/flow-wrapper/FlowWrapper';
import { mobile } from '../../libs/styles';
import styled from 'styled-components/macro';

export const FlowWrapperStyle = styled(FlowWrapper)`
  background: url(${loginBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media ${mobile} {
    background: none;
  }

  #flow-card {
    padding: 4rem 4.6rem;
    margin-bottom: 5rem;
    position: relative;

    @media ${mobile} {
      margin-bottom: 0;
      padding: 0 4.6rem 0;
    }
  }
`;
