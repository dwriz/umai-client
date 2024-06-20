import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Button, Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (photo) {
        formData.append("profileImg", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {photo && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity
              onPress={() => setPhoto(null)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.photoButtonsContainer}>
          <TouchableOpacity>
            <Button
              icon="camera"
              mode="contained"
              textColor="#FFEDD3"
              style={[
                styles.photoButton1,
                (photo || loading) && styles.disabledButton,
              ]}
              onPress={takePhoto}
              disabled={photo !== null || loading}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              icon="upload"
              mode="contained"
              textColor="#FFEDD3"
              style={[
                styles.photoButton2,
                (photo || loading) && styles.disabledButton,
              ]}
              onPress={pickImage}
              disabled={photo !== null || loading}
            >
              <Text style={styles.buttonText}>Upload Photo</Text>
            </Button>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={"#536e2c"}
          autoCapitalize="words"
          value={fullname}
          onChangeText={setFullname}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          placeholderTextColor={"#536e2c"}
          autoCapitalize="words"
          value={username}
          onChangeText={setUsername}
          editable={!loading}
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
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            Already have an account? Log in here!
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && (
        <Modal transparent={true} animationType="none" visible={loading}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF7F50" />
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  photoButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  photoButton1: {
    flex: 1,
    height: 40,
    backgroundColor: "#c07f24",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  photoButton2: {
    flex: 1,
    height: 40,
    backgroundColor: "#c07f24",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#759a3f",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 7,
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
  buttonText: {
    color: "#FFEDD3",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    color: "#536e2c",
    fontSize: 16,
    marginTop: 5,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
