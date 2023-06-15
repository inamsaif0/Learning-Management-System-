import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable, Linking,ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import pdf from './assets/pdf.png';

export default function Listpdf() {
  const [docs, setDocs] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading,setIsloading]=useState(true)

  React.useEffect(() => {
    async function getDocs(email) {
      try {
        const response = await fetch(`http://192.168.1.4:3000/documents?email=${email}`, { method: 'GET' });
        const data = await response.json();
        setDocs(data);
        setIsloading(false)
      } catch (error) {
        console.log("Error getting documents", error);
      }
    }
    getDocs("inamsaif@gmail.com");
  }, []);

  function openWebView(url) {
    setSelectedItem(url);
  }
  

  function renderListItem({ item }) {
    return (
      <Pressable onPress={() => Linking.openURL(item.fileUrl)} style={styles.listItem}>
        <Image source={pdf} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.filename}</Text>
          <Text>{item.position}</Text>
        </View>
      </Pressable>
    );
  }

  if(isLoading){
    return(

      <View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator size={'large'} color={'#800000'}/>
    </View>
      )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={docs}
        renderItem={renderListItem}
        keyExtractor={(item) => item.filename}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#F7F7F7',
    marginTop: 20,
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
