import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { theme } from "../theme/main.theme";
import { AuthService } from "../services/auth.service";
import { IUser } from "../interfaces/user.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces";
import { textStyles } from "../styles/text.styles";
import { buttonStyle } from "../styles/buttons.style";
import { registrationSchema } from "../schemas/auth.schema";
import { containerStyles } from "../styles/container.styles";
// import {useAuth} from '../contexts/auth.context';
import { setValueAsyncStorage } from "../utilities/set-variable-async-storage.utility";

type LoginScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface LoginScreenProps {
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
}

function LoginScreen({
  setIsAuthenticated,
}: LoginScreenProps): React.JSX.Element {
  const navigation = useNavigation<LoginScreenProp>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.login(values);
    if (response) {
      await setValueAsyncStorage("token", response.data.token);
      setIsSubmitting(false);
      if (setIsAuthenticated) setIsAuthenticated(true);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Transactions" }],
        })
      );
    } else {
      setIsSubmitting(false);
      if (setIsAuthenticated) setIsAuthenticated(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <View
      style={[containerStyles.container, containerStyles.centeredContainer]}
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
          <View style={containerStyles.centeredContainer}>
            <Text
              style={[
                textStyles.textH1,
                textStyles.textAlignCenter,
                containerStyles.marginLarge,
              ]}
            >
              Sign in
            </Text>
            <Text style={textStyles.textBody1}>Email</Text>
            <TextInput
              style={[textStyles.inputField, containerStyles.inputField]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter email"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={textStyles.textError}>{errors.email}</Text>
            )}

            <Text style={textStyles.textBody1}>Password</Text>
            <TextInput
              style={[textStyles.inputField, containerStyles.inputField]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={textStyles.textError}>{errors.password}</Text>
            )}

            <View style={containerStyles.rowContainer}>
              <TouchableOpacity
                style={buttonStyle.buttonPrimary}
                onPress={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.textPrimary}
                  />
                ) : (
                  <Text style={textStyles.buttonText}>Sign in</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={textStyles.textBody1}>
              Don't you have an account?{"  "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={textStyles.linkText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default React.memo(LoginScreen);
