import { Button as MuiButton, ButtonProps } from '@material-ui/core';
import { useButtonStyles } from './CardStyle';

export const Button = props => {
  const classes = useButtonStyles();

  return (
    <MuiButton
      variant={props.variant || 'outlined'}
      classes={{
        root: classes.root,
        outlined: classes.outlined,
        text: classes.text,
        contained: classes.contained,
        disabled: classes.disabled,
      }}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
};

export default Button;
