import styled from 'styled-components/macro';
import { ErrorText } from '../../ui';
import { mobile } from '../../libs/styles';
import loginBackground from '../../libs/images/login_background.svg';
import manStanding from '../../libs/images/man_standing.svg';

export const AlreadyHaveAccountText = styled.span`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 5.5rem;
    height: 1px;
    background: black;
    top: 11px;
    left: -70px;
  }

  &:before {
    content: '';
    position: absolute;
    width: 5.5rem;
    height: 1px;
    background: black;
    top: 11px;
    right: -70px;
  }
`;

export const FlowWrapperStyle = styled.div`
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

    &:before {
      content: '';
      width: 12rem;
      height: 36.6rem;
      background: blue;
      position: absolute;
      top: 10%;
      right: -70px;
      background: url(${manStanding});

      @media ${mobile} {
        background: none;
      }
    }

    @media ${mobile} {
      padding: 0rem 1.6rem;
      margin-bottom: 4rem;
    }
  }
`;

export const ErrorTextStyle = styled(ErrorText)`
  #error-span {
    margin: 1rem auto 0;
    max-width: 29rem;
    font-weight: 400;
  }
`;
