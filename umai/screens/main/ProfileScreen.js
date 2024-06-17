import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("recipes");

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  async function fetchUserProfile() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/self`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF7F50" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: user.profileImgUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.fullname}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        <View style={styles.coinContainer}>
          <FontAwesome5 name="coins" size={24} color="#FFD700" />
          <Text style={styles.coinText}>{user.balance}</Text>
          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpButtonText}>Top Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.recipesButton,
              activeSection === "recipes"
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveSection("recipes")}
          >
            <Text style={styles.buttonText}>Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cookedButton,
              activeSection === "cooked"
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => setActiveSection("cooked")}
          >
            <Text style={styles.buttonText}>Cooked</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.sectionContainer}>
            {activeSection === "recipes"
              ? user.recipes.map((recipe) => (
                  <View key={recipe._id} style={styles.card}>
                    <Image
                      source={{ uri: recipe.imgUrl }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{recipe.name}</Text>
                  </View>
                ))
              : user.posts.map((post) => (
                  <View key={post._id} style={styles.card}>
                    <Image
                      source={{ uri: post.imgUrl }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{post.recipeName}</Text>
                  </View>
                ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "gray",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  coinText: {
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  topUpButton: {
    padding: 10,
    backgroundColor: "#0077b5",
    borderRadius: 10,
  },
  topUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recipesButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  cookedButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: "#0077b5",
  },
  inactiveButton: {
    backgroundColor: "#7fbbda",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
