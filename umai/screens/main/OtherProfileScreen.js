import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

export default function OtherProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("recipes");
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const route = useRoute();
  const { userId } = route.params;
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  async function fetchUserProfile() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  }

  async function handleDonate() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/donate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUserId: userId,
            amount: donationAmount,
          }),
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error during donation:", error);
      Alert.alert("Error", "Something went wrong during the donation process.");
    } finally {
      setDonationModalVisible(false);
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
        <View style={styles.headerContainer}>
          <View style={styles.umaiHeaderContainer}>
            <Image
              style={styles.umaiImage}
              source={require("../../assets/umai_text.png")}
            ></Image>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{ uri: user.profileImgUrl }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user.fullname}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>

          <View style={styles.coinContainer}>
            <TouchableOpacity
              style={styles.topUpButton}
              onPress={() => setDonationModalVisible(true)}
            >
              <Text style={styles.topUpButtonText}>Donate</Text>
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

          <Modal
            visible={donationModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setDonationModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Donate</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  placeholderTextColor={"#536E2C"}
                  keyboardType="numeric"
                  value={donationAmount}
                  onChangeText={setDonationAmount}
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleDonate}
                  >
                    <Text style={styles.modalButtonText}>Donate Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setDonationModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
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
    color: "#536E2C",
  },
  username: {
    fontSize: 16,
    color: "#6C8E3B",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  topUpButton: {
    padding: 10,
    backgroundColor: "#B7D88C",
    borderRadius: 10,
  },
  topUpButtonText: {
    color: "#536E2C",
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
    backgroundColor: "#6C8E3B",
  },
  inactiveButton: {
    backgroundColor: "#C5CAB0",
  },
  buttonText: {
    color: "#F9EFAE",
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
    backgroundColor: "#F1ECCD",
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
    color: "#536E2C",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#F9EFAE",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#536E2C"
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFBDE",
    borderColor: "#536E2C",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#536E2C",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#F1ECCD",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#9F691D",
  },
  headerContainer: {
    flex: 1 / 10,
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f3e9a9",
  },
  listContainer: {
    justifyContent: "space-between",
  },
});
