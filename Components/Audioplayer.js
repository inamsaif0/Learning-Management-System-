import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AudioPlayer = ({ audioFile, title,getActive }) => {
  //const title="maaz"
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);

  useEffect(() => {
    console.log(audioFile)
    // Load the audio file when the component mounts
    loadAudio();

    // Clean up resources when the component unmounts
    return () => {
      unloadAudio();
    };
  }, []);

  useEffect(() => {
    // Update the playback position as audio plays
    const updatePlaybackPosition = (status) => {
      
      if (status.isLoaded && status.isPlaying) {
        setPlaybackPosition(status.positionMillis);
      }

      if (status.isLoaded && status.positionMillis === status.durationMillis) {
        setPlaybackPosition(0);
        setIsPlaying(!isPlaying);
      }
    };

    if (sound) {
      sound.setOnPlaybackStatusUpdate(updatePlaybackPosition);
    }
  }, [sound]);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioFile }, {}, updatePlaybackStatus);
      setSound(sound);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const unloadAudio = () => {
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
  };

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis);
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        // Check if the playback position is at the end
        const isAtEnd = playbackPosition === playbackDuration;
        
        // Reset the playback position to 0 if at the end
        const position = isAtEnd ? 0 : playbackPosition;
  
        // Update the position before playing
        await sound.setPositionAsync(position);
  
        // Play the audio
        await sound.playAsync();
        
        // Call getActive with the updated isPlaying value
        getActive(!isPlaying);
      }
      
      // Toggle the isPlaying state
      setIsPlaying(!isPlaying);
    }
  };
  


  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const forward=()=>{
    setPlaybackPosition((playbackPosition+5000)%playbackDuration)
  }
  const back=()=>{
    setPlaybackPosition((playbackPosition-5000)%playbackDuration)
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>


        <Text style={styles.title}>{title}</Text>

       
      </View>

      {isPlaying && (
        <View style={styles.playbackContainer}>

          <Slider
            value={playbackPosition}
            onValueChange={value => setPlaybackPosition(value)}
            maximumValue={playbackDuration}
            maximumTrackTintColor='gray'
            thumbTintColor='#800000'
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.playbackText}>
              {formatTime(playbackPosition)}
            </Text>
            <Text style={styles.playbackText}>
              {formatTime(playbackDuration)}
            </Text>


          </View>

        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
        <Pressable onPress={()=>back()}>
          <MaterialIcons name="replay-5" size={24} color="black" />

        </Pressable>
        {
          isPlaying ?
           (<Pressable onPress={togglePlayback}>   
            <AntDesign name="pause" size={34} color="#800000" />
           </Pressable>):
            (<Pressable onPress={togglePlayback}>
            <AntDesign name="play" size={34} color="#800000" />
            </Pressable>)   
          }
        <Pressable onPress={()=>forward()}>

          <MaterialIcons name="forward-5" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 20,
    padding: 15

  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playbackContainer: {
    marginTop: 10,

  },
  playbackText: {
    fontSize: 12,
    color: 'black'
  },
});

export default AudioPlayer;
