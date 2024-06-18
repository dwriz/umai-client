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
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

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

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user_id");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
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
    <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <View style={styles.umaiHeaderContainer}>
              <Image
                style={styles.umaiImage}
                source={require("../../assets/umai_text.png")}
              ></Image>
            </View>
            <View style={styles.logoutContainer}>
              <Button
                icon="logout"
                mode="contained"
                buttonColor="#c07f24"
                textColor="#FFEDD3"
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </Button>
            </View>
          </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.sectionTitle}>Recipe Name</Text>
          <TextInput
            style={styles.input1}
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
            <TouchableOpacity>
              <Button
                icon="upload"
                mode="contained"
                textColor="#FFEDD3"
                style={[styles.imageButton1, imgUrl && styles.disabledButton]}
                onPress={() => pickImage(setImgUrl)}
                disabled={!!imgUrl}
              >
                <Text style={styles.buttonText}>Upload</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                icon="camera"
                mode="contained"
                textColor="#FFEDD3"
                style={[styles.imageButton2, imgUrl && styles.disabledButton]}
                onPress={() => takePhoto(setImgUrl)}
                disabled={!!imgUrl}
              >
                <Text style={styles.buttonText}>Photo</Text>
              </Button>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.row}>
              <TextInput
                style={styles.input2}
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
                style={styles.input3}
                placeholder={`Instruction ${index + 1}`}
                value={instruction.description}
                onChangeText={(text) => {
                  const newInstructions = [...instructions];
                  newInstructions[index].description = text;
                  setInstructions(newInstructions);
                }}
              />
              <View style={styles.buttonRow}>
              <TouchableOpacity>
        <Button
          icon="upload"
          mode="contained"
          textColor="#FFEDD3"
          style={[styles.imageButton3, instruction.imgUrl && styles.disabledButton]}
          onPress={() =>
            pickImage((uri) => {
              const newInstructions = [...instructions];
              newInstructions[index].imgUrl = uri;
              setInstructions(newInstructions);
            })
          }
          disabled={!!instruction.imgUrl}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          icon="camera"
          mode="contained"
          textColor="#FFEDD3"
          style={[styles.imageButton4, instruction.imgUrl && styles.disabledButton]}
          onPress={() =>
            pickImage((uri) => {
              const newInstructions = [...instructions];
              newInstructions[index].imgUrl = uri;
              setInstructions(newInstructions);
            })
          }
          disabled={!!instruction.imgUrl}
        >
          <Text style={styles.buttonText}>Photo</Text>
        </Button>
      </TouchableOpacity>
              </View>
              {index > 0 && (
                <TouchableOpacity
                  onPress={() => handleRemoveInstruction(index)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddInstruction}
          >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  input1: {
    width: 320,
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#759a3f",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  input2: {
    width: 320,
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#759a3f",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
    padding: 10,
  },
  input3: {
    width: 320,
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#759a3f",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },

  button: {
    width: 320,
    height: 40,
    backgroundColor: "#c07f24",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  submitButton: {
    width: 320,
    height: 40,
    backgroundColor: "#536E2C",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageButton1: {
    width: 150,
    backgroundColor: "#c07f24",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  imageButton2: {
    width: 150,
    backgroundColor: "#c07f24",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  imageButton3: {
    width: 150,
    backgroundColor: "#c07f24",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  imageButton4: {
    width: 150,
    backgroundColor: "#c07f24",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#536E2C",
    marginBottom: 10,
    marginTop: 10,
  },
  instructionCard: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f3e9a9",
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
  headerContainer: {
    flex: 1/10,
    marginTop: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#D4D768",
    borderColor: "#B7D88C",
  },
  umaiHeaderContainer: {
    flex: 1,
  },
  umaiImage: {
    width: 120,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFEDD3",
    fontSize: 16,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
});
