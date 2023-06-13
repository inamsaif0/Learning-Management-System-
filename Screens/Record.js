import * as React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Timer from '../Components/Timer';
import { AntDesign } from '@expo/vector-icons';
import {useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import Stopwatch from '../Components/stopwatch';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Record() {
    const navigation=useNavigation()
  const [recording, setRecording] = useState();
  const [pause,setPause]=useState(false);
  const [recordings,setRecordings]=useState([])
  const [location,setLocation]=useState("");

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecordings((prevArray)=>[...prevArray,uri])
    setLocation(uri)
    console.log('Recording stopped and stored at', uri);
  }

  async function pauseRecording() {
    
    if (recording && recording.getStatusAsync().isRecording) {
      try {
        await recording.pauseAsync();
        // Recording paused
        setPause(true)
      } catch (error) {
        // Handle pause error
        console.error(error);
      }
    }
  }

  async function resumeRecording() {
    if (recording && recording.getStatusAsync().canResume) {
      try {
        await recording.startAsync();
        // Recording resumed
        setPause(false)
      } catch (error) {
        // Handle resume error
        console.error(error);
      }
    }
  }

  const retrieveData = async () => {
    try {
      const existingArray = await AsyncStorage.getItem('RECORDING');
      return existingArray ? JSON.parse(existingArray) : [];
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return [];
    }
  };

  const appendValue = async (newValue) => {
    try {
      const existingArray = await retrieveData();
      existingArray.push(newValue);
      await AsyncStorage.setItem('RECORDING', JSON.stringify(existingArray));
      console.log('Value appended successfully.');
    } catch (error) {
      console.error('Error appending value in AsyncStorage:', error);
    }
  };

  React.useEffect(()=>{
    if(location!=="")
    {
        appendValue(location)
    }
  },[location])
  



  return (
    <View style={styles.container}>
        <Stopwatch start={recording}/>
        <Pressable onPress={recording?stopRecording:startRecording} style={{backgroundColor:'#800000',width:200,height:200,borderRadius:200,justifyContent:'center',alignItems:'center'}}>
            {recording?
            <Entypo name="controller-stop" size={44} color="white" />:
            <Text style={{color:'white',fontSize:30}}>
                RECORD
            </Text>}
        </Pressable>


        <View style={{backgroundColor:'white',flexDirection:'row',justifyContent:"space-around",alignItems:"center",width:"95%",height:70,borderRadius:'20',position:'absolute',bottom:140}}>
       <Pressable onPress={pause?resumeRecording:pauseRecording}>
        {pause?
            <AntDesign name="play" size={40} color="#800000"/>:
            <AntDesign name="pausecircle" size={40} color="#800000" />

        }
       </Pressable>
       <Pressable onPress={()=>navigation.navigate('listRecordings')}>
        <Entypo name="list" size={40} color="black" style={{}}/>
       </Pressable>
        
        </View>
      {/* <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems:'center',
    flexDirection:'column'
    
  },
});
