import * as Yup from "yup";

export const contactSchema = Yup.object({
  contact_email: Yup.string().email("Enter a valid email.").required("Email is required."),
  relationship_label: Yup.string().max(50).required("Relationship is required."),
});