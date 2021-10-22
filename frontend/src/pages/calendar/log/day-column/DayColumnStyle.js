import { styled } from "@mui/material";
import { Card } from "../../../../ui";

export const AppointmentCard = styled(Card)`
  margin-bottom: 2rem;
  max-width: ${(props) => props.viewMode === "column" && "100%"};
`;
