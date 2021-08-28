import { Button } from "../../ui";

import styled from "styled-components/macro";

export const GradientButton = styled(Button)`
  background: linear-gradient(81.38deg, #1ee3cf 8.68%, #2645b1 60.76%);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
  border: 0;
  width: 28rem;
  height: 4rem;

  .MuiButton-label {
    color: white;
    font-weight: bold;
  }
`;
