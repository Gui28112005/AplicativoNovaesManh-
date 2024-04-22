import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VoltarTela = ({ onPress }) => (
  <View style={styles.barraFixa}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="arrow-back" size={30} color="white" />
      <StatusBar style="light" backgroundColor="#007B8F" />
      <Text style={styles.text}> Voltar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  barraFixa: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#007B8F',
    height: Platform.OS === 'ios' ? 100 : 90,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
});

export default VoltarTela;
