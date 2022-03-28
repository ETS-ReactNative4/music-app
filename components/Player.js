import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function Player({
  playing, 
  setPlaying,
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

  return(
    <View style={styles.playerContainer}>
      <TouchableOpacity style={styles.playerBtn}><Ionicons name="play-back" size={35} color="white" /></TouchableOpacity>
      {
      (!playing)?
      <TouchableOpacity onPress={() => handlePlay()} style={styles.playerBtn}><Ionicons name="play-circle" size={35} color="white" /></TouchableOpacity>
      :
      <TouchableOpacity onPress={() => handlePause()} style={styles.playerBtn}><Ionicons name="pause-circle" size={35} color="white" /></TouchableOpacity>
      }
      <TouchableOpacity style={styles.playerBtn}><Ionicons name="play-forward" size={35} color="white" /></TouchableOpacity>
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