import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'native-base';
import { Dimensions, ImageBackground, Image } from 'react-native';
import { StyleSheet, Text, ScrollView, ListItem } from 'react-native';
import { Icon } from 'native-base';
import { Checkbox } from 'react-native-paper';
// import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';

import adaptiveicon from './assets/adaptive-icon.png'

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const navigation = useNavigation();

    const [error,setError] = React.useState(false)
    const handleLogin = async () => {
        validateEmail();
        validatePassword();
        if (!emailError && !passwordError) {
        const response = await axios.post('http://192.168.100.97:3000/login',{
            email :  email,
            password: password
        })
        if(response.data.success) {
            console.log(response.data)
            try {
                await AsyncStorage.setItem('userId', response.data.message._id);
                console.log('User ID set in AsyncStorage:', response.data.message._id);
              } catch (error) {
                console.error('Failed to set user ID in AsyncStorage:', error);
              }
            console.log(response)
            navigation.navigate('Home')
        } 
        else {
            setError(true) 
            console.log(error)}
    }
    }
    // useEffect(()=>{
    //     router.prefetch('/users/userList')
    // },[])
    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const isValidEmail = (value) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    // const handleLogin = () => {
    //     validateEmail();
    //     validatePassword();

    //     if (!emailError && !passwordError) {
    //         // Proceed with login logic here
    //         console.log('Login pressed');
    //         navigation.navigate('Home');
    //     }
    // };
    // const handleFacebookLogin = () => {
    //     // Handle Facebook login here
    //     console.log('Facebook login pressed');
    //   };
    
    //   const handleTwitterLogin = () => {
    //     // Handle Twitter login here
    //     console.log('Twitter login pressed');
    //   };
    
    //   const handleInstagramLogin = () => {
    //     // Handle Instagram login here
    //     console.log('Instagram login pressed');
    //   };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('./assets/backgroundimage.jpg')}
                style={{ height: Dimensions.get('window').height / 2.5, }}>

                <View style={styles.brandView}>
                    {/* <Icon
                        name="location-sharp"
                        style={{ color: "#ffff", fontSize: 100 }}
                    /> */}
                    <Image source={adaptiveicon} style={{ height:150, width:300 }}></Image>

                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 40 }}>
                    <Text style={{ fontSize: 34, color:'#800000' }} >Welcome</Text>
                    <Text style={{ marginTop: 20 }}>
                        Welcome to the Portal
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>
                            {' '}
                            
                        </Text>
                    </Text>
                    <View style={styles.bottomPart}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            onBlur={validateEmail}
                            style={styles.input}
                            left={<TextInput.Icon icon="account" />}

                        />
                        <HelperText type="error" visible={!!emailError}>
                            {emailError}
                        </HelperText>
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            onBlur={validatePassword}
                            secureTextEntry
                            style={styles.input}
                            left={<TextInput.Icon icon="lock" />}
                        />
                        <HelperText type="error" visible={!!passwordError}>
                            {passwordError}
                        </HelperText>

                        <View style={styles.end}>
                            <Checkbox
                            theme={{ colors: { primary: '#800000' } }}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text>Remember Me</Text>
                            {/* <Text style={{alignSelf:'flex-end'}}>Forgot Password</Text> */}
                        </View>
                    </View>
                    <Button  onPress={handleLogin} style={styles.button} theme={{ colors: { primary: '#ffff' } }}>
                        Login
                    </Button>

                </View>
            </View>
            {/* <StatusBar style="auto" /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    brandView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
    },
    brandViewText: {
        color: "#ffff",
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    bottomView: {
        flex: 1,
        backgroundColor: '#fff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60
    },
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
        backgroundColor:'#800000',
        fontColor:'#ffff',
        marginBottom:80
    },
    bottomPart: {
        marginTop: 50,
    },
    end: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    socialButtonsContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
        
        marginTop: 20,
      },
      socialButton: {
        width: 40,
        marginTop: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      socialButtonContent: {
         // Adjust the width as per your requirement
        height: 36,
      },
      socialButtonLabel: {
        fontSize: 14,
      },
      facebookButton: {
        backgroundColor: '#4267B2',
      },
      twitterButton: {
        backgroundColor: '#1DA1F2',
      },
      instagramButton: {
        backgroundColor: '#C13584',
      },
      socialIcon: {
        color: '#FFFFFF',
        marginLeft:15
      },
});
