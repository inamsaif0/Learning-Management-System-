import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AudioPlayer from '../Components/Audioplayer';


export default function ListRecordings() {
    const [recordings, setRecordings] = React.useState([])
    const [active, setActive] = React.useState(null);

    function getActive(acive){
        setActive(active)

    }


    const retrieveData = async () => {
        try {
            const existingArray = await AsyncStorage.getItem('RECORDING');
            if (existingArray) {
                const parsedArray = JSON.parse(existingArray);
                setRecordings(parsedArray);
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    //Helper Function
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully.');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };
    

    React.useEffect(() => {
      // clearAsyncStorage()
         retrieveData()
    }, [])


    return  (
        <ScrollView style={{backgroundColor:"#F5F2F0",paddingTop:40}}>
          {recordings.map((recording, index) => (
            <AudioPlayer title={recording.title} audioFile={recording.audio} key={index} getActive={getActive} active={active}/>
          ))}
        </ScrollView>
      );
}