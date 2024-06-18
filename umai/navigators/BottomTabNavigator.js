import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import CreateRecipeScreen from "../screens/main/CreateRecipeScreen.js";
import RankScreen from "../screens/main/RankScreen.js";
import RecipeStack from "./RecipeStack";
import ProfileStack from "./ProfileStack";
import FeedStack from "./FeedStack"; // Make sure to import FeedStack

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user_id");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="RecipeCatalog"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#536E2C" },
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
            case "FeedStack": // Use FeedStack here
              iconName = "newspaper";
              break;
            case "ProfileStack":
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
          tabBarLabel: "Recipe",
        }}
      />
      <Tab.Screen
        name="CreateRecipeScreen"
        component={CreateRecipeScreen}
        options={{
          tabBarLabel: "Create",
        }}
      />
      <Tab.Screen
        name="FeedStack"
        component={FeedStack}
        options={{
          tabBarLabel: "Feed",
        }}
      />
      <Tab.Screen
        name="RankScreen"
        component={RankScreen}
        options={{
          tabBarLabel: "Rank",
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#c07f24",
  },
});
