import { useState } from "react";
import { Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { TextField, ErrorText, Button, DurationPicker } from "../../../ui";

export const Services = ({ services, setServices }) => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
    setError,
  } = useFormContext();
  const [errorText] = useState("");
  const serviceFormValues = useWatch({
    control,
    defaultValue: "default",
  });

  const handleAddService = async () => {
    const validationPassed = await trigger();
    const { serviceName, price, hourDuration, minDuration } = serviceFormValues;
    const duration = `${hourDuration}:${minDuration}`;

    if (
      duration === "00:00" ||
      hourDuration === undefined ||
      minDuration === undefined
    ) {
      setError("hourDuration", {
        type: "manual",
        message: "לא תקין",
      });

      setError("minDuration", {
        type: "manual",
        message: "לא תקין",
      });
    }

    if (validationPassed) {
      setServices([
        ...services,
        {
          serviceName,
          price,
          duration,
        },
      ]);

      setValue("serviceName", "", { shouldValidate: false });
      setValue("price", "", { shouldValidate: false });
      setValue("hourDuration", "", { shouldValidate: false });
      setValue("minDuration", "", { shouldValidate: false });
    }
  };

  const handleRemoveService = (idx) => {
    const servicesCopy = [...services];
    servicesCopy.splice(idx, 1);
    setServices(servicesCopy);
  };

  return (
    <Grid
      container
      direction="column"
      style={{ margin: "0 auto 4rem", maxWidth: "28rem" }}
    >
      <ErrorText text={errorText}>
        <Grid item style={{ marginBottom: "1.5rem" }}>
          <TextField
            label="השירות (שיעור נהיגה, תספורת וכו׳) *"
            name="serviceName"
            control={control}
            helperText={errors?.serviceName?.message}
          />
        </Grid>

        <DurationPicker
          control={control}
          hoursName="hourDuration"
          minutesName="minDuration"
          errors={errors}
        />

        <Grid item style={{ marginBottom: "2rem" }}>
          <TextField
            label="מחיר השירות (לא חובה)"
            name="price"
            control={control}
            helperText={errors?.price?.message}
          />
        </Grid>

        <Grid container style={{ marginTop: "2.5rem" }}>
          <Grid item>
            <Button onClick={handleAddService} variant="contained">
              הוספת שירות
            </Button>
          </Grid>
        </Grid>
      </ErrorText>

      <Grid item container style={{ marginTop: "3rem" }}>
        {services.length > 0 && <strong>השירותים שהוספת :</strong>}
        {services.map(({ duration, price, serviceName }, idx) => {
          return (
            <Grid item key={idx}>
              {serviceName}, {price}, {duration}
              <Button onClick={() => handleRemoveService(idx)}>מחק</Button>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Services;
