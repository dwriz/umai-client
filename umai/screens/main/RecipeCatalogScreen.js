import React, { useState, useEffect, useCallback, useContext } from "react";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Text,
} from "react-native";
import RecipeCatalogCard from "../../components/RecipeCatalogCard";
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeCatalogScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

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
    return (
      <RecipeCatalogCard
        recipe={item}
        onPress={() => navigation.navigate("Tutorial", { recipe: item })}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
        <View style={styles.textContainer}>
          <Text style={styles.subHeaderText}>Our list of recipe</Text>
        </View>
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 2 / 11,
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
    marginBottom: 12.5,
  },
  buttonText: {
    color: "#FFEDD3",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: 17,
  },
  subHeaderText: {
    fontSize: 25,
    color: "#9F691D",
    fontWeight: "bold",
    fontStyle: "italic",
    marginLeft: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
});
