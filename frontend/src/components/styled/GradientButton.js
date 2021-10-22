import { Button } from "../../ui";
import { styled } from "@mui/material";

export const GradientButton = styled(Button)({
  "&.MuiButton-root": {
    background: "linear-gradient(81.38deg, #1EE3CF 0, #2645B1 81.76%)",
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)",
    border: "0",
    width: "28rem",
    height: "4rem",
    color: "white",
    fontWeight: "bold",
  },
});
