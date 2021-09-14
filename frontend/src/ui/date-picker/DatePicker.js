import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { Controller } from 'react-hook-form';

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
            animateYearScrolling
            autoOk
            disablePast={disablePast}
            className={className}
            {...rest}
            {...props}
          />
        );
      }}
    />
  );
};

export default DatePicker;
