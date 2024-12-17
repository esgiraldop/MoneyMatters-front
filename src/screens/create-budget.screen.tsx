import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik, useField } from "formik";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IBudget, IUpdateBudget } from "../interfaces/budget.interface";
import { BudgetsService } from "../services/budgets.service";
import { RootStackParamList } from "../interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme/main.theme";
import { containerStyles } from "../styles/container.styles";
import { textStyles } from "../styles/text.styles";
import { buttonStyle } from "../styles/buttons.style";
import { budgetSchema } from "../schemas/budget.schema";
import { useCategories } from "../hooks/use-categories.hook";
// import { CurrencyInput } from "../components/common/currency-input-field.component"; // This thing didn't work

type CreateBudgetScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateBudget"
>;

export interface ICreateBudgetForm
  extends Pick<IBudget, "name" | "description"> {
  category_id: number;
  amount: number;
}

export function CreateBudgetScreen(): React.JSX.Element {
  const { params } = useRoute<RouteProp<RootStackParamList, "CreateBudget">>();

  const {
    categories,
    setCategories,
    errorLoadingCategories,
    setErrorLoadingCategories,
    isCategoryLoading,
    setIsCategoryLoading,
  } = useCategories();

  const navigation = useNavigation<CreateBudgetScreenProp>();

  const onSubmit = async (values: ICreateBudgetForm) => {
    console.log("params.parentBudgetId: ", params.parentBudgetId);
    console.log("values: ", values);
    await BudgetsService.create({
      budget_id: !params.parentBudgetId ? null : params.parentBudgetId, // If it is null, then the user is creating a parent budget
      ...values,
    });
    navigation.goBack();
  };

  const initialValues: ICreateBudgetForm = {
    name: "",
    amount: 0,
    category_id: -1,
    description: "",
  };

  return (
    <ScrollView
      style={[containerStyles.containerLightBc]}
      contentContainerStyle={containerStyles.HorVertCenteredContainer}
    >
      <View
        style={[
          containerStyles.containerLightBc,
          containerStyles.centeredContainerLightBc,
        ]}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={budgetSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            // This thing didn't work
            // const [field, meta] = useField("amount");

            return (
              <View style={containerStyles.centeredContainerLightBc}>
                <Text style={textStyles.textBody2}>Name</Text>
                <TextInput
                  style={[
                    textStyles.inputField,
                    containerStyles.inputFieldDark,
                  ]}
                  onChangeText={formikProps.handleChange("name")}
                  onBlur={formikProps.handleBlur("name")}
                  value={formikProps.values.name}
                  placeholder="Enter name"
                  placeholderTextColor={theme.colors.textSecondary}
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <Text style={textStyles.textError}>
                    {formikProps.errors.name}
                  </Text>
                )}

                <Text style={textStyles.textBody2}>Amount</Text>
                <TextInput
                  style={[
                    textStyles.inputField,
                    containerStyles.inputFieldDark,
                  ]}
                  onChangeText={formikProps.handleChange("amount")}
                  onBlur={formikProps.handleBlur("amount")}
                  value={String(formikProps.values.amount)}
                  placeholder="Enter amount"
                  placeholderTextColor={theme.colors.textSecondary}
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <Text style={textStyles.textError}>
                    {formikProps.errors.name}
                  </Text>
                )}
                {/* This shit didn't work */}
                {/* <CurrencyInput field={field} form={formikProps} />
                {meta.touched && meta.error && (
                  <Text style={textStyles.textError}>{meta.error}</Text>
                )} */}

                <Text style={textStyles.textBody2}>Category</Text>
                <TextInput
                  style={[
                    textStyles.inputField,
                    containerStyles.inputFieldDark,
                  ]}
                  onChangeText={formikProps.handleChange("category_id")}
                  onBlur={formikProps.handleBlur("category_id")}
                  value={String(formikProps.values.category_id)}
                  defaultValue={String(initialValues.category_id)}
                  placeholder="-- Select category --"
                  placeholderTextColor={theme.colors.textSecondary}
                />
                {formikProps.touched.amount &&
                  formikProps.errors.category_id && (
                    <Text style={textStyles.textError}>
                      {formikProps.errors.category_id}
                    </Text>
                  )}

                <Text style={textStyles.textBody2}>Description</Text>
                <TextInput
                  style={[
                    textStyles.inputField,
                    containerStyles.inputFieldDarkThicker,
                  ]}
                  onChangeText={formikProps.handleChange("description")}
                  onBlur={formikProps.handleBlur("description")}
                  value={formikProps.values.description}
                  defaultValue={initialValues.description}
                  placeholder="Describe the budget here"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="default"
                />
                {formikProps.touched.amount &&
                  formikProps.errors.description && (
                    <Text style={textStyles.textError}>
                      {formikProps.errors.description}
                    </Text>
                  )}

                <TouchableOpacity
                  style={buttonStyle.acceptButton}
                  onPress={() => formikProps.handleSubmit()}
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                >
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.textPrimary}
                    />
                  ) : (
                    <Text style={textStyles.darkButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}
