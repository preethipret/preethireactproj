import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setErrorMessage,
} from "../redux/authActions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    
  }, []);

  const handleLogin = () => {
    const { username, password } = authState;

    if (username === "preethi" && password === "Preethi@45") {
      console.log("Authenticated User!");
      navigation.navigate("Dashboard");
    } else {
      dispatch(setErrorMessage("Invalid credentials. Please try again."));
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {renderInput("Username", (text) => dispatch(setUsername(text)))}
        {renderInput("Password", (text) => dispatch(setPassword(text), true))}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {authState.errorMessage && (
          <Text style={styles.errorText}>{authState.errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    backgroundColor: "#ecf0f1",
  },
  loginButton: {
    backgroundColor: "#3498db",
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
  signupButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LoginScreen;
