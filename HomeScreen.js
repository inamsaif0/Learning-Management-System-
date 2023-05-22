// import {View, Text} from 'react-native'
// import {createAppContainer} from 'react-navigation';
// import {createDrawerNavigator} from '@react-navigation/drawer'
// import { Dimension } from 'react-native';
// import {
//     ProfileScreen,
//     MessageScreen,
//     ActivityScreen,
//     ListScreen,
//     ReportScreen,
//     SatisticScreen,
//     SettingScreen,
//     SignOutScreen
// } from "./screens";

// const DrawNavigator = createDrawerNavigator({
//     ProfileScreen,
//     MessageScreen,
//     ActivityScreen,
//     ListScreen,
//     ReportScreen,
//     SatisticScreen,
//     SettingScreen,
//     SignOutScreen
// })

//   export default createAppContainer(DrawNavigator)

import React from 'react';
import { View, Text } from 'react-native';
// import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
