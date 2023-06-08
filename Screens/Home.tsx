import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';



const DATA = [
  {
    id:"1",
    title:"Difficult Quiz",
    numberOfQuestions:4,
    teacher:"Maaz",
    questions:{ },
    completed:true
  },
  {
    id:"2",
    title:"Midterm Quiz",
    numberOfQuestions:5,
    teacher:"Ammar",
    questions:{ },
    completed:true
  },
  {
    id:"3",
    title:"React Quiz",
    numberOfQuestions:7,
    teacher:"Furqan",
    questions:{ },
    completed:true
  },
  {
    id:"4",
    title:"Database Quiz",
    numberOfQuestions:4,
    teacher:"Anam",
    questions:{ },
    completed:false
  },
  {
    id:"5",
    title:".Net Quiz",
    numberOfQuestions:9,
    teacher:"Atif",
    questions:{ },
    completed:false
  },
  {
    id:"5",
    title:".Angular Quiz",
    numberOfQuestions:9,
    teacher:"Atif",
    questions:{ },
    completed:false
  },
];

type ItemProps = {title: string,navigation:any,numberOfQuestions:number,teacher:string,completed:boolean};

const Item = ({title,numberOfQuestions,teacher,navigation,completed}: ItemProps,) => (
    
    <Pressable style={styles.item} onPress={()=>navigation.navigate('Start')} disabled={!completed}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.sub}># Of Questions {numberOfQuestions}</Text>
    <Text style={styles.sub}>Uploaded By :{teacher}</Text>
    <Text style={styles.sub}>Time: 1 Hour</Text>
    {
        completed?

        <Ionicons style={styles.icon} name="md-play-circle" size={32} color="white" />:
        <Ionicons style={styles.icon} name="md-checkmark-circle" size={32} color="white" />

    }
  </Pressable>
    
);




export default function Home ({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} navigation={navigation} numberOfQuestions={item.numberOfQuestions} teacher={item.teacher} completed={item.completed} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%'
   
  },
  item: {
    borderRadius:20,
    padding:15,
    flex: 1,
    height:180,
    width:110,
    margin: 10,
    backgroundColor: '#800000',
    fontFamily:'geo-bold',
    shadowColor:'grey',
    shadowRadius:1,
    shadowOpacity:1
   
  },
  title: {
    fontSize: 20,
    color:'white',
    paddingBottom:30
  },
  sub:{
    color:'rgba(255,255,255,0.8)',
    fontSize:14
    
  },
  icon:{
    position:'absolute',
    bottom:10,
    right:10,
  }
});

