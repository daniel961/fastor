import { styled } from "@mui/material";
import loginBackground from "../../../libs/images/login_background.svg";
import { mobile } from "../../../libs/styles";

export const PageContainer = styled("div")`
  background: url(${loginBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: calc(100vh - 8rem);
  padding-top: 7rem;
  padding-bottom: 5rem;

  @media ${mobile} {
    background: none;
  }

  #inner-card {
    padding: 4rem 4.6rem;
    margin: 0 auto;
    width: 38.2rem;
    position: relative;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;

    @media ${mobile} {
      padding: 0rem 1.8rem;
      margin-bottom: 4rem;
      box-shadow: none;
    }
  }
`;
