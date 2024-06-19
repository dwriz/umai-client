import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";

export default function RankScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("finished");
  const { setIsLoggedIn } = useContext(AuthContext);

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
        <View style={styles.headerContainer}>
        <View style={styles.umaiHeaderContainer}>
          <Image
            style={styles.umaiImage}
            source={require("../../assets/umai_text.png")}
          ></Image>
        </View>
      </View>
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "finished" && styles.activeButton,
          ]}
          onPress={() => setFilter("finished")}
        >
          <Text style={styles.buttonText1}>By Finished Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "created" && styles.activeButton,
          ]}
          onPress={() => setFilter("created")}
        >
          <Text style={styles.buttonText1}>By Created Recipes</Text>
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
    backgroundColor: "#F9EFAE",
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
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: "#F1ECCD",
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
    color: "#536E2C"
  },
  username: {
    fontSize: 14,
    color: "#536E2C",
  },
  count: {
    fontSize: 14,
    color: "#536E2C",
  },
  rankContainer: {
    alignItems: "center",
  },
  rankLabel: {
    fontSize: 14,
    color: "#536E2C",
  },
  rankNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C07F24",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#C5CAB0",
  },
  activeButton: {
    backgroundColor: "#6C8E3B",
  },
  buttonText1: {
    color: "#FFEDD3",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 20,
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
    justifyContent: "center",
    alignItems: "center"
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
  listContainer: {
    justifyContent: "space-between",
  },
});
