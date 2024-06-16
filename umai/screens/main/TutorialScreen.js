import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TutorialScreen({ route, navigation }) {
  const { recipe } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const stepAnimations = recipe.instructions.map(
    (_, index) => useRef(new Animated.Value(index * 300)).current
  );

  function handleStartCooking() {
    Animated.timing(stepAnimations[0], {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setCurrentStep(1));
  }

  function handleNextStep(index) {
    Animated.timing(stepAnimations[index], {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      if (index + 1 < recipe.instructions.length) {
        Animated.timing(stepAnimations[index + 1], {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => setCurrentStep(index + 2));
      } else {
        setModalVisible(true);
      }
    });
  }

  async function pickImage(source) {
    let result;

    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access camera is required!");
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access gallery is required!");

        return;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setModalVisible(false);

      await handleSubmitPost(result.assets[0].uri);
    }
  }

  async function handleSubmitPost(imageUri) {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("postImg", {
        uri: imageUri,
        name: "post.jpg",
        type: "image/jpeg",
      });

      formData.append("RecipeId", recipe._id);

      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Post submitted successfully!");

        navigation.navigate("RecipeCatalog");
      } else {
        const errorData = await response.json();

        alert("Error: " + (errorData.message || "Failed to submit post"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {currentStep === 0 && (
        <Animated.View
          style={[
            styles.card,
            { transform: [{ translateX: stepAnimations[0] }] },
          ]}
        >
          <Image source={{ uri: recipe.imgUrl }} style={styles.image} />
          <Text style={styles.title}>{recipe.name}</Text>
          <TouchableOpacity style={styles.button} onPress={handleStartCooking}>
            <Text style={styles.buttonText}>Start Cooking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Donate to Creator</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {recipe.instructions.map((instruction, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            { transform: [{ translateX: stepAnimations[index] }] },
            currentStep === index + 1 ? {} : styles.hiddenCard,
          ]}
        >
          <Image source={{ uri: instruction.imgUrl }} style={styles.image} />
          <Text style={styles.instruction}>{instruction.description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNextStep(index)}
          >
            <Text style={styles.buttonText}>
              {index === recipe.instructions.length - 1
                ? "Finish Cooking"
                : "Next Step"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Would you like to share your cooking?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage("camera")}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage("gallery")}
            >
              <Text style={styles.modalButtonText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("RecipeCatalog");
              }}
            >
              <Text style={styles.modalButtonText}>Back to Recipe Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF7F50" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
  },
  hiddenCard: {
    display: "none",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instruction: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
