import React from "react";
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View } from "react-native";

export default function CardRecipeCatalog({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground
        source={{ uri: recipe.imgUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay} />
        <Text style={styles.cardTitle}>{recipe.name}</Text>
        <Text style={styles.cardText}>Ingredients: {recipe.ingredients.length}</Text>
        <Text style={styles.cardText}>Instructions: {recipe.instructions.length}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  image: {
    borderRadius: 10,
    opacity: 0.3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
  },
});