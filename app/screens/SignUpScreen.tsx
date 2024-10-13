// app/screens/signup-screen.tsx

import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Text, Button, TextField } from "../components"
import { useNavigation } from "@react-navigation/native"
import { spacing, colors } from "../theme"
import Icon from "react-native-vector-icons/Feather"
// import { useStores } from "../models"

export const SignUpScreen: React.FC<any> = observer(
  function SignupScreen() {
    const navigation = useNavigation()
    // const { userStore } = useStores()

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [termsAccepted, setTermsAccepted] = useState(false)

    const togglePasswordVisibility = () => {
      setSecureTextEntry(!secureTextEntry)
    }

    const toggleConfirmPasswordVisibility = () => {
      setConfirmSecureTextEntry(!confirmSecureTextEntry)
    }

    const handleSubmit = () => {
      console.log("Submit")
    }
    const handleChange = (field: string) => (text: string) => {
      setFieldValue(field, text)
    }
    const setFieldValue = (field: string, text: string) => {
      switch (field) {
        case "fullName":
          setFullName(text)
          break
        case "email":
          setEmail(text)
          break
        case "password":
          setPassword(text)
          break
        case "confirmPassword":
          setConfirmPassword(text)
          break
        case "termsAccepted":
          setTermsAccepted(text === 'true')
          break
        default:
          break
      }
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text preset="heading" text="Create Account" style={styles.headerText} />
          </View>

          <View style={styles.formContainer}>
            <TextField
              placeholder="Full Name"
              value={fullName}
              onChangeText={handleChange("fullName")}
              //   onBlur={handleBlur("fullName")}
              //   error={ ""}
              LeftAccessory={() => <Icon name="user" size={20} color="#888" />}
              inputWrapperStyle={styles.inputContainer}
              style={styles.inputText}
            />

            <TextField
              placeholder="Email"
              value={email}
              onChangeText={handleChange("email")}
              //   onBlur={handleBlur("email")}
              //   error={""}
              keyboardType="email-address"
              autoCapitalize="none"
              LeftAccessory={() => <Icon name="mail" size={20} color="#888" />}
              inputWrapperStyle={styles.inputContainer}
              style={styles.inputText}
            />

            <TextField
              placeholder="Password"
              value={password}
              onChangeText={handleChange("password")}
              //   onBlur={handleBlur("password")}
              //   error={""}
              secureTextEntry={secureTextEntry}
              LeftAccessory={() => <Icon name="lock" size={20} color="#888" />}
              RightAccessory={() => (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
              )}
              inputWrapperStyle={styles.inputContainer}
              style={styles.inputText}
            />

            <TextField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              //   onBlur={handleBlur("confirmPassword")}
              //   error={""}
              secureTextEntry={confirmSecureTextEntry}
              LeftAccessory={() => <Icon name="lock" size={20} color="#888" />}
              RightAccessory={() => (
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <Icon name={confirmSecureTextEntry ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
              )}
              inputWrapperStyle={styles.inputContainer}
              style={styles.inputText}
            />

            <View style={styles.termsContainer}>
              {/* <Checkbox
                value={termsAccepted}
                onToggle={(value) => setFieldValue("termsAccepted", value)}
              /> */}
              <TouchableOpacity onPress={() => setFieldValue("termsAccepted", !termsAccepted)}>
                <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
              </TouchableOpacity>
            </View>

            <Button
              text="Sign Up"
              style={styles.signupButton}
              textStyle={styles.signupButtonText}
              onPress={handleSubmit}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.loginLink}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: spacing.large,
    paddingTop: spacing.huge,
    paddingBottom: spacing.large,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.huge,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.small,
    borderRadius: 5,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
  },
  inputText: {
    fontSize: 16,
    color: colors.text,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.medium,
  },
  termsText: {
    marginLeft: spacing.small,
    color: colors.text,
    textDecorationLine: "underline",
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.small,
  },
  signupButton: {
    backgroundColor: colors.palette.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginBottom: spacing.large,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: colors.textDim,
    fontSize: 16,
  },
  loginLink: {
    color: colors.palette.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
})
