// navigators/BottomTabNavigator.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, Button } from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext.js";
import RecipeCatalogScreen from "../screens/main/RecipeCatalogScreen.js";
import CreateRecipeScreen from "../screens/main/CreateRecipeScreen.js";
import FeedScreen from "../screens/main/FeedScreen.js";
import ProfileScreen from "../screens/main/ProfileScreen.js";
import RankScreen from "../screens/main/RankScreen.js";

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
        headerShown: true,
        headerRight: () => (
          <Button title="Logout" onPress={handleLogout} color="#FF0000" />
        ),
        tabBarActiveTintColor: "#",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarIcon: () => {
          let iconName;

          switch (route.name) {
            case "RecipeCatalog":
              iconName = "fast-food";
              break;
            case "CreateRecipeScreen":
              iconName = "cart";
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

          return <Ionicons name={iconName} />;
        },
      })}
    >
      <Tab.Screen name="CreateRecipeScreen" component={CreateRecipeScreen} />
      <Tab.Screen name="FeedScreen" component={FeedScreen} />
      <Tab.Screen name="RecipeCatalog" component={RecipeCatalogScreen} />
      <Tab.Screen name="RankScreen" component={RankScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
