import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

export default function TutorialScreen({ route, navigation }) {
  const { recipe } = route.params;
  const [currentStep, setCurrentStep] = useState(0);

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
        navigation.navigate("RecipeCatalog");
      }
    });
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
});
