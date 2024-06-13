// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./navigators/MainStack";
import AuthProvider from "./context/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainStack" component={MainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
  );
}