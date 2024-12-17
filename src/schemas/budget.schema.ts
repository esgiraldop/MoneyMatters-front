import * as Yup from "yup";

export const budgetSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, "Budget name must contain at least 3 characters"),
  amount: Yup.number()
    .typeError("Amount must be a valid number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string(),
});
