import { useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import { Checkbox, Select, ErrorText } from '../../../ui';
import { hrs, mins } from '../../../libs/utils/hourAndMinutes';

const rows = [
  { engName: 'sunday', hebName: 'א׳' },
  { engName: 'monday', hebName: 'ב׳' },
  { engName: 'tuesday', hebName: 'ג׳' },
  { engName: 'wednesday', hebName: 'ד׳' },
  { engName: 'thursday', hebName: 'ה׳' },
  { engName: 'friday', hebName: 'ו׳' },
  { engName: 'saturday', hebName: 'ש׳' },
];

export const WorkingHours = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <ErrorText text={errors?.workDays?.message}>
      <Grid container>
        {rows.map(({ engName, hebName }) => {
          return (
            <Grid item container key={engName} justifyContent='flex-start'>
              <Grid item container xs={3}>
                <Checkbox name={engName} label={hebName} control={control} />
              </Grid>

              <Grid
                item
                container
                alignItems='center'
                justifyContent='flex-start'
                xs={9}
              >
                <Grid item container alignItems='center' xs={4}>
                  <Grid item xs={1}>
                    <Select
                      name={`${engName}StartMinute`}
                      label='דקות'
                      control={control}
                      options={mins}
                      helperText={errors[`${engName}StartMinute`]?.message}
                    />
                  </Grid>

                  <Grid item xs={1}>
                    <span>:</span>
                  </Grid>

                  <Grid item xs={1}>
                    <Select
                      name={`${engName}StartHour`}
                      label='שעות'
                      control={control}
                      options={hrs}
                      helperText={errors[`${engName}StartHour`]?.message}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={2}>
                  <span>עד</span>
                </Grid>

                <Grid item container alignItems='center' xs={4}>
                  <Grid item>
                    <Select
                      name={`${engName}EndMinute`}
                      label='דקות'
                      control={control}
                      options={mins}
                      helperText={errors[`${engName}EndMinute`]?.message}
                    />
                  </Grid>

                  <Grid item>
                    <span>:</span>
                  </Grid>

                  <Grid item>
                    <Select
                      name={`${engName}EndHour`}
                      label='שעות'
                      control={control}
                      options={hrs}
                      helperText={errors[`${engName}EndHour`]?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </ErrorText>
  );
};

export default WorkingHours;
