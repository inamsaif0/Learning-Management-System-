import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/profile.png';
// Tab ICons...
import home from './assets/home.png';
import search from './assets/search.png';
import notifications from './assets/bell.png';
import settings from './assets/settings.png';
import logout from './assets/logout.png';
// Menu
import menu from './assets/menu.png';
import close from './assets/close.png';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-paper';
// Photo
import photo from './assets/photo.jpg';
import { ScrollView, Stack } from 'native-base';
import Example from './Example';
import doc from './assets/doc.png'
import audio from './assets/audio.png'
import {UserContext} from './App'

import music from './assets/music.png';

export default function App({navigation}) {
  const email = React.useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const navigationtodraw =  useNavigation();
  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const handleClick = () => {
    setCurrentTab('Toptab');
  }


  return (

    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15, marginTop:20 }}>
        

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{email.userEmail}</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

      </View>

      {
        // Over lay View...
        // main screen
    
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
     
        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // Your Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>
            
              <Image source={showMenu ? close : menu} style={{
                width: 20,
                height: 20,
                tintColor: 'black',
                marginTop: 40,

              }}></Image>

          </TouchableOpacity>
          
            {currentTab === "Home" ?  
          <ScrollView style={styles.box}>
              
          <TouchableOpacity onPress={handleClick}>
          <ImageBackground source={photo} style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25,
            alignItems:'center', 
            justifyContent:'center'
            }}   imageStyle={{ borderRadius: 15}}
            >
              <Image source={doc} style={{width:'30%', height:'50%',}}></Image>
              <Text style={{fontSize:20, color:'white', marginTop:10}}> Documents</Text>
              </ImageBackground>
 {/* <Card
          style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25,
            backgroundColor:'gray'
          }}
          >
      
        <Card.Content style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:25}}>InamSaif</Text>
        </Card.Content>
      
    
     </Card> */}

          {/* <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
            , paddingTop: 15,
            paddingBottom: 5
          }}>Padma</Text>

          <Text style={{
          }}>Techie, YouTuber, PS Lover, Apple Sheep's Sister</Text>*/}
          </TouchableOpacity> 
          <TouchableOpacity onPress={handleClick} style={{borderRadius: 15}}>
          <ImageBackground source={photo} style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25,
            alignItems:'center', 
            justifyContent:'center'
            }}   imageStyle={{ borderRadius: 15}}
            ><Image source={music} style={{width:'40%', height:'60%',}}></Image>
              <Text style={{fontSize:20, color:'white', marginTop:10}}>Audio</Text>
            </ImageBackground>
          {/* <Card
          style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25
          }}
          >
      
        <Card.Content style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:25}}>InamSaif</Text>
        </Card.Content>
      
    
     </Card> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClick}>

          <ImageBackground source={photo} style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25,
            alignItems:'center', 
            justifyContent:'center'
          }}   imageStyle={{ borderRadius: 15}}
          ><Image source={doc} style={{width:'30%', height:'50%',}}></Image>
              <Text style={{fontSize:20, color:'white', marginTop:10}}>Quiz</Text>
            </ImageBackground>
          </TouchableOpacity>
{/* 
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
            , paddingTop: 15,
            paddingBottom: 5
          }}>Muskan</Text>

          <Text style={{
          }}>Techie, YouTuber, PS Lover, Apple Sheep's Sister</Text> */}
          <TouchableOpacity onPress={handleClick}>
        {/* <Card
          style={{
            width: '100%',
            height: 210,
            borderRadius: 15,
            marginTop: 25
          }}
          >
      
        <Card.Content style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:25}}>InamSaif</Text>
        </Card.Content>
      
    
     </Card> */}
          </TouchableOpacity>

          {/* <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
            , paddingTop: 15,
            paddingBottom: 5
          }}>Padma</Text> */}

        </ScrollView>
      : currentTab === "Search" ? <Text>Search</Text> 
      : currentTab === "Notifications" ? <Text>Notification</Text> 
      : currentTab === "Settings" ? <Text>Settings</Text> 
      : currentTab === "Toptab" ? <View style={{height:700 }}><Example/></View>
      : <Text>Not</Text>}
         </Animated.View>
    </Animated.View>
    </SafeAreaView >
  );
}



// For multiple Buttons...
// this is the function i can use for all the pages
const TabButton = (currentTab, setCurrentTab, title, image) => {
  const navigation = useNavigation();

  return (


    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        navigation.navigate('Login')
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#800000" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#800000" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  box:{
    display:'flex',
  }
});
