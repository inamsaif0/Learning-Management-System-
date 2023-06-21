import * as React from 'react';
import { Text, SafeAreaView, ActivityIndicator, View, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import AudioPlayer from '../Components/Audioplayer';
import { EmailContext } from '../Login';
import { UserContext } from '../App';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';





export default function ListRecordings() {
    const email = React.useContext(UserContext);
    const navigation=useNavigation();

    const [recordings, setRecordings] = React.useState([])
    const [active, setActive] = React.useState(false);
    const [urls, setUrls] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState()



    const getActive = (index, isActive) => {

        setActive(isActive);
        console.log(active + "   audio player state")

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
        //retrieveData()
        async function getAudio(email) {
            try {
                const response = await fetch(`https://d7a5-3-35-175-207.ngrok-free.app/audio?email=${email}`, { method: 'GET' })
                    .then((response) => response.json())
                    .then((data) => {
                        const result = data.map(filePath => {
                            const sections = filePath.split('/');
                            const lastSection = sections[sections.length - 1];
                            console.log(lastSection +"maaz")
                            return {
                                lastSection,
                                url: `https://otp-mobile.s3.amazonaws.com/${filePath}`
                            };
                        });
                        setUrls(result)
                    })
                    .then(() => setLoading(false))
                    .catch((error) => console.error('Error retrieving audio files:', error));
            }
            catch (error) {
                console.error('Error getting audio from server:', error);
            }
            const id = await AsyncStorage.getItem('userId').then((userid) => setUser(userid))


        }
        console.log(email.userEmail)
        getAudio(email.userEmail)



    }, [])

    if (loading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                <ActivityIndicator size="large" color="#5c0931" />
            </View>
        )
    }


    return (
        <>
            {/* //<SafeAreaView style={{ backgroundColor: "#F5F2F0", paddingTop: 10 }}> */}
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, width: "95%" }}>
                <Pressable onPress={()=>navigation.navigate('recordings')}>
                    <AntDesign name="plus" size={30} color="#5c0931" />
                </Pressable>
                <Text style={{ fontSize: 25, padding: 15, fontWeight: 'bold' }}>
                    All Recordings
                </Text>
            </View>

            <FlatList
                data={urls}
                keyExtractor={(recording, index) => index.toString()}
                renderItem={({ item, index }) => (

                    <AudioPlayer
                        user={user}
                        title={item.lastSection}
                        audioFile={item.url}
                        getActive={(isActive) => getActive(index, isActive)}
                        index={index}
                        active={active}
                    />

                )}
            />

            {/* //</SafeAreaView> */}
        </>
    );
}

