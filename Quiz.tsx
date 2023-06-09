import { View } from "react-native";
import QuizMain from "./Screens/QuizMain";
<<<<<<< HEAD
import Start from "./screens/Start";
import * as SplashScreen from 'expo-splash-screen';
=======
import Start from "./Screens/Start";
>>>>>>> 721d209bc97e2f9878b70fb8f512ad0ebb2ef8c9
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Screens/Home";




const Stack = createNativeStackNavigator();


export default function Quiz() {

  // const [isLoaded] = useFonts({
  //   "geo-mid": require("./assets/fonts/Geologica-Medium.ttf"),
  //   "geo-bold": require("./assets/fonts/Geologica-Bold.ttf"),
  //   "geo-xbold": require("./assets/fonts/Geologica-ExtraBold.ttf"),
  // });

  // const handleOnLayout = useCallback(async () => {
  //   if (isLoaded) {
  //     await SplashScreen.hideAsync(); //hide the splashscreen
  //   }
  // }, [isLoaded]);
  // if (!isLoaded) {
  //   return null;
  // }

 


  return (
    <>
      <NavigationContainer independent={true} >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Start" component={Start} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )

}


