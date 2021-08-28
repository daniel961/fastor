import {
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Controller, Control } from 'react-hook-form';
import { useStyles } from './SelectStyle';

export const Select = props => {
  const classes = useStyles();

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=''
      render={({ field }) => (
        <FormControl className={props.className}>
          {props.label && <InputLabel>{props.label}</InputLabel>}
          <MuiSelect
            classes={{ root: classes.root }}
            MenuProps={{
              className: classes.menu,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            {...field}
          >
            {props.options.map(option => {
              return (
                <MenuItem key={option.key} value={option.value}>
                  {option.label || option.value}
                </MenuItem>
              );
            })}
          </MuiSelect>
        </FormControl>
      )}
    ></Controller>
  );
};

export default Select;
