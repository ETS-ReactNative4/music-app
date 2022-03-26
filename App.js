import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import Player from './components/Player';

export default function App() {
  const [audio, setAudio] = useState(null);
  const [songs, setSongs] = useState([
    {
      name: 'Shine on You Crazy',
      artists: 'Pink Floyd',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Killer Queen',
      artists: 'Queen',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
    {
      name: 'Stairway to Heaven',
      artists: 'Led Zeppelin',
      playing: false,
      file: require('./songs/music.mp3')
    },
  ]);

  const changeSong = async (id) => {
    let currentFile = null;
    let newSong = songs.filter((song, i) => {
      if(id === i){
        songs[i].playing = true;
        currentFile = songs[i].file;
      }else{
        songs[i].playing = false;
      }
      return songs[i];
    });
    if(audio != null){
      audio.unloadAsync();
    }
    let currentSong = new Audio.Sound();
    try{
      await currentSong.loadAsync(currentFile);
      await currentSong.playAsync();
    }catch(e){}
    setAudio(currentSong);
    setSongs(newSong);
  }

  return (
    <View style={{flex:1}}>
    <View style={styles.header}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 30}}>NightMusic</Text>
      </View>
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.tableText}>#</Text>
        <Text style={styles.tableText}>Música</Text>
        <Text style={styles.tableText}>Artista</Text>
      </View>
      <StatusBar hidden/>
      {
        songs.map((song, i) => {
          if(song.playing){
            return (
              <View key={song.name} style={styles.table}>
                <TouchableOpacity onPress={() => changeSong(i)} style={styles.tableSong}>
                <Text style={{
                  marginRight:10
                }}> <Ionicons name="md-pause" size={17} color="#6619ff" /></Text>
                  <Text style={styles.tableSongTextPlaying}>{song.name}</Text>
                  <Text style={styles.tableSongTextPlaying}> - </Text>
                  <Text style={styles.tableSongTextPlaying}>{song.artists}</Text>
                </TouchableOpacity>                 
              </View>
            )
          }else{
            return(
              <View  key={song.name} style={styles.table}>
              <TouchableOpacity onPress={() => changeSong(i)} style={styles.tableSong}>
                <Text style={{
                  marginRight:10
                }}><Ionicons name="md-play" size={17} color="white" /></Text>
                <Text style={styles.tableSongText}>{song.name}</Text>
                <Text style={styles.tableSongText}> - </Text>
                <Text style={styles.tableSongText}>{song.artists}</Text>
              </TouchableOpacity>
            </View>
            )
          }
        })
          
        }
    <View style={{paddingBottom: 200}}></View>
    </ScrollView>
    <Player/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  header: {
    backgroundColor: '#5500ff',
    width: '100%',
    padding: 20
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#111',
    borderBottomWidth: 2
  },
  tableText:{
    paddingLeft: 5,
    color: '#fff', 
    width: '33.3%',
    fontSize:17
  },
  tableSong: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  tableSongText:{
    paddingLeft: 5,
    color: '#fff', 
    fontSize:17
  },
  tableSongTextPlaying: {
    paddingLeft: 5,
    color: '#6619ff', 
    fontSize:17
  }
});
