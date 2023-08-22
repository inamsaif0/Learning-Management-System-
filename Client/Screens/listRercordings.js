import * as React from 'react';
import { StatusBar, Text, RefreshControl, ActivityIndicator, View, Pressable, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import AudioPlayer from '../Components/Audioplayer';
import { EmailContext } from '../Login';
import { UserContext } from '../App';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation,useIsFocused } from '@react-navigation/native';





export default function ListRecordings() {
    const email = React.useContext(UserContext);
    const navigation = useNavigation();
    const isFocused=useIsFocused();

    const [recordings, setRecordings] = React.useState([])
    const [active, setActive] = React.useState(false);
    const [urls, setUrls] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState()
    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await getAudio(email.userEmail)
        setRefreshing(false);

    }, []);


    const getActive = (index, isActive) => {

        setActive(isActive);
        console.log(active + "   audio player state")

    };

    async function getAudio(email) {
        try {
            setLoading(true)
            const response = await fetch(`https://0ae5-3-35-175-207.ngrok-free.app/audio?email=${email}`, { method: 'GET' })
                .then((response) => response.json())
                .then((data) => {
                    const result = data.map(filePath => {
                        const sections = filePath.split('/');
                        const lastSection = sections[sections.length - 1];
                        console.log(lastSection + "maaz")
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


    React.useEffect(() => {
        // clearAsyncStorage()
        //retrieveData()

        console.log(email.userEmail)
        getAudio(email.userEmail)



    }, [isFocused])

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
            <SafeAreaView style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, width: "95%" }}>
                <StatusBar style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#ECF0F1',
                }} />
                <Pressable onPress={() => navigation.navigate('recordings')}>
                    <AntDesign name="plus" size={30} color="#5c0931" />
                </Pressable>
                <Text style={{ fontSize: 25, padding: 15, fontWeight: 'bold' }}>
                    All Recordings
                </Text>
            </SafeAreaView>
            {
                !urls ? <Text style={{ textAlign: 'center', }}>
                    “Oops! No recording yet! Add your
                    recording now!”
                </Text> : null
            }

            <FlatList
                data={urls}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

