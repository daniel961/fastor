import { useFormContext } from "react-hook-form";
import { Grid, Divider, Typography, styled } from "@mui/material";
import { Checkbox, ErrorText, DurationPicker } from "../../../ui";
import { mobile } from "../../../libs/styles";

const rows = [
  { engName: "sunday", hebName: "א׳" },
  { engName: "monday", hebName: "ב׳" },
  { engName: "tuesday", hebName: "ג׳" },
  { engName: "wednesday", hebName: "ד׳" },
  { engName: "thursday", hebName: "ה׳" },
  { engName: "friday", hebName: "ו׳" },
  { engName: "saturday", hebName: "ש׳" },
];

export const WorkingHours = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const values = watch();

  return (
    <ErrorText text={errors?.workDays?.message}>
      <Grid container justifyContent="center" sx={{ mt: "3rem" }}>
        <Typography variant="h2" component="h2" sx={{ mb: "2rem" }}>
          יש לסמן את הימים שבהם העסק עובד ואת שעות ההתחלה והסיום באותו היום
        </Typography>

        {rows.map(({ engName, hebName }) => {
          return (
            <div style={{ width: "100%" }} key={engName}>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                sx={{ m: "1rem" }}
              >
                <Grid item container md={2}>
                  <Checkbox name={engName} label={hebName} control={control} />
                </Grid>

                <Grid item md={3}>
                  <DurationPicker
                    control={control}
                    hoursName={`${engName}StartHour`}
                    minutesName={`${engName}StartMinute`}
                    errors={errors}
                    disabled={!values[engName]}
                  />
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  md={2}
                >
                  <ToText disabled={!values[engName]}>עד</ToText>
                </Grid>

                <Grid item md={4}>
                  <DurationPicker
                    control={control}
                    hoursName={`${engName}EndHour`}
                    minutesName={`${engName}EndMinute`}
                    errors={errors}
                    disabled={!values[engName]}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ m: "2.5rem 0" }} />
            </div>
          );
        })}
      </Grid>
    </ErrorText>
  );
};

const ToText = styled("span")`
  color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.6)" : "")};

  @media ${mobile} {
    padding: 1rem 0;
  }
`;

export default WorkingHours;
