import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, id } = data;
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("user_id", id);
        Alert.alert("Success", "Login successful!", [{ text: "OK" }]);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
        source={require('../../assets/umai_pan.png')}
        style={styles.umaiLogo}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#536e2c"}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#536e2c"}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={() => navigation.navigate("Register")}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>Don't have account? Sign up here</Text>
        </TouchableOpacity>
        {loading && (
          <Modal transparent={true} animationType="none" visible={loading}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF7F50" />
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5B1",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#536e2c"
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#759a3f",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#c07f24",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#FFEDD3",
    fontSize: 16,
    fontWeight: "bold"
  },
  registerButton: {
    marginTop: 40,
  },
  registerButtonText: {
    color: "#536e2c",
    fontSize: 16,
    textDecorationLine: "underline"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  umaiLogo: {
    height: 200,
    width: 200
  }
});
