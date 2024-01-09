import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupUsername,
  setSignupEmail,
  setSignupPassword,
  setSignupErrorMessage,
  saveUserData,
} from "../redux/authActions";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleRegister = () => {
    const { signupUsername, signupEmail, signupPassword } = authState;

    if (!signupUsername || !signupEmail || !signupPassword) {
      dispatch(setSignupErrorMessage("All fields are mandatory here."));
    } else if (!/^[a-zA-Z0-9_]+$/.test(signupUsername)) {
      dispatch(
        setSignupErrorMessage(
          "Username should be alphanumeric with underscores and no spaces."
        )
      );
    } else if (!/^\S+@\S+\.\S+$/.test(signupEmail)) {
      dispatch(setSignupErrorMessage("Invalid email address."));
    } else {
      dispatch(
        saveUserData({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        })
      );
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {renderInput("Username", (text) => dispatch(setSignupUsername(text)))}
      {renderInput("Email", (text) => dispatch(setSignupEmail(text)))}
      {renderInput("Password", (text) => dispatch(setSignupPassword(text), true))}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register here</Text>
      </TouchableOpacity>

      {authState.signupErrorMessage && (
        <Text style={styles.errorText}>{authState.signupErrorMessage}</Text>
      )}
    </View>
  );
};

const renderInput = (placeholder, onChangeText, secureTextEntry = false) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  registerButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default SignupScreen;
