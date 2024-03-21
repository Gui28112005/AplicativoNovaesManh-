import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarTela from './VoltarTela';

const Tela4 = ({ navigation }) => {
  const [comprimento, setComprimento] = React.useState('');
  const [diametro, setDiametro] = React.useState('');
  const [velocidade, setVelocidade] = React.useState('');
  const [perdaCarga, setPerdaCarga] = React.useState('');

  const calcularPerdaCarga = () => {
    const L = parseFloat(comprimento);
    const D = parseFloat(diametro);
    const V = parseFloat(velocidade);

    if (isNaN(L) || isNaN(D) || isNaN(V) || D === 0) {
      setPerdaCarga('Erro: Valores inválidos.');
      return;
    }

    const g = 9.81; // Aceleração devido à gravidade em m/s^2
    const f = 0.02; // Supondo um coeficiente de atrito típico para canos

    const resultado = (f * (L / D) * V ** 2) / (2 * g);
    setPerdaCarga(`A perda de carga é: ${resultado.toFixed(2)} metros`);
  };

  const limparCampos = () => {
    setDiametro('');
    setComprimento('');
    setVelocidade('');
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <Text style={styles.label}>Comprimento do cano (L):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o comprimento do cano"
          keyboardType="numeric"
          value={comprimento}
          onChangeText={(text) => setComprimento(text)}
        />

        <Text style={styles.label}>Diâmetro do cano (D):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o diâmetro do cano"
          keyboardType="numeric"
          value={diametro}
          onChangeText={(text) => setDiametro(text)}
        />

        <Text style={styles.label}>Velocidade do fluido (V):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a velocidade do fluido"
          keyboardType="numeric"
          value={velocidade}
          onChangeText={(text) => setVelocidade(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#083C52' }]}
            onPress={calcularPerdaCarga}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF0000' }]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>{perdaCarga}</Text>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
  },
  space: {
    width: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Tela4;
