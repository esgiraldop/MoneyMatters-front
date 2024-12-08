import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),
});
