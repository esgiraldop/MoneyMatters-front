import * as Yup from "yup";

export const transactionSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, "Transaction name must contain at least 3 characters"),
  amount: Yup.string().required("Amount is required"),
  budgetName: Yup.string().required("Budget is required"),
  description: Yup.string(),
});
