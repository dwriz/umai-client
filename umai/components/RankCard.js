import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const Header = () => (
  <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerButtonText}>By Completed Recipes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerButtonRecipes}>
      <Text style={styles.headerButtonTextRecipes}>By Created Recipes</Text>
    </TouchableOpacity>
  </View>
);

export default function RankCard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "Alice",
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        tutorialsCompleted: 15,
      },
      {
        id: 2,
        name: "Bob",
        avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        tutorialsCompleted: 20,
      },
      {
        id: 3,
        name: "Charlie",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        tutorialsCompleted: 10,
      },
      {
        id: 4,
        name: "David",
        avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        tutorialsCompleted: 25,
      },
      {
        id: 5,
        name: "Eva",
        avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        tutorialsCompleted: 30,
      },
      {
        id: 6,
        name: "Frank",
        avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg",
        tutorialsCompleted: 5,
      },
      {
        id: 7,
        name: "Grace",
        avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        tutorialsCompleted: 18,
      },
      {
        id: 8,
        name: "Hank",
        avatarUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        tutorialsCompleted: 22,
      },
      {
        id: 9,
        name: "Ivy",
        avatarUrl: "https://randomuser.me/api/portraits/women/9.jpg",
        tutorialsCompleted: 8,
      },
      {
        id: 10,
        name: "Jack",
        avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
        tutorialsCompleted: 12,
      },
    ];

    const sortedUsers = mockUsers.sort(
      (a, b) => b.tutorialsCompleted - a.tutorialsCompleted
    );
    setUsers(sortedUsers);
    setLoading(false);
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={styles.subtitle}
        >{`Tutorials Completed: ${item.tutorialsCompleted}`}</Text>
      </View>
      <Text style={styles.rank}>{`Rank: ${index + 1}`}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#d4d768" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={users}
        renderItem={renderItem}
        ListHeaderComponent={Header}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "black",
  },
  infoContainer: {
    color: "#f3e9a9",
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "#d4d768",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  headerButton: {
    padding: 10,
    backgroundColor: "#536e2c",
    borderRadius: 5,
    alignItems: "center",
    borderBlockColor: "green",
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerButtonRecipes: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  headerButtonTextRecipes: {
    color: "black",
    fontWeight: "bold",
  },
});
