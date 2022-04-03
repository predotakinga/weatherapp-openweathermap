import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeView from "./screens/HomeView";
import SeniorView from "./screens/SeniorView";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeView" component={HomeView} />
        <Stack.Screen name="SeniorView" component={SeniorView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
