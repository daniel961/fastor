import { styled, Button } from "@mui/material";
// const MyThemeComponent = styled('div')(({ theme }) => ({

export const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": {
    minWidth: "12.1rem",
    minHeight: "3rem",
    lineHeight: 0,
    fontSize: "1.8rem",
    "@media (max-width: 767px)": {
      minWidth: "9rem",
    },
  },
  "&.MuiButton-outlined": {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)",
    background: "#FFF",
    borderRadius: "2.8rem",
  },
  "&.MuiButton-text": {
    padding: "0",
    "& .MuiButton-label": {
      textDecoration: "underline",
    },
    "&.MuiButton-root:hover": {
      background: "none",
    },
  },
  "&.MuiButton-contained": {
    "&, &.MuiButton-contained:hover": {
      background: theme.palette.primary.main,
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)",
    },
    borderRadius: "3.1rem",
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
  "&.MuiButton-disabled": {
    "& .MuiButton-label": {
      color: "#b1b1b1",
    },
  },
}));
