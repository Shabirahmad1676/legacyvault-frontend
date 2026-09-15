import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username cannot exceed 30 characters.")
    .required("Username is required."),
  email: Yup.string().email("Enter a valid email.").required("Email is required."),
  password: Yup.string().min(8, "Password must be at least 8 characters.").required("Password is required."),
});