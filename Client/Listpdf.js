import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable, Linking, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import pdf from './assets/pdf.png';
import { UserContext } from './App';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'native-base';
export default function Listpdf() {
  const email = React.useContext(UserContext);

  const [docs, setDocs] = useState(null);
  const [selectedItemUrl, setSelectedItemUrl] = useState(null);
  const [notPdf, setNonPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [arrow,setArrow]=useState()

  const toggleSort = () => {
    setDocs([...docs].reverse());
    setArrow(prevState => !prevState); 
  };


  React.useEffect(() => {
    async function getDocs(email) {
      try {
        const response = await fetch(`https://d7a5-3-35-175-207.ngrok-free.app/documents?email=${email}`, { method: 'GET' })
          .then((response) => response.json())
          .then((data) => setDocs(data))
          .then(() => setIsLoading(false))
          .catch((error) => console.error('Error retrieving doc files:', error));
      } catch (error) {
        console.log("Error getting documents", error);
      }
    }
    getDocs(email.userEmail);
  }, []);

  const openModal = (itemUrl) => {
    setSelectedItemUrl(itemUrl);
    setModalVisible(true);

  };

  const closeModal = () => {
    setSelectedItemUrl(null);
    setModalVisible(false);
    console.log('closing modal')
  };

  function renderListItem({ item }) {
    if (!item.filename.split('.').pop() === "pdf") {
      setNonPdf(true);
    }


    return (
      <View>
        <Pressable onPress={() => {
          !notPdf ? openModal("http://docs.google.com/gview?embedded=true&url="+item.fileUrl) : Linking.openURL(item.fileUrl);
          console.log(item.fileUrl);
        }} style={styles.listItem}>
          <Image source={pdf} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.filename}</Text>
            <Text>{item.position}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#5c0931'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>toggleSort()} style={{margin:10,backgroundColor:'#5c0931',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:10,padding:10}}>
        <Text style={{color:'white',fontWeight:600,}}>
          Sort By Date
        </Text>
        {
          arrow?(<AntDesign name="up" size={24} color="white" />):(<AntDesign name="down" size={24} color="white" />)

        }
      </Pressable>
      <FlatList
        data={docs}
        renderItem={renderListItem}
        keyExtractor={(item) => item.filename}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>closeModal()}
      >
        <Pressable style={{ padding: 20,marginTop:20,zIndex:2, alignItems: "flex-end" }} onPress={()=>closeModal()}>
          <AntDesign name="closecircle" size={24} color="black" />
        </Pressable>
        {modalVisible && (
          <WebView
            javaScriptEnabled={true}
            source={{ uri: selectedItemUrl }}
            style={{ flex: 1 }}
            onError={(error) => console.log(error)}
            renderLoading={() => <ActivityIndicator style={{ flex: 1,zIndex:3 }} size="large" color="#5c0931" />}
          />
        )}
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0.88,
    backgroundColor: '#F7F7F7',
    // marginTop: 20,
    borderRadius: 10,
  
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  }
});
