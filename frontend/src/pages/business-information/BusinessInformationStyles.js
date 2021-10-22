import { Typography, styled } from "@mui/material";
import { PageContainer } from "../../components/styled";
import businessInformationBg from "../../libs/images/business-information-bg.svg";
import makeStyles from "@mui/styles/makeStyles";
import { mobile } from "../../libs/styles";

export const BusinessInformationContainer = styled(PageContainer)`
  background: url(${businessInformationBg});
  background-size: cover;

  @media ${mobile} {
    background: none;
  }

  #inner-card {
    width: 87.4rem;
    min-height: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${mobile} {
      width: 100%;
      min-height: auto;
      display: block;
    }
  }
`;

export const InformationHeading = styled(Typography)`
  max-width: 28rem;
  margin: 0 auto 1rem;
  text-align: center;
  font-size: 3rem;
`;

export const useStyles = makeStyles({
  root: {
    width: "35rem",
    flexGrow: 1,
    margin: "0 auto",
    background: "none",
  },
});
