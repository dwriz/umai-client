import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function CreateRecipeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([
    { description: "", imgUrl: "" },
  ]);
  const [loading, setLoading] = useState(false);

  async function pickImage(setImage) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function takePhoto(setImage) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function handleSubmitRecipe() {
    if (
      !name ||
      !imgUrl ||
      ingredients.some((ingredient) => !ingredient) ||
      instructions.some(
        (instruction) => !instruction.description || !instruction.imgUrl
      )
    ) {
      Alert.alert("Error", "Please fill out all fields");

      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", JSON.stringify(instructions));
      formData.append("image", {
        uri: imgUrl,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      instructions.forEach((instruction, index) => {
        if (instruction.imgUrl) {
          const instructionImageFile = {
            uri: instruction.imgUrl,
            name: `instruction_photo_${index + 1}.jpg`,
            type: "image/jpeg",
          };

          formData.append(`instruction_images`, instructionImageFile);
        }
      });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Recipe submitted successfully!", [
          {
            text: "OK",
            onPress: () => {
              setName("");
              setImgUrl("");
              setIngredients([""]);
              setInstructions([{ description: "", imgUrl: "" }]);
              navigation.navigate("RecipeCatalog");
            },
          },
        ]);
      } else {
        const errorData = await response.json();

        Alert.alert("Error", errorData.message || "Failed to submit recipe");
      }
    } catch (error) {
      console.error(error.message);

      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAddIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function handleRemoveIngredient(index) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function handleAddInstruction() {
    setInstructions([...instructions, { description: "", imgUrl: "" }]);
  }

  function handleRemoveInstruction(index) {
    setInstructions(instructions.filter((_, i) => i !== index));
  }

  function handleRemoveImage(setImage) {
    setImage("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        {imgUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imgUrl }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => handleRemoveImage(setImgUrl)}
            >
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.imageButton, imgUrl && styles.disabledButton]}
            onPress={() => pickImage(setImgUrl)}
            disabled={!!imgUrl}
          >
            <Text style={styles.buttonText}>Upload Recipe Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageButton, imgUrl && styles.disabledButton]}
            onPress={() => takePhoto(setImgUrl)}
            disabled={!!imgUrl}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChangeText={(text) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = text;
                setIngredients(newIngredients);
              }}
            />
            {index > 0 && (
              <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleAddIngredient}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Instructions</Text>
        {instructions.map((instruction, index) => (
          <View key={index} style={styles.instructionCard}>
            {instruction.imgUrl ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: instruction.imgUrl }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => {
                    const newInstructions = [...instructions];
                    newInstructions[index].imgUrl = "";
                    setInstructions(newInstructions);
                  }}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder={`Instruction ${index + 1}`}
              value={instruction.description}
              onChangeText={(text) => {
                const newInstructions = [...instructions];
                newInstructions[index].description = text;
                setInstructions(newInstructions);
              }}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.imageButton,
                  instruction.imgUrl && styles.disabledButton,
                ]}
                onPress={() =>
                  pickImage((uri) => {
                    const newInstructions = [...instructions];
                    newInstructions[index].imgUrl = uri;
                    setInstructions(newInstructions);
                  })
                }
                disabled={!!instruction.imgUrl}
              >
                <Text style={styles.buttonText}>Upload Instruction Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.imageButton,
                  instruction.imgUrl && styles.disabledButton,
                ]}
                onPress={() =>
                  takePhoto((uri) => {
                    const newInstructions = [...instructions];
                    newInstructions[index].imgUrl = uri;
                    setInstructions(newInstructions);
                  })
                }
                disabled={!!instruction.imgUrl}
              >
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            {index > 0 && (
              <TouchableOpacity onPress={() => handleRemoveInstruction(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleAddInstruction}>
          <Text style={styles.buttonText}>Add Instruction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitRecipe}
        >
          <Text style={styles.buttonText}>Submit Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF7F50" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageButton: {
    width: "48%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionCard: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
