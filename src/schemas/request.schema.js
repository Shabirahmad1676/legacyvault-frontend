import * as Yup from "yup";

export const requestSchema = Yup.object({
  target_owner_id: Yup.string().uuid("Enter a valid owner UUID.").required("Owner ID is required."),
  reason: Yup.string().max(500, "Reason must be 500 characters or less.").required("Reason is required."),
});