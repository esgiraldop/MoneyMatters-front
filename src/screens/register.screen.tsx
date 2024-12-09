import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/main.theme";
import { AuthService } from "../services/auth.service";
import { IUser } from "../interfaces/user.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces";
import { formStyles } from "../styles/form.styles";
import { textStyles } from "../styles/text.styles";
import { buttonStyle } from "../styles/buttons.style";
import { registrationSchema } from "../schemas/auth.schema";
import { containerStyles } from "../styles/container.styles";

type registerScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export function RegistrationScreen(): React.JSX.Element {
  const navigation = useNavigation<registerScreenProp>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.register(values);
    if (response) {
      setIsSubmitting(false);
      navigation.navigate("Login");
    } else {
      setIsSubmitting(false);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <View
      style={[
        containerStyles.container,
        formStyles.VerticallyCenteredcontainer,
      ]}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <View style={formStyles.formContainer}>
            <Text style={[textStyles.titleText, textStyles.textAlignmentLeft]}>
              Welcome to Money Matters
            </Text>

            <Text style={textStyles.label}>Name</Text>
            <TextInput
              style={textStyles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Enter name"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="default"
            />
            {errors.email && (
              <Text style={formStyles.error}>{errors.name}</Text>
            )}

            <Text style={textStyles.label}>Email</Text>
            <TextInput
              style={textStyles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter email"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={formStyles.error}>{errors.email}</Text>
            )}

            <Text style={textStyles.label}>Password</Text>
            <TextInput
              style={textStyles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={formStyles.error}>{errors.password}</Text>
            )}

            <View style={formStyles.buttonContainer}>
              <TouchableOpacity
                style={buttonStyle.button5}
                onPress={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.textPrimary}
                  />
                ) : (
                  <Text style={textStyles.buttonText}>Register</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={textStyles.phoneText}>
              Do you already have an account?{"  "}
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={textStyles.linkText}>Sign in</Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}
