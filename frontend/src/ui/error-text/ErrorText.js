import { styled } from "@mui/material";

export const ErrorText = ({ text, children, className }) => {
  return (
    <div className={className}>
      {children}
      <ErrorTextStyle id="error-span">{text}</ErrorTextStyle>
    </div>
  );
};

const ErrorTextStyle = styled("span")`
  color: ${(props) => props.theme.palette.error.main};
  display: block;
  font-size: 1.5rem;
`;

export default ErrorText;
