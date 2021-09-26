import { TextField as MuiTextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTextFieldStyles } from './TextFieldStyle';

export const TextField = ({
  name,
  label,
  control,
  type,
  disabled,
  helperText,
  defaultValue = '',
  error,
  className,
}) => {
  const classes = useTextFieldStyles();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <MuiTextField
          {...field}
          type={type}
          label={label}
          disabled={disabled}
          classes={{ root: classes.root }}
          className={className}
          helperText={helperText}
          error={!!helperText}
        />
      )}
    />
  );
};

export default TextField;
