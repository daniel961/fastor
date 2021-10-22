import { Grid } from "@mui/material";
import { Select } from "../select/Select";
import { mins, hrs } from "../../libs/utils/hourAndMinutes";

export const DurationPicker = ({ control, hoursName, minutesName, errors }) => {
  return (
    <Grid item container alignItems="center">
      <Grid item>
        <Select
          label="דקות"
          control={control}
          options={mins}
          defaultValue="00"
          name={minutesName}
          helperText={errors?.[`${minutesName}`]?.message}
        />
      </Grid>
      <Grid item>
        <span>:</span>
      </Grid>
      <Grid item>
        <Select
          label="שעות"
          control={control}
          options={hrs}
          defaultValue="00"
          name={hoursName}
          helperText={errors?.[`${hoursName}`]?.message}
        />
      </Grid>
    </Grid>
  );
};

export default DurationPicker;
