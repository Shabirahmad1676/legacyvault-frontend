import * as Yup from "yup";

export const vaultSchema = Yup.object({
  category: Yup.string().oneOf(["password", "document", "instruction", "asset"]).required("Category is required."),
  title: Yup.string().max(255).required("Title is required."),
  content: Yup.string().required("Content is required."),
  is_always_visible: Yup.boolean(),
});