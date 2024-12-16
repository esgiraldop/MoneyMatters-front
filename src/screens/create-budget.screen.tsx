import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { IUpdateBudget } from "../interfaces/budget.interface";
import { BudgetsService } from "../services/budgets.service";
import { RootStackParamList } from "../interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme/main.theme";
import { containerStyles } from "../styles/container.styles";
import { textStyles } from "../styles/text.styles";
import { buttonStyle } from "../styles/buttons.style";
import { budgetSchema } from "../schemas/budget.schema";

type CreateBudgetScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateBudget"
>;

export function CreateBudgetScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateBudgetScreenProp>();

  const onSubmit = async (values: IUpdateBudget) => {
    await BudgetsService.create(values);
    navigation.goBack();
  };

  const initialValues = {
    name: "",
    amount: -1,
    category: "",
    description: "",
  };

  return (
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
        {({
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <View style={containerStyles.centeredContainerLightBc}>
            <Text style={textStyles.textBody2}>Name</Text>
            <TextInput
              style={[textStyles.inputField, containerStyles.inputFieldDark]}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Enter name"
              placeholderTextColor={theme.colors.textSecondary}
            />
            {errors.name && (
              <Text style={textStyles.textError}>{errors.name}</Text>
            )}

            <Text style={textStyles.textBody2}>Amount</Text>
            <TextInput
              style={[textStyles.inputField, containerStyles.inputFieldDark]}
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
              defaultValue={initialValues.amount}
              placeholder="Enter price amount"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numbers-and-punctuation"
            />
            {errors.amount && (
              <Text style={textStyles.textError}>{errors.amount}</Text>
            )}

            <Text style={textStyles.textBody2}>Category</Text>
            <TextInput
              style={[textStyles.inputField, containerStyles.inputFieldDark]}
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
              defaultValue={initialValues.category}
              placeholder="-- Select category --"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
            />
            {errors.category && (
              <Text style={textStyles.textError}>{errors.category}</Text>
            )}

            <Text style={textStyles.textBody2}>Description</Text>
            <TextInput
              style={[
                textStyles.inputField,
                containerStyles.inputFieldDarkThicker,
              ]}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              defaultValue={initialValues.description}
              placeholder="Describe the budget here"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="default"
            />
            {errors.category && (
              <Text style={textStyles.textError}>{errors.category}</Text>
            )}

            <TouchableOpacity
              style={buttonStyle.acceptButton}
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.textPrimary}
                />
              ) : (
                <Text style={textStyles.darkButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
