import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  async function fetchPosts() {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);

      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  function renderPost({ item }) {
    return (
      <>
        <View style={styles.postContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: item.user.profileImgUrl }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.fullname}>{item.user.fullname}</Text>
              <Text style={styles.username}>@{item.user.username}</Text>
            </View>
          </View>
          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>{item.recipe.name}</Text>
          </View>
        </View>
      </>
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
    <>
    <SafeAreaView style={styles.safeArea}>
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
      <View style={styles.container}>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    marginVertical: 10,
    backgroundColor: "#F1ECCD",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10
  },
  fullname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#536E2C",
    marginTop: 8
  },
  username: {
    fontSize: 14,
    color: "#6C8E3B",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeInfo: {
    alignItems: "center",
    marginTop: 10,
  },
  recipeName: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  logoutButton: {
    marginBottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
});
