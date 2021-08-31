import {
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { useStyles } from './SelectStyle';

export const Select = props => {
  const classes = useStyles();

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=''
      render={({ field }) => (
        <FormControl className={props.className} error={!!props.helperText}>
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
          <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
};

export default Select;
