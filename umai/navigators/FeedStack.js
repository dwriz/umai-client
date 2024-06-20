import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/main/FeedScreen";
import OtherProfileScreen from "../screens/main/OtherProfileScreen";

const Stack = createStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />
    </Stack.Navigator>
  );
}
