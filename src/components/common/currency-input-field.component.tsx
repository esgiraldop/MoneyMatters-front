import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { FieldInputProps, FormikProps } from "formik";
import { containerStyles, textStyles } from "../../styles";
import { formatPrice } from "../../utilities/format-price.utility";
import { ICreateBudgetForm } from "../../screens/create-budget.screen";

interface FormValues {
  amount: string; // Define the shape of your form values
}

interface CurrencyInputProps extends TextInputProps {
  field: FieldInputProps<string>;
  form: FormikProps<ICreateBudgetForm>;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  field,
  form,
  ...props
}) => {
  const handleChange = (value: string): void => {
    const sanitized = value.replace(/[^0-9.]/g, "");
    form.setFieldValue(field.name, sanitized);
  };

  return (
    <TextInput
      style={[textStyles.inputField, containerStyles.inputFieldDark]}
      value={formatPrice(field.value)}
      onChangeText={handleChange}
      keyboardType="numeric"
      {...props}
    />
  );
};
