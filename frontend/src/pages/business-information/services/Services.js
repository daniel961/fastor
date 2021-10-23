import { useState, useEffect } from "react";
import { Grid, IconButton, FormLabel } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { TextField, ErrorText, Button, DurationPicker } from "../../../ui";
import DeleteIcon from "@mui/icons-material/Delete";
import http from "../../../axios";

export const Services = ({ services, setServices }) => {
  const {
    control,
    formState: { errors },
    trigger,
    reset,
    setValue,
    setError,
  } = useFormContext();
  const [errorText] = useState("");
  const [showServices, setShowServices] = useState(false);
  const serviceFormValues = useWatch({
    control,
    defaultValue: "default",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await http.get("/service");
        setServices(data[0].services);
      } catch (e) {
        console.log(e);
      }
    };

    fetchServices();
  }, [reset, setServices]);

  const handleAddService = async () => {
    const validationPassed = await trigger();
    const { serviceName, price, hourDuration, minDuration } = serviceFormValues;
    const duration = `${hourDuration}:${minDuration}`;
    const isValidDuration =
      duration !== "00:00" &&
      hourDuration !== undefined &&
      minDuration !== undefined;

    if (!isValidDuration) {
      setError("hourDuration", {
        type: "manual",
        message: "שדה חובה",
      });

      setError("minDuration", {
        type: "manual",
        message: "שדה חובה",
      });
    }

    if (validationPassed && isValidDuration) {
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
      setValue("hourDuration", "00", { shouldValidate: false });
      setValue("minDuration", "00", { shouldValidate: false });
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

        <Grid item style={{ marginBottom: "2rem" }}>
          <TextField
            label="מחיר השירות (לא חובה)"
            name="price"
            control={control}
            helperText={errors?.price?.message}
          />
        </Grid>

        <Grid item>
          <FormLabel sx={{ mb: "1rem", display: "block" }}>
            משך השירות
          </FormLabel>

          <DurationPicker
            control={control}
            hoursName="hourDuration"
            minutesName="minDuration"
            errors={errors}
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
        {services.length > 0 && (
          <Button
            variant="outlined"
            onClick={() =>
              setShowServices((prevShowServices) => !prevShowServices)
            }
          >
            {showServices
              ? `להסתרת השירותים שהוספת`
              : `להצגת השירותים שהוספת (${services.length})`}
          </Button>
        )}
      </Grid>

      {showServices &&
        services.map(({ duration, price, serviceName }, idx) => {
          return (
            <Grid container item key={idx} alignItems="center">
              <span
                style={{
                  minWidth: "23rem",
                  maxWidth: "23rem",
                }}
              >
                {serviceName}, {price && `${price}₪ ,`} {duration}
              </span>
              <IconButton onClick={() => handleRemoveService(idx)}>
                <DeleteIcon sx={{ ml: "0.2rem" }} />
              </IconButton>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Services;
