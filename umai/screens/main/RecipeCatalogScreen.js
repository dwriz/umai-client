import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import CardRecipeCatalog from "../../components/CardRecipeCatalog";

export default function RecipeCatalogScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/recipes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);

      setLoading(false);
    }
  }

  function renderRecipe({ item }) {
    return <CardRecipeCatalog recipe={item} />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "space-between",
  },
});
