// components/CardRecipeCatalog.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CardRecipeCatalogr({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{recipe.name}</Text>
      <Text style={styles.cardText}>
        Ingredients: {recipe.ingredients.length}
      </Text>
      <Text style={styles.cardText}>
        Instructions: {recipe.instructions.length}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
  },
});
