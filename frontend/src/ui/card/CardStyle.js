import { styled } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

export const CardStyle = styled("div")`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: #ffffff;
  min-height: 10rem;
  max-width: 87.4rem;
`;

export const useAccordionStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "30rem",
    background: "#FFFFFF",
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    fontFamily: theme.typography.fontFamily, // Add it becase shitty accordion not add it by himself
    "&:before": {
      background: "transparent",
    },
    "& .MuiAccordionSummary-content": {
      fontSize: "1.8rem",
      borderRadius: "8px",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "1rem 0 .5rem 0",
    },
  },
  expanded: {
    margin: "0 0 2rem!important",
  },
}));
