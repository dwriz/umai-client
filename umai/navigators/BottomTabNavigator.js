import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, StyleSheet, Image  } from "react-native";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext.js";
import CreateRecipeScreen from "../screens/main/CreateRecipeScreen.js";
import FeedScreen from "../screens/main/FeedScreen.js";
import ProfileScreen from "../screens/main/ProfileScreen.js";
import RankScreen from "../screens/main/RankScreen.js";
import RecipeStack from "./RecipeStack";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="RecipeCatalog"
      screenOptions={({ route }) => ({
        tabBarStyle: {backgroundColor: "#536E2C"},
        headerShown: false,
        tabBarActiveTintColor: "#C7EA99",
        tabBarInactiveTintColor: "#6C8D3B",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "RecipeStack":
              iconName = "fast-food";
              break;
            case "CreateRecipeScreen":
              iconName = "create";
              break;
            case "FeedScreen":
              iconName = "newspaper";
              break;
            case "ProfileScreen":
              iconName = "person";
              break;
            case "RankScreen":
              iconName = "trophy";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
      name="RecipeStack" 
      component={RecipeStack}
      options={{
        tabBarLabel: "Recipe"
      }} 
      />
      <Tab.Screen 
      name="CreateRecipeScreen" 
      component={CreateRecipeScreen} 
      options={{
        tabBarLabel: "Create"
      }} 
      />
      <Tab.Screen 
      name="FeedScreen" 
      component={FeedScreen}
      options={{
        tabBarLabel: "Feed"
      }}  
      />
      <Tab.Screen 
      name="RankScreen" 
      component={RankScreen} 
      options={{
        tabBarLabel: "Rank"
      }} 
      />
      <Tab.Screen 
      name="ProfileScreen" 
      component={ProfileScreen} 
      options={{
        tabBarLabel: "Profile"
      }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
logoutButton: {
backgroundColor: "#c07f24"
}
})
