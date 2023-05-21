
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from './Login';
import HomeScreen from './HomeScreen'
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} ></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} ></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  )
};