import { DatePicker as MuiDatePicker } from '@mui/lab';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const DatePicker = ({
  name,
  label = '',
  control,
  defaultValue = new Date(),
  helperText,
  variant = 'inline',
  className,
  disablePast,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, ...rest } }) => {
        return (
          <MuiDatePicker
            variant={variant}
            label={label}
            helperText={helperText}
            error={!!helperText}
            animateYearScrolling
            autoOk
            disablePast={disablePast}
            className={className}
            renderInput={props => <TextField {...props} />}
            {...rest}
            {...props}
          />
        );
      }}
    />
  );
};

export default DatePicker;
