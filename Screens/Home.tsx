import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';







type ItemProps = { id: string, title: string, navigation: any, numberOfQuestions: number, teacher: string, completed: boolean, updateCompleted: any };

const Item = ({ id, title, numberOfQuestions, teacher, navigation, completed, updateCompleted }: ItemProps,) => (

  <Pressable style={styles.item} onPress={() => navigation.navigate('Start', { updateCompleted: updateCompleted, id: id })} disabled={!completed}>
    <Text style={styles.title}>Hello</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.sub}># Of Questions {numberOfQuestions}</Text>
    <Text style={styles.sub}>Uploaded By :{teacher}</Text>
    <Text style={styles.sub}>Time: 1 Hour</Text>
    {
      completed ?

        <Ionicons style={styles.icon} name="md-play-circle" size={32} color="white" /> :
        <Ionicons style={styles.icon} name="md-checkmark-circle" size={32} color="white" />

    }
  </Pressable>

);




export default function Home({ navigation }) {

  const DATA = [
    {
      id: "1",
      pk: 1,
      title: "Beginner Quiz",
      numberOfQuestions: 10,
      teacher: "Joe",
      questions: {},
      completed: true
    },
    {
      id: "2",
      pk: 2,
      title: "Intermediate Quiz",
      numberOfQuestions: 10,
      teacher: "Hannah",
      questions: {},
      completed: true
    },
    {
      id: "3",
      pk: 3,
      title: "Intermediate  # 2",
      numberOfQuestions: 10,
      teacher: "Hannah",
      questions: {},
      completed: true
    },
    {
      id: "4",
      pk: 4,
      title: "Beginner Quiz #2",
      numberOfQuestions: 10,
      teacher: "Hannah",
      questions: {},
      completed: true
    },
    {
      id: "5",
      pk: 5,
      title: "Adjectives/Adverbs Quiz",
      numberOfQuestions: 10,
      teacher: "Hannah",
      questions: {},
      completed: true
    },
    {
      id: "6",
      pk: 6,
      title: "Adjectives/Adverbs Quiz",
      numberOfQuestions: 10,
      teacher: "Hannah",
      questions: {},
      completed: true
    },
    
    
  ];

  const [data, setData] = useState(DATA);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    storeData(data)
    retrieveData();
  }, []);


  const retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('DATA');
      setIsLoading(false);
      if (jsonValue !== null) {
        const parsedData = JSON.parse(jsonValue);
        setData(parsedData);
        console.log('data found')


      } else {
        setData(DATA)
        console.log('No DATA found.');
      }
    } catch (error) {
      console.log('Error retrieving DATA:', error);
    }
  };


  const updateCompleted = (id: string, value: boolean) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, completed: value };
      }
      return item;
    });

    setData(updatedData);
    storeData(updatedData);
  };

  const storeData = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('DATA', jsonValue);
      console.log('DATA stored successfully.');
    } catch (error) {
      console.log('Error storing DATA:', error);
    }
  };






  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item id={item.id} title={item.title} navigation={navigation} numberOfQuestions={item.numberOfQuestions} teacher={item.teacher} completed={item.completed} updateCompleted={updateCompleted} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'

  },
  item: {
    borderRadius: 20,
    padding: 15,
    flex: 1,
    height: 180,
    width: 110,
    margin: 10,
    backgroundColor: '#800000',
    shadowColor: 'grey',
    shadowRadius: 1,
    shadowOpacity: 1

  },
  title: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 10
  },
  sub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14

  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});

