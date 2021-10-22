import { styled } from "@mui/material";
import { ErrorText, Button } from "../../ui";
import { mobile } from "../../libs/styles";
import { PageContainer } from "../../components/styled";
import manStanding from "../../libs/images/man_standing.svg";

export const AlreadyHaveAccountText = styled("span")`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 5.5rem;
    height: 1px;
    background: black;
    top: 11px;
    left: -70px;
  }

  &:before {
    content: "";
    position: absolute;
    width: 5.5rem;
    height: 1px;
    background: black;
    top: 11px;
    right: -70px;
  }
`;

export const LoginContainer = styled(PageContainer)`
  #inner-card {
    &:before {
      content: "";
      width: 12rem;
      height: 36.6rem;
      background: blue;
      position: absolute;
      top: 10%;
      left: -70px;
      background: url(${manStanding});

      @media ${mobile} {
        background: none;
      }
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

export const LoginButton = styled(Button)`
  &.MuiButton-root {
    min-width: 28rem;
  }
`;
