import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button } from "../../../ui";
import http from "../../../axios";
import {
  customerDetailsSchema,
  customerAuthenticationSchema,
} from "./customersAuthenticationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

export const CustomerAuthentication = () => {
  const [showCodeValidationField, setShowCodeValidationField] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: showCodeValidationField
      ? yupResolver(customerDetailsSchema)
      : yupResolver(customerAuthenticationSchema),
  });
  const { userId, action } = useParams();
  const history = useHistory();
  const customerPhoneValue = watch("customerPhone");
  const validationCodeValue = watch("validationCode");

  const onSubmit = async (formValues) => {
    const { customerPhone } = formValues;

    if (!showCodeValidationField) {
      try {
        const res = await http.post("/otp/send-otp", {
          phone: customerPhone,
          userId,
        });

        if (res.status === 200) {
          setShowCodeValidationField(true);
        }
      } catch (err) {}
    } else {
      try {
        const res = await http.post("/otp/validate-otp", {
          customerPhone,
          userId,
          otpCode: validationCodeValue,
        });

        if (res.status === 200) {
          if (action === "edit") {
            return history.push({
              pathname: `/appointment/edit/${userId}`,
              state: {
                customerPhone,
              },
            });
          }

          history.push({
            pathname: `/appointment/insert/${userId}`,
            state: {
              customerPhone,
            },
          });
        }
      } catch (err) {
        setError("validationCode", {
          type: "manual",
          message: "הקוד לא תואם. נסה שנית",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!showCodeValidationField && (
        <>
          <TextField
            control={control}
            name="customerPhone"
            label="מה הנייד שלך ?"
            type="tel"
            helperText={errors?.customerPhone?.message}
          />
          <Button type="submit" disabled={!customerPhoneValue}>
            שליחת קוד אימות
          </Button>
        </>
      )}

      {showCodeValidationField && (
        <>
          <TextField
            control={control}
            name="validationCode"
            label="מה הקוד שקיבלת ?"
            type="number"
            helperText={errors?.validationCode?.message}
          />

          <Button type="submit">אימות</Button>
        </>
      )}
    </form>
  );
};

export default CustomerAuthentication;
