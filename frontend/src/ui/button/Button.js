import { StyledButton } from "./ButtonStyles";

export const Button = (props) => {
  return (
    <StyledButton variant={props.variant || "outlined"} {...props}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
