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

  const handleFirstCardSubmit = () => {
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
  };

  const handleSecondCardSubmit = () => {
    if (imgUrl.trim() === "") {
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
  };

  const handleAddMoreIngredients = () => {
    setIngredientCards([
      ...ingredientCards,
      { id: ingredientCards.length, value: "" },
    ]);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddMoreInstructions = () => {
    setInstructionCards([
      ...instructionCards,
      { description: "", imgUrl: "" },
    ]);
    setTimeout(() => {
      scrollViewRefInstructions.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleIngredientChange = (id, value) => {
    setIngredientCards(
      ingredientCards.map((card) =>
        card.id === id ? { ...card, value } : card
      )
    );
  };

  const handleInstructionChange = (index, key, value) => {
    setInstructionCards(
      instructionCards.map((card, i) =>
        i === index ? { ...card, [key]: value } : card
      )
    );
  };

  const handleRemoveIngredient = (id) => {
    setIngredientCards(ingredientCards.filter((card) => card.id !== id));
  };

  const handleRemoveInstruction = (index) => {
    setInstructionCards(instructionCards.filter((_, i) => i !== index));
  };

  const handleIngredientsSubmit = () => {
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
  };

  const handleInstructionsSubmit = () => {
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
  };

  const handleSubmitRecipe = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          imgUrl,
          ingredients,
          instructions,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Recipe submitted successfully!", [
          { text: "OK", onPress: () => navigation.navigate("RecipeCatalog") },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to submit recipe");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
          <TextInput
            style={styles.input}
            placeholder="Enter image URL"
            value={imgUrl}
            onChangeText={setImgUrl}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSecondCardSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
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
                <TextInput
                  style={styles.input}
                  placeholder={`Enter image URL for step ${index + 1}`}
                  value={card.imgUrl}
                  onChangeText={(value) =>
                    handleInstructionChange(index, "imgUrl", value)
                  }
                />
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
    height: "50%", // Adjust height to allow scrolling within the card
  },
  instructionsCard: {
    height: "50%", // Adjust height to allow scrolling within the card
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
    marginBottom: 20, // Ensure some space at the bottom
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
  removeButton: {
    marginLeft: 10,
  },
});
