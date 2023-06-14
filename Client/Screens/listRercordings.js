import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AudioPlayer from '../Components/Audioplayer';


export default function ListRecordings() {
    const [recordings, setRecordings] = React.useState([])
    const [active, setActive] = React.useState({});
    


    const getActive = (index, isActive) => {
        
          setActive(isActive);
       
      };
      


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


    return (
        <SafeAreaView style={{ backgroundColor: "#F5F2F0", paddingTop: 10 }}>
            <Text style={{ fontSize: 45, padding: 15, fontWeight: 'bold' }}>
                All Recordings
            </Text>
            <FlatList
                data={recordings}
                keyExtractor={(recording, index) => index.toString()}
                renderItem={({ item, index }) => (
                    
                        <AudioPlayer
                            title={item.title}
                            audioFile={item.audio}
                            getActive={(isActive) => getActive(index, isActive)}
                            index={index}
                            active={active}
                        />
                    
                )}
            />

        </SafeAreaView>
    );
}

  