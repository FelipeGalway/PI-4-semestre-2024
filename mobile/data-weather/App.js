import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dash from './components/Dash';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Projections from './components/Projections';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Define que o usuário está logado
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {() => <Login onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dash} />
        <Stack.Screen name="Temperature" component={Temperature} />
        <Stack.Screen name="Humidity" component={Humidity} />
        <Stack.Screen name="Projections" component={Projections} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
