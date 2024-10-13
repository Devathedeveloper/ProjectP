// app/screens/login-screen.tsx

import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native"
import { Text, Button, TextField } from "../components"
import { AppStackParamList } from "../navigators"
import { useNavigation } from "@react-navigation/native"
import { spacing, colors } from "../theme"
import Icon from "react-native-vector-icons/Feather"

 const LoginScreen: React.FC<any> = observer(
  function LoginScreen() {
    const navigation = useNavigation()

    // State variables
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    // Functions
    const handleLogin = () => {
      // Implement authentication logic here
      alert("Login button pressed")
    }

    const togglePasswordVisibility = () => {
      setSecureTextEntry(!secureTextEntry)
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          {/* Replace with your logo image */}
          <Image source={require("assets/images/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <TextField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            LeftAccessory={() => <Icon name="mail" size={20} color="#888" style={styles.icon} />}
            inputWrapperStyle={styles.inputContainer}
            style={styles.inputText}
            
          />

          <TextField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            LeftAccessory={() => <Icon name="lock" size={20} color="#888" style={styles.icon} />}
            RightAccessory={() => (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#888" style={styles.eyeIcon} />
              </TouchableOpacity>
            )}
            inputWrapperStyle={styles.inputContainer}
            style={styles.inputText}
          />

          <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            text="Login"
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            onPress={handleLogin}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.signUpLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    
  },
  inputText: {
    fontSize: 16,
    color: colors.text,
  },
  forgotPasswordText: {
    color: colors.palette.accent100,
    textAlign: "right",
    marginBottom: spacing.xl,
    marginTop: -spacing.sm,
  },
  loginButton: {
    backgroundColor: colors.palette.accent100,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: colors.textDim,
    fontSize: 16,
  },
  signUpLink: {
    color: colors.palette.accent100,
    fontWeight: "bold",
    fontSize: 16,
  },
  eyeIcon: {
    marginRight: spacing.sm,
  },
  icon:{
    marginLeft: spacing.xs,
  }
})

export default LoginScreen