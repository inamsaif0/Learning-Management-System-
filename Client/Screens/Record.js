import * as React from 'react';
import { Text, View, StyleSheet, Animated, Pressable, Easing } from 'react-native';
import { Audio } from 'expo-av';
import Timer from '../Components/Timer';
import { AntDesign } from '@expo/vector-icons';
import { useState, useContext } from 'react'
import { Entypo } from '@expo/vector-icons';
import Stopwatch from '../Components/stopwatch';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { EmailContext } from '../Login';
import { UserContext } from '../App';
import { TextInput } from 'react-native';
import AudioPlayer from '../Components/Audioplayer';
// import * as Permissions from 'expo-permissions';



const sendAudioToServer = async (location, email, fileName) => {
    try {
        // Read the audio file as binary data
        const audioData = await FileSystem.readAsStringAsync(location, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const time = new Date()

        // Send the audio file to the Node.js server
        const response = await fetch('https://d7a5-3-35-175-207.ngrok-free.app/audio', {
            method: 'POST',
            body: JSON.stringify({ audio: audioData, time: time, email: email, name: fileName }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error sending audio to server:', error);
    }
};



export default function Record() {
    const email = useContext(UserContext);

    const [fadeInOutAnim] = useState(new Animated.Value(0));


    const navigation = useNavigation()

    const [recording, setRecording] = useState();
    const [fileName, setFileName] = useState('');
    const [pause, setPause] = useState();
    const [location, setLocation] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [clear, setClear] = useState(false)
    const [showNotification, setShowNotification] = useState(false);




    const fadeIn = () => {
        Animated.timing(fadeInOutAnim, {
            toValue: 1,
            duration: 500, // Fade in duration (adjust as needed)
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeInOutAnim, {
            toValue: 0,
            duration: 500, // Fade out duration (adjust as needed)
            useNativeDriver: true,
        }).start(() => {
            setShowNotification(false);
        });
    };

    React.useEffect(() => {
        if (showNotification) {
            fadeIn();
            setTimeout(fadeOut, 2000); // Fade out after 2 seconds (adjust as needed)
        }
    }, [showNotification]);

    const cancelRecording = async () => {

        if (recording) {
            scaleAnimation.stop()
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            setRecording(null);
        }
        setLocation("")
        setClear(!clear)
        setFileName("")

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
        try {

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
        }
        catch (error) {
            console.error(error)
        }
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
    // this is to append the recording in async storage so we can retrive it in future
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

    function handleUpload() {
        sendAudioToServer(location, email.userEmail, fileName)
        cancelRecording()
        setShowNotification(true);
    }

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
        <View style={styles.Parent}>
            <View style={{ width: "100%" }}>

                {


                    location && <AudioPlayer audioFile={location} />
                }
            </View>

            <View style={styles.container}>
                <TextInput
                    style={{

                        margin: 0,
                        padding: 5,
                        width: "90%",
                        borderBottomColor: '#5c0931',
                        borderBottomWidth: 2,

                    }}
                    onChangeText={setFileName}
                    value={fileName}
                    placeholder='Enter Filename'
                />

                <Stopwatch start={recording} clear={clear} pause={pause} />
                <Animated.View style={{
                    transform: [{ scale: scaleValue }],
                }}>
                    <Pressable onPress={recording ? stopRecording : startRecording} style={{ backgroundColor: '#5c0931', width: 200, height: 200, borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>

                        {recording ?
                            <Entypo name="controller-stop" size={44} color="white" /> :
                            <Text style={{ color: 'white', fontSize: 30 }}>
                                RECORD
                            </Text>}
                    </Pressable>
                </Animated.View>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-around", alignItems: "center", width: "95%", height: 70, borderRadius: 20 }}>
                    <Pressable onPress={() => handleUpload()} disabled={location === ""}>
                        <Entypo name="check" size={40} color="#5c0931" />
                    </Pressable>
                    <Pressable onPress={pause ? resumeRecording : pauseRecording}>
                        {pause ?
                            <AntDesign name="play" size={40} color="black" /> :
                            <AntDesign name="pausecircle" size={40} color="black" />

                        }
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('listRecordings')}>
                        <Entypo name="list" size={40} color="black" style={{}} />
                    </Pressable>

                    <Pressable onPress={() => cancelRecording()}>
                        <Entypo name="cross" size={40} color="#5c0931" style={{}} />
                    </Pressable>
                </View>
                {/* <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
    /> */}
            </View>
            {showNotification && (
               <Animated.View
               style={[
                 styles.notificationContainer,
                 {
                   opacity: fadeInOutAnim,
                 },
               ]}
             >
                    <AntDesign name="checkcircleo" size={50} color="green" />
                    <Text>Upload Complete!</Text>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20

    },
    Parent: {
        flex: 1,
        backgroundColor: '#ecf0f1',


    },
    notificationContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        width: "80%", // Adjust the width as needed
        alignSelf: 'center',
        top: "40%",
      },
});
