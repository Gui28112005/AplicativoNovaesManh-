import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarTela from './VoltarTela'; // Importe o componente de voltar

const Tela7 = ({ navigation }) => {
  const [flowRate, setFlowRate] = React.useState('');
  const [velocity, setVelocity] = React.useState('');
  const [diameter, setDiameter] = React.useState('');
  const [result, setResult] = React.useState(null);

  const calculateDimension = () => {
    const calculatedResult =
      velocity === ''
        ? calculateDiameter(flowRate, Number(velocity))
        : calculateVelocity(Number(flowRate), Number(diameter));
    setResult(calculatedResult.toString());
  };

  const calculateVelocity = (flowRate, diameter) => {
    const area = Math.PI * (diameter / 2) ** 2;
    const velocity = flowRate / area;
    return velocity;
  };

  const limparCampos = () => {
    setFlowRate('');
    setDiameter('');
    setVelocity('');
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Dimensionamento de Tubo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFlowRate(text)}
          value={flowRate}
          placeholder="Taxa de Fluxo (m³/s)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setVelocity(text)}
          value={velocity}
          placeholder="Velocidade (m/s)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDiameter(text)}
          value={diameter}
          placeholder="Diâmetro do Tubo (m)"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#083C52' }]}
            onPress={calculateDimension}
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

        {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15, // Adjust as needed
    overflow: 'hidden', // Ensure gradient does not overflow border
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});

export default Tela7;
