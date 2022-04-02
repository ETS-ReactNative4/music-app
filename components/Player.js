import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; 

export default function Player({
  playing, 
  setPlaying,
  setCurrentAudio,
  currentAudio,
  songs,
  setSongs,
  audio,
  setAudio
}){

  const handlePlay = async ()=> {
    let currentFile = songs[currentAudio].file;

    let newSong = songs.filter((song, i) => {
      if(currentAudio === i){
        songs[i].playing = true;
        currentFile = songs[i].file;
      }else{
        songs[i].playing = false;
      }
      return songs[i];
    });

    try{
      if(audio != null){
        setPlaying(true);
        setSongs(newSong);
        await audio.playAsync();
      }else{
        let currentAudio = new Audio.Sound();
        try{
          await currentAudio.loadAsync(currentAudio);
          await currentAudio.playAsync();
        }catch(err){}
        setAudio(currentAudio);
        setSongs(newSong);
        setPlaying(true);
      }
    }catch(err){}
    
  }
  
  const handlePause = async ()=> {
    if(audio != null){
      audio.pauseAsync();
    }
    setPlaying(false);
  }

  const handleBack = async ()=> {
    let newAudio = currentAudio - 1;
    if(newAudio < 0){
      newAudio = songs.length - 1;
    }
    let currentFile = songs[newAudio].file;
    setCurrentAudio(newAudio);
    
    let newSong = songs.filter((song, i) => {
      if(newAudio === i){
        songs[i].playing = true;
        currentFile = songs[i].file;
      }else{
        songs[i].playing = false;
      }
      return songs[i];
    });

    try{
      if(audio != null){
        await audio.unloadAsync();
      }
        let currentAudio = new Audio.Sound();
        try{
          await currentAudio.loadAsync(currentFile);
          await currentAudio.playAsync();
        }catch(err){}
        setAudio(currentAudio);
        setSongs(newSong);
        setPlaying(true);
    }catch(err){}
  }

  const handleNext = async ()=> {
    let newAudio = currentAudio + 1;
    if(newAudio >= songs.length){
      newAudio = 0;
    }
    let currentFile = songs[newAudio].file;
    setCurrentAudio(newAudio);
    
    let newSong = songs.filter((song, i) => {
      if(newAudio === i){
        songs[i].playing = true;
        currentFile = songs[i].file;
      }else{
        songs[i].playing = false;
      }
      return songs[i];
    });

    try{
      if(audio != null){
        await audio.unloadAsync();
      }
        let currentAudio = new Audio.Sound();
        try{
          await currentAudio.loadAsync(currentFile);
          await currentAudio.playAsync();
        }catch(err){}
        setAudio(currentAudio);
        setSongs(newSong);
        setPlaying(true);
    }catch(err){}
  }

  return(
    <View style={styles.playerContainer}>
      <TouchableOpacity onPress={()=> handleBack()} style={styles.playerBtn}><Ionicons name="play-back" size={45} color="white" /></TouchableOpacity>
      {
      (!playing)?
      <TouchableOpacity onPress={() => handlePlay()} style={styles.playerBtn}><Ionicons name="play-circle" size={45} color="white" /></TouchableOpacity>
      :
      <TouchableOpacity onPress={() => handlePause()} style={styles.playerBtn}><Ionicons name="pause-circle" size={45} color="white" /></TouchableOpacity>
      }
      <TouchableOpacity onPress={()=> handleNext()} style={styles.playerBtn}><Ionicons name="play-forward" size={45} color="white" /></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  playerBtn: {
    marginRight: 20,
    marginLeft: 20
  }
});