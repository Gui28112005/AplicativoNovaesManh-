import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VoltarTela = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Ionicons name="arrow-back" size={30} color="#083C52" />
    <Text style={styles.text}> Voltar</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: -15,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#083C52',
  },
});

export default VoltarTela;
