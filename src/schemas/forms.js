import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string().email("Enter a valid email.").required("Email is required."),
  password: Yup.string().min(8, "Password must be at least 8 characters.").required("Password is required.")
});

export const vaultSchema = Yup.object({
  category: Yup.string().oneOf(["password", "document", "instruction", "asset"]).required("Category is required."),
  title: Yup.string().max(255).required("Title is required."),
  content: Yup.string().required("Content is required."),
  is_always_visible: Yup.boolean()
});

export const contactSchema = Yup.object({
  contact_email: Yup.string().email("Enter a valid email.").required("Email is required."),
  relationship_label: Yup.string().max(50).required("Relationship is required.")
});

export const requestSchema = Yup.object({
  target_owner_id: Yup.string().uuid("Enter a valid owner UUID.").required("Owner ID is required."),
  reason: Yup.string().max(500, "Reason must be 500 characters or less.").required("Reason is required.")
});