import * as React from 'react';
import { Text, SafeAreaView,ActivityIndicator,View } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import AudioPlayer from '../Components/Audioplayer';
import { EmailContext } from '../Login';
import { UserContext } from '../App';




export default function ListRecordings() {
    const email = React.useContext(UserContext);

    const [recordings, setRecordings] = React.useState([])
    const [active, setActive] = React.useState({});
    const [urls,setUrls]=React.useState();
    const [loading,setLoading]=React.useState(true);
    const [user,setUser]=React.useState()



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
        //retrieveData()
        async function getAudio(email) {
            try {
                const response = await fetch(`http://192.168.1.4:3000/audio?email=${email}`, { method: 'GET' })
                    .then((response) => response.json())
                    .then((data)=>{
                        const result = data.map(filePath => {
                            const sections = filePath.split('/');
                            const lastSection = sections[sections.length - 1];
                            return {
                              lastSection,
                              url: `https://otp-mobile.s3.amazonaws.com/${filePath}`
                            };
                          });
                          setUrls(result)
                    })
                    .then(()=>setLoading(false))
                    .catch((error) => console.error('Error retrieving audio files:', error));      
            }
            catch (error) {
                console.error('Error getting audio from server:', error);
            }
            const id=await AsyncStorage.getItem('userId').then((userid)=>setUser(userid))


        }
        console.log(email.userEmail)
        getAudio(email.userEmail)

        
        
           }, [])

           if(loading){
            return(
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    
                <ActivityIndicator size="large" color="#5c0931" />
                </View>
            )
           }


    return (
        <>
        {/* //<SafeAreaView style={{ backgroundColor: "#F5F2F0", paddingTop: 10 }}> */}
            <Text style={{ fontSize: 45, padding: 15, fontWeight: 'bold' }}>
                All Recordings
            </Text>
            <FlatList
                data={urls.reverse()}
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

