import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'native-base';
import { Dimensions, ImageBackground } from 'react-native';
import { StyleSheet, Text, ScrollView, ListItem } from 'react-native';
import { Icon } from 'native-base';
import { Checkbox } from 'react-native-paper';
// import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const navigation = useNavigation();


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

    const handleLogin = () => {
        validateEmail();
        validatePassword();

        if (!emailError && !passwordError) {
            // Proceed with login logic here
            console.log('Login pressed');
            navigation.navigate('Home');
        }
    };
    const handleFacebookLogin = () => {
        // Handle Facebook login here
        console.log('Facebook login pressed');
      };
    
      const handleTwitterLogin = () => {
        // Handle Twitter login here
        console.log('Twitter login pressed');
      };
    
      const handleInstagramLogin = () => {
        // Handle Instagram login here
        console.log('Instagram login pressed');
      };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fffff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('./assets/back.jpg')}
                style={{ height: Dimensions.get('window').height / 2.5, opacity: 0.8 }}>

                <View style={styles.brandView}>
                    <Icon
                        name="location-sharp"
                        style={{ color: "#ffff", fontSize: 100 }}
                    />
                    <Text style={styles.brandViewText}>
                        OTP Mobile
                    </Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#4632A1', fontSize: 34 }}>Welcome</Text>
                    <Text style={{ marginTop: 20 }}>
                        Don't have an account?
                        <Text style={{ color: 'red', fontStyle: 'italic' }}>
                            {' '}
                            Register now
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
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text>Remember Me</Text>
                            {/* <Text style={{alignSelf:'flex-end'}}>Forgot Password</Text> */}
                        </View>
                    </View>
                    <Button mode="contained" onPress={handleLogin} style={styles.button}>
                        Login
                    </Button>
                    <View style={styles.socialButtonsContainer}>
                        <Button
                            mode="contained"
                            icon={() => <FontAwesome name="facebook" size={20} style={styles.socialIcon} />}
                            onPress={handleFacebookLogin}
                            style={[styles.socialButton, styles.facebookButton]}
                        >
                        
                        </Button>
                        <Button
                            mode="contained"
                            icon={() => <FontAwesome name="twitter" size={20} style={styles.socialIcon} />}
                            onPress={handleTwitterLogin}
                            style={[styles.socialButton, styles.twitterButton]}
                        >
                            
                        </Button>
                        <Button
                            mode="contained"
                            icon={() => <FontAwesome name="instagram" size={20} style={styles.socialIcon} />}
                            onPress={handleInstagramLogin}
                            style={[styles.socialButton, styles.instagramButton]}
                        >
                            
                        </Button>
                    </View>
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
        flex: 1.5,
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
