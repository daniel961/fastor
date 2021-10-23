import {
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useStyles } from "./SelectStyle";

export const Select = (props) => {
  const classes = useStyles();

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue || ""}
      render={({ field }) => {
        return (
          <FormControl className={props.className} error={!!props.helperText}>
            {props.label && <InputLabel>{props.label}</InputLabel>}
            <MuiSelect
              classes={{ root: classes.root }}
              MenuProps={{
                className: classes.menu,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              {...field}
              onChange={props.onChange || field.onChange}
              disabled={props.disabled}
              {...props}
            >
              {props.options.map((option) => {
                return (
                  <MenuItem
                    key={option[props.optionKey] || option.key}
                    value={option[props.optionValue] || option.value}
                  >
                    {option[props.optionValue] || option.label || option.value}
                  </MenuItem>
                );
              })}
            </MuiSelect>
            <FormHelperText>{props.helperText}</FormHelperText>
          </FormControl>
        );
      }}
    ></Controller>
  );
};

export default Select;
