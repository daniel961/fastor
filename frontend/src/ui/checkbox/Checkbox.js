import { Controller, Control } from 'react-hook-form';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ReactComponent as CheckboxCircle } from './icons/checkbox_circle.svg';
import { ReactComponent as CheckboxChecked } from './icons/checkbox_checked.svg';

export const Checkbox = ({
  name,
  label,
  control,
  defaultChecked = false,
  labelPlacement,
  disabled,
  className,
}) => {
  const classes = useCheckboxStyles();

  return (
    <FormControlLabel
      label={label}
      disabled={disabled}
      labelPlacement={labelPlacement}
      classes={{ disabled: classes.disabled }}
      className={className}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultChecked}
          render={({ field }) => (
            <MuiCheckbox
              icon={<CheckboxCircle />}
              checkedIcon={<CheckboxChecked />}
              {...field}
              checked={field['value'] ?? false}
              disabled={disabled}
            />
          )}
        />
      }
    />
  );
};

const useCheckboxStyles = makeStyles(theme => ({
  disabled: {
    '& svg': {
      fill: '#e2e2e2',
    },
  },
}));

export default Checkbox;
