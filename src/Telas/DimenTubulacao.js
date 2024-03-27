import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarTela from './VoltarTela';

const DimenTubulacao = ({ navigation }) => {
  const [flowRate, setFlowRate] = React.useState('');
  const [velocity, setVelocity] = React.useState('');
  const [diameter, setDiameter] = React.useState('');
  const [result, setResult] = React.useState(null);

  const calculateDimension = () => {
    if (!flowRate || !velocity || !diameter) {
      setResult('Por favor, insira todos os valores.');
      return;
    }

    const calculatedResult = calculateVelocity(
      Number(flowRate),
      Number(diameter)
    );
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
    setResult('');
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <Text style={styles.title}>Dimensionamento</Text>
          <Text style={styles.titleTubo}>de Tubulação</Text>
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
              style={[styles.button, { backgroundColor: '#53A176' }]}
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

          {result !== null && result !== '' && (
            <Text style={styles.result}>Resultado: {result}</Text>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window'); // Obtenha as dimensões da tela

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  title: {
    fontSize: width * 0.08, // 5% da largura da tela
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
  },
  titleTubo: {
    fontSize: width * 0.08, // 5% da largura da tela
    marginBottom: 50,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    height: windowHeight * 0.08,
    width: '100%',
    marginBottom: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#F3F3F3',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 21,
    fontFamily: 'Montserrat-Bold',
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: windowHeight * 0.02,
  },
  button: {
    flex: 1,
    height: Dimensions.get('window').width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  space: {
    width: windowWidth * 0.05,
  },
});

export default DimenTubulacao;