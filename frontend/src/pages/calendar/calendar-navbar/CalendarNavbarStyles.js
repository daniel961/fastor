import { Grid, IconButton, styled } from "@mui/material";
import { Button } from "../../../ui";
import { mobile } from "../../../libs/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const CalendarNavbarContainer = styled(Grid)`
  height: 8rem;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 3%);
  padding: 0 10rem;

  @media ${mobile} {
    padding: 0 2rem;
  }
`;

export const MenuItem = styled(Grid)`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MenuButton = styled(Button)`
  height: 100%;
  margin: 0 1.5rem;
  font-size: 1.8rem;

  .MuiButton-label {
    text-decoration: none;
    color: black;
  }
`;

export const IconsContainer = styled(Grid)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  height: 100%;
`;

export const IconButtonStyle = styled(IconButton)`
  width: 4rem;
  height: 4rem;
  margin: 0 1rem;
`;

export const VertIcon = styled(MoreVertIcon)`
  fill: black;
  width: 4rem;
  height: 4rem;
`;
