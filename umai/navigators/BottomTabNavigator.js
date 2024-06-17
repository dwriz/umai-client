import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, Button } from "react-native";
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
        headerShown: true,
        headerRight: () => (
          <Button title="Logout" onPress={handleLogout} color="#FF0000" />
        ),
        tabBarActiveTintColor: "#FF7F50",
        tabBarInactiveTintColor: "#A9A9A9",
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
      <Tab.Screen name="RecipeStack" component={RecipeStack} />
      <Tab.Screen name="CreateRecipeScreen" component={CreateRecipeScreen} />
      <Tab.Screen name="FeedScreen" component={FeedScreen} />
      <Tab.Screen name="RankScreen" component={RankScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
