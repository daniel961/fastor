import { useEffect, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Grid, Divider, Typography, styled } from "@mui/material";
import { Checkbox, ErrorText, DurationPicker } from "../../../ui";
import { mobile } from "../../../libs/styles";
import { LoaderContext } from "../../../context/loader/LoaderState";
import http from "../../../axios";

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
    setValue,
    formState: { errors },
  } = useFormContext();
  const values = watch();
  const { handleSetLoading } = useContext(LoaderContext);

  useEffect(() => {
    handleSetLoading({ isLoading: true });

    const fetchWorkingHours = async () => {
      try {
        const { data } = await http.get("/business/get-work-times");
        if (data) {
          const activityTimes = data[0].activityTimes;
          activityTimes.forEach(({ days, workingHours }) => {
            const day = days[0];
            const startTime = workingHours.from.split(":");
            const toTime = workingHours.to.split(":");
            const startHour = startTime[0];
            const startMinute = startTime[1];
            const endHour = toTime[0];
            const endMinute = toTime[1];

            setValue(day, true);
            setValue(`${day}StartHour`, startHour);
            setValue(`${day}StartMinute`, startMinute);
            setValue(`${day}EndHour`, endHour);
            setValue(`${day}EndMinute`, endMinute);
          });
        }

        handleSetLoading({ isLoading: false, delay: 2000 });
      } catch (e) {
        console.log(e);
      }
    };

    fetchWorkingHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
