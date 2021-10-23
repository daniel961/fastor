import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { ErrorText, TextField } from "../../../ui";
import http from "../../../axios";

export const GeneralInformation = () => {
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext();
  const [errorText] = useState("");

  useEffect(() => {
    const fetchGeneralInformation = async () => {
      try {
        const { data } = await http.post("/business/information");

        reset({
          phone: data.businessInformation.phone,
          address: data.businessInformation.address,
          name: data.businessInformation.name,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchGeneralInformation();
  }, [reset]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ margin: "0 auto 4rem", maxWidth: "28rem" }}
    >
      <ErrorText text={errorText}>
        <Grid item>
          <TextField
            label="שם העסק *"
            control={control}
            name="name"
            helperText={errors?.name?.message}
          />
        </Grid>

        <Grid item>
          <TextField
            label="הטלפון של העסק *"
            control={control}
            name="phone"
            helperText={errors?.phone?.message}
          />
        </Grid>

        <Grid item>
          <TextField
            label="הכתובת של העסק *"
            control={control}
            name="address"
            helperText={errors?.address?.message}
          />
        </Grid>
      </ErrorText>
    </Grid>
  );
};

export default GeneralInformation;
