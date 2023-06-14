
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from './Login';
import HomeScreen from './HomeScreen'
import TabBarAccessoriesShowcase from './Example'
import { NativeBaseProvider } from 'native-base';
import Example from './Example';
import Music from './Music';
// import FlatListDemo from './FlatList';
import Listpdf from './Listpdf';
import Recordings from './Recording';
import ListRecordings from './Screens/listRercordings';
import Record from './Screens/Record';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home" screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={Login} ></Stack.Screen> */}
        <Stack.Screen name="Home" component={HomeScreen} ></Stack.Screen>
        <Stack.Screen name="Example" component={Example} ></Stack.Screen>
        <Stack.Screen name="MusicData" component={Music} ></Stack.Screen>
        <Stack.Screen name="listRecordings" component={ListRecordings} options={{headerShown: true}}></Stack.Screen>
        <Stack.Screen name="recordings" component={Record}></Stack.Screen>
        {/* <Stack.Screen name="Recordings" component={Recordings}></Stack.Screen> */}

        
        {/* <Stack.Screen name='List' component={Listpdf}></Stack.Screen> */}

      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  )
};