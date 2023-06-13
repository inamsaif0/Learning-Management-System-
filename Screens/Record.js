import * as React from 'react';
import { Text, View, StyleSheet, Animated, Pressable, Easing } from 'react-native';
import { Audio } from 'expo-av';
import Timer from '../Components/Timer';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import Stopwatch from '../Components/stopwatch';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Record() {
    const navigation = useNavigation()
    const [recording, setRecording] = useState();
    const [pause, setPause] = useState();
    const [location, setLocation] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const cancelRecording = async () => {

        if (recording) {
            scaleAnimation.stop()
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            setRecording(null);
        }

    };




    async function startRecording() {
        try {
            scaleAnimation.start()
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        scaleAnimation.stop()
        console.log('Stopping recording..');
        setRecording(undefined);
        setPause(false)
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setLocation(uri)
        console.log('Recording stopped and stored at', uri);
    }

    async function pauseRecording() {
        if (recording) {
            try {
                scaleAnimation.stop()
                const status = await recording.getStatusAsync();
                if (status.isRecording) {
                    await recording.pauseAsync();
                    setPause(true);
                }
            } catch (error) {
                console.error('Error pausing recording:', error);
            }
        }
    }

    async function resumeRecording() {
        if (recording) {
            try {
                scaleAnimation.start()
                const status = await recording.getStatusAsync();
                if (!status.isRecording) {
                    await recording.startAsync();
                    setPause(false);
                }
            } catch (error) {
                console.error('Error resuming recording:', error);
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
            existingArray.push({ title: currentDateTime, audio: newValue });
            await AsyncStorage.setItem('RECORDING', JSON.stringify(existingArray));
            console.log('Value appended successfully.');
        } catch (error) {
            console.error('Error appending value in AsyncStorage:', error);
        }
    };

    React.useEffect(() => {
        if (location !== "") {
            appendValue(location)
        }
    }, [location])

    const scaleValue = React.useRef(new Animated.Value(1)).current;
    const opacityValue = React.useRef(new Animated.Value(1)).current;



    const scaleAnimation = Animated.loop(
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.05,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(scaleValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
              }),
        
        
        ])
    );


    return (
        <View style={styles.container}>
            <Stopwatch start={recording} pause={pause} />
                <Animated.View style={{
                    transform: [{ scale: scaleValue }],
                }}>
            <Pressable onPress={recording ? stopRecording : startRecording} style={{ backgroundColor: '#800000', width: 200, height: 200, borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>

                    {recording ?
                        <Entypo name="controller-stop" size={44} color="white" /> :
                        <Text style={{ color: 'white', fontSize: 30 }}>
                            RECORD
                        </Text>}
            </Pressable>
                </Animated.View>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-around", alignItems: "center", width: "95%", height: 70, borderRadius: '20', position: 'absolute', bottom: 140 }}>
                <Pressable onPress={pause ? resumeRecording : pauseRecording}>
                    {pause ?
                        <AntDesign name="play" size={40} color="#800000" /> :
                        <AntDesign name="pausecircle" size={40} color="#800000" />

                    }
                </Pressable>
                {
                    recording && (<Pressable onPress={() => cancelRecording()}>
                        <AntDesign name="closecircle" size={40} color="red" />
                    </Pressable>)
                }
                <Pressable onPress={() => navigation.navigate('listRecordings')}>
                    <Entypo name="list" size={40} color="black" style={{}} />
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
        alignItems: 'center',
        flexDirection: 'column'

    },
});
