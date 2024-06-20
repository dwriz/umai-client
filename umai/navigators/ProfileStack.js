import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/main/ProfileScreen";
import TopUpScreen from "../screens/main/TopUpScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
    </Stack.Navigator>
  );
}
