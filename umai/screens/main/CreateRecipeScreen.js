import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function CreateRecipeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientCards, setIngredientCards] = useState([
    { id: 0, value: "" },
  ]);
  const [instructions, setInstructions] = useState([]);
  const [instructionCards, setInstructionCards] = useState([
    { description: "", imgUrl: "" },
  ]);
  const [currentCard, setCurrentCard] = useState(0);

  const firstCardAnimation = useRef(new Animated.Value(0)).current;
  const secondCardAnimation = useRef(new Animated.Value(300)).current;
  const thirdCardAnimation = useRef(new Animated.Value(600)).current;
  const fourthCardAnimation = useRef(new Animated.Value(900)).current;
  const fifthCardAnimation = useRef(new Animated.Value(1200)).current;
  const scrollViewRef = useRef();
  const scrollViewRefInstructions = useRef();

  function handleFirstCardSubmit() {
    if (name.trim() === "") {
      Alert.alert("Name cannot be empty!");
      return;
    }

    Animated.timing(firstCardAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCard(1);
      Animated.timing(secondCardAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  }

  async function pickImage(source, instructionIndex = null) {
    let result;

    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission to access camera is required!");
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
        Alert.alert("Permission to access gallery is required!");
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
      if (instructionIndex === null) {
        setImgUrl(result.assets[0].uri);

        handleSecondCardSubmit(result.assets[0].uri);
      } else {
        handleInstructionChange(
          instructionIndex,
          "imgUrl",
          result.assets[0].uri
        );
      }
    }
  }

  function handleSecondCardSubmit(selectedImgUrl) {
    if ((selectedImgUrl || imgUrl).trim() === "") {
      Alert.alert("Image URL cannot be empty!");
      return;
    }

    Animated.timing(secondCardAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCard(2);

      Animated.timing(thirdCardAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  }

  function handleAddMoreIngredients() {
    setIngredientCards([
      ...ingredientCards,
      { id: ingredientCards.length, value: "" },
    ]);

    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  }

  function handleAddMoreInstructions() {
    setInstructionCards([...instructionCards, { description: "", imgUrl: "" }]);

    setTimeout(() => {
      scrollViewRefInstructions.current.scrollToEnd({ animated: true });
    }, 100);
  }

  function handleIngredientChange(id, value) {
    setIngredientCards(
      ingredientCards.map((card) =>
        card.id === id ? { ...card, value } : card
      )
    );
  }

  function handleInstructionChange(index, key, value) {
    setInstructionCards(
      instructionCards.map((card, i) =>
        i === index ? { ...card, [key]: value } : card
      )
    );
  }

  function handleRemoveIngredient(id) {
    setIngredientCards(ingredientCards.filter((card) => card.id !== id));
  }

  function handleRemoveInstruction(index) {
    setInstructionCards(instructionCards.filter((_, i) => i !== index));
  }

  function handleIngredientsSubmit() {
    const hasEmptyIngredient = ingredientCards.some(
      (card) => card.value.trim() === ""
    );

    if (hasEmptyIngredient) {
      Alert.alert("No empty ingredient allowed!");
      return;
    }

    setIngredients(ingredientCards.map((card) => card.value));

    Animated.timing(thirdCardAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCard(3);

      Animated.timing(fourthCardAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  }

  function handleInstructionsSubmit() {
    const hasEmptyInstruction = instructionCards.some(
      (card) => card.description.trim() === "" || card.imgUrl.trim() === ""
    );

    if (hasEmptyInstruction) {
      Alert.alert("No empty instruction fields allowed!");
      return;
    }

    setInstructions(instructionCards);

    Animated.timing(fourthCardAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCard(4);

      Animated.timing(fifthCardAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  }

  async function handleSubmitRecipe() {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("instructions", JSON.stringify(instructions));

      const imageFile = {
        uri: imgUrl,
        name: "photo.jpg",
        type: "image/jpeg",
      };

      formData.append("image", imageFile);

      instructionCards.forEach((instruction, index) => {
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
          { text: "OK", onPress: () => navigation.navigate("RecipeCatalog") },
        ]);
      } else {
        const errorData = await response.json();

        Alert.alert("Error", errorData.message || "Failed to submit recipe");
      }
    } catch (error) {
      console.error(error.message);

      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      {currentCard === 0 && (
        <Animated.View
          style={[
            styles.card,
            styles.nameCard,
            { transform: [{ translateX: firstCardAnimation }] },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleFirstCardSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {currentCard === 1 && (
        <Animated.View
          style={[
            styles.card,
            styles.imgUrlCard,
            { transform: [{ translateX: secondCardAnimation }] },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage("camera")}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage("gallery")}
          >
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {currentCard === 2 && (
        <Animated.View
          style={[
            styles.card,
            styles.ingredientsCard,
            { transform: [{ translateX: thirdCardAnimation }] },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            ref={scrollViewRef}
          >
            {ingredientCards.map((card, index) => (
              <View key={card.id} style={styles.ingredientCard}>
                <TextInput
                  style={styles.ingredientInput}
                  placeholder={`Enter ingredient ${index + 1}`}
                  value={card.value}
                  onChangeText={(value) =>
                    handleIngredientChange(card.id, value)
                  }
                />
                {index > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveIngredient(card.id)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMoreIngredients}
            >
              <Text style={styles.buttonText}>Add More Ingredients</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleIngredientsSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {currentCard === 3 && (
        <Animated.View
          style={[
            styles.card,
            styles.instructionsCard,
            { transform: [{ translateX: fourthCardAnimation }] },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            ref={scrollViewRefInstructions}
          >
            {instructionCards.map((card, index) => (
              <View key={index} style={styles.instructionCard}>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter description for step ${index + 1}`}
                  value={card.description}
                  onChangeText={(value) =>
                    handleInstructionChange(index, "description", value)
                  }
                />
                <View style={styles.imgButtonsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => pickImage("camera", index)}
                  >
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => pickImage("gallery", index)}
                  >
                    <Text style={styles.buttonText}>Upload Photo</Text>
                  </TouchableOpacity>
                </View>
                {index > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveInstruction(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMoreInstructions}
            >
              <Text style={styles.buttonText}>Add More Instructions</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={handleInstructionsSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {currentCard === 4 && (
        <Animated.View
          style={[
            styles.card,
            styles.submitCard,
            { transform: [{ translateX: fifthCardAnimation }] },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={handleSubmitRecipe}>
            <Text style={styles.buttonText}>Submit Recipe</Text>
          </TouchableOpacity>
        </Animated.View>
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
    padding: 20,
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
  nameCard: {
    height: "auto",
  },
  imgUrlCard: {
    height: "auto",
  },
  ingredientsCard: {
    height: "50%",
  },
  instructionsCard: {
    height: "50%",
  },
  submitCard: {
    height: "auto",
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
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
  ingredientInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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
  addButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  ingredientCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionCard: {
    width: "100%",
    marginBottom: 10,
  },
  imgButtonsContainer: {
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
});
