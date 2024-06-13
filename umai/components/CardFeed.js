import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const data = [
  {
    id: "1",
    user: "User 1",
    time: "10 mins ago",
    content: "Content 1",
    imageUrl: "https://example.com/image1.jpg",
    profileImageUrl: "https://example.com/profile1.jpg",
  },
  {
    id: "2",
    user: "User 2",
    time: "20 mins ago",
    content: "Content 2",
    imageUrl: "https://example.com/image2.jpg",
    profileImageUrl: "https://example.com/profile2.jpg",
  },
  {
    id: "3",
    user: "User 3",
    time: "30 mins ago",
    content: "Content 3",
    imageUrl: "https://example.com/image3.jpg",
    profileImageUrl: "https://example.com/profile3.jpg",
  },
  {
    id: "4",
    user: "User 4",
    time: "40 mins ago",
    content: "Content 4",
    imageUrl: "https://example.com/image4.jpg",
    profileImageUrl: "https://example.com/profile4.jpg",
  },
];

const Header = () => (
  <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerButtonText}>Posts by UmaiMates</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerButtonRecipes}>
      <Text style={styles.headerButtonTextRecipes}>Recipes By UmaiMates</Text>
    </TouchableOpacity>
  </View>
);

export default function CardFeed() {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image
            source={{ uri: item.profileImageUrl }}
            style={styles.profileImage}
          />
          <TouchableOpacity>
            <Text style={styles.postUser}>{item.user}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <TouchableOpacity>
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Like</Text>
          <FontAwesome
            name="thumbs-o-up"
            size={15}
            color="black"
            style={styles.fontAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Try This Recipe</Text>
          <FontAwesome
            name="cutlery"
            size={15}
            color="black"
            style={styles.fontAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Comment</Text>
          <FontAwesome
            name="comment-o"
            size={15}
            color="black"
            style={styles.fontAction}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={Header}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  headerButton: {
    padding: 10,
    backgroundColor: "#FF7F50",
    borderRadius: 5,
    alignItems: "center",
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerButtonRecipes: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
  },
  headerButtonTextRecipes: {
    color: "#FF7F50",
    fontWeight: "bold",
  },
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontWeight: "bold",
    color: "#FF7F50",
  },
  postTime: {
    color: "#666",
  },
  postContent: {
    marginVertical: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    flexDirection: "row",
  },
  fontAction: {
    marginLeft: 5,
  },
});
