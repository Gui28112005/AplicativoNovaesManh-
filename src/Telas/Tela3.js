import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarTela from './VoltarTela';

const Tela3 = ({ navigation }) => {
  const [quantidade, setQuantidade] = useState('');
  const [volume, setVolume] = useState('');
  const [vazao, setVazao] = useState('');

  const calcularVazao = () => {
    const q = parseFloat(quantidade);
    const v = parseFloat(volume);

    if (isNaN(q) || isNaN(v) || v === 0) {
      setVazao('Erro: Valores inválidos.');
      return;
    }

    const resultado = q / v;
    setVazao(`A vazão é: ${resultado}`);
  };

  const limparCampos = () => {
    setQuantidade('');
    setVolume('');
    setVazao('');
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <Text style={styles.label}>Quantidade (Q):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={text => setQuantidade(text)}
        />

        <Text style={styles.label}>Volume (V):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o volume"
          keyboardType="numeric"
          value={volume}
          onChangeText={text => setVolume(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#083C52' }]} onPress={calcularVazao}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={limparCampos}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>{vazao}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  gradient: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 40,
    paddingHorizontal: 120,
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  space: {
    width: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Tela3;
