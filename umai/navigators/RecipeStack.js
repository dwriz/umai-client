import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeCatalogScreen from "../screens/main/RecipeCatalogScreen";
import TutorialScreen from "../screens/main/TutorialScreen";

const Stack = createStackNavigator();

export default function RecipeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeCatalog" component={RecipeCatalogScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
    </Stack.Navigator>
  );
}
