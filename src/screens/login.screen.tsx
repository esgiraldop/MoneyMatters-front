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
import { formStyles } from "../styles/form.styles";
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
  // const {login} = useAuth(); // this didn´t work

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.login(values);
    console.log("response.data.accessToken: ", response?.data.token);
    if (response) {
      // await login(token); // This didn't work
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
            <Text style={textStyles.titleText}>Sign in</Text>
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
                  <Text style={textStyles.buttonText}>Sign in</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={textStyles.phoneText}>
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
