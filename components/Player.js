import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function Player(){
  return(
    <View style={styles.playerContainer}>
      <TouchableOpacity style={styles.playerBtn}><Ionicons name="play-back" size={35} color="white" /></TouchableOpacity>
      <TouchableOpacity style={styles.playerBtn}><Ionicons name="play-circle" size={35} color="white" /></TouchableOpacity>
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