import { styled } from "@mui/material";
import { Select } from "../select/Select";
import { mins, hrs } from "../../libs/utils/hourAndMinutes";

export const DurationPicker = ({
  control,
  hoursName,
  minutesName,
  errors,
  disabled,
}) => {
  return (
    <DurationPickerContainer>
      <StyledSelect
        variant="standard"
        label="דקות *"
        control={control}
        options={mins}
        defaultValue="00"
        name={minutesName}
        helperText={errors?.[`${minutesName}`]?.message}
        disabled={disabled}
      />
      <span
        style={{ padding: "1rem", color: disabled ? "rgba(0, 0, 0, 0.6)" : "" }}
      >
        :
      </span>
      <StyledSelect
        variant="standard"
        label="שעות *"
        control={control}
        options={hrs}
        defaultValue="00"
        name={hoursName}
        helperText={errors?.[`${hoursName}`]?.message}
        disabled={disabled}
      />
    </DurationPickerContainer>
  );
};

const DurationPickerContainer = styled("div")`
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  &.MuiSelect-root {
    min-width: 9rem;
  }
`;

export default DurationPicker;
