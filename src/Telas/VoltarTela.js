import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VoltarTela = ({ onPress }) => (
  <View style={styles.barraFixa}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="arrow-back" size={30} color="white"  />
      <Text style={styles.text}> Voltar</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  barraFixa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007B8F', // Cor de fundo da barra
    height: 80, // Altura da barra
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinhamento do conteúdo
    paddingTop: 20, // Padding para acomodar a barra de status do dispositivo
    paddingHorizontal: 15, // Padding horizontal para o conteúdo
    zIndex: 1, // Z-index para garantir que a barra fique acima do conteúdo
    borderBottomWidth: 1, // Adicionando uma borda inferior
    borderBottomColor: '#E5E5E5', // Cor da borda inferior
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10, // Espaçamento entre o ícone e o texto
  },
});

export default VoltarTela;
