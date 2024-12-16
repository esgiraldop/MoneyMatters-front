import * as Yup from "yup";

export const budgetSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, "Budget name must contain at least 3 characters"),
  amount: Yup.string().required("Amount is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string(),
});
