import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RankScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("finished");

  useEffect(() => {
    fetchRanking();
  }, []);

  async function fetchRanking() {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/ranking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ranking:", error);
      setLoading(false);
    }
  }

  function renderUser({ item, index }) {
    const count =
      filter === "finished" ? item.finishedRecipeCount : item.recipes.length;

    return (
      <View style={styles.userContainer}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.profileImgUrl }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.fullname}>{item.fullname}</Text>
            <Text style={styles.username}>@{item.username}</Text>
            <Text style={styles.count}>
              {filter === "finished"
                ? "Finished Recipes: "
                : "Created Recipes: "}
              {count}
            </Text>
          </View>
        </View>
        <View style={styles.rankContainer}>
          <Text style={styles.rankLabel}>Rank</Text>
          <Text style={styles.rankNumber}>{index + 1}</Text>
        </View>
      </View>
    );
  }

  function getSortedUsers() {
    return users.sort((a, b) => {
      if (filter === "finished") {
        return b.finishedRecipeCount - a.finishedRecipeCount;
      } else {
        return b.recipes.length - a.recipes.length;
      }
    });
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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "finished" && styles.activeButton,
          ]}
          onPress={() => setFilter("finished")}
        >
          <Text style={styles.buttonText}>By Finished Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "created" && styles.activeButton,
          ]}
          onPress={() => setFilter("created")}
        >
          <Text style={styles.buttonText}>By Created Recipes</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={getSortedUsers()}
        renderItem={renderUser}
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
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  fullname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  count: {
    fontSize: 14,
    color: "#333",
  },
  rankContainer: {
    alignItems: "center",
  },
  rankLabel: {
    fontSize: 14,
    color: "#888",
  },
  rankNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F50",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  activeButton: {
    backgroundColor: "#FF7F50",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 20,
  },
  safeArea: {
    flex: 1
  }
});
