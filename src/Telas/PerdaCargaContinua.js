// Imports
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importação do gradiente linear
import VoltarTela from "./VoltarTela"; // Componente de voltar tela

// Componente CalculoDarcy
const PerdaCargaContinua = ({ navigation }) => {
  // Armazenar os valores dos campos e o resultado do cálculo
  const [flowRate, setFlowRate] = React.useState("");
  const [pipeDiameter, setPipeDiameter] = React.useState("");
  const [pipeLength, setPipeLength] = React.useState("");
  const [viscosity, setViscosity] = React.useState("");
  const [density, setDensity] = React.useState("");
  const [result, setResult] = React.useState("");

  // Função para calcular o número de Reynolds
  const calculateDarcy = () => {
    // Cálculos dos parâmetros necessários
    const flowArea = Math.PI * Math.pow(pipeDiameter / 2, 2);
    const velocity = flowRate / flowArea;
    const reynoldsNumber = (velocity * pipeDiameter * density) / viscosity;

    // Verifica se todos os campos foram preenchidos
    if (!flowRate || !pipeDiameter || !pipeLength ||!viscosity || !density) {
      setResult('Por favor, insira todos os valores.');
      return;
    }

    // Define o resultado calculado
    const calculatedResult = reynoldsNumber.toString();
    setResult(calculatedResult);
  };

  // Função para limpar os campos
  const limparCampos = () => {
    setFlowRate("");
    setPipeDiameter("");
    setPipeLength("");
    setViscosity("");
    setDensity("");
    setResult("");
  };

  return (
    // Gradiente de fundo
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      {/* ScrollView para permitir a rolagem */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Componente VoltarTela */}
          <VoltarTela onPress={() => navigation.goBack()} />

          {/* Título */}
          <Text style={styles.title}>Cálculo de Darcy</Text>

          {/* Inputs para os valores */}
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setFlowRate(text)}
            value={flowRate}
            placeholder="Taxa de Fluxo (m³/s)"
            keyboardType="numeric"
          />

          {/* Inputs para os valores */}
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setPipeDiameter(text)}
            value={pipeDiameter}
            placeholder="Diâmetro do Tubo (m)"
            keyboardType="numeric"
          />

          {/* Inputs para os valores */}
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setPipeLength(text)}
            value={pipeLength}
            placeholder="Comprimento do Tubo (m)"
            keyboardType="numeric"
          />

          {/* Inputs para os valores */}
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setViscosity(text)}
            value={viscosity}
            placeholder="Viscosidade (Pa.s)"
            keyboardType="numeric"
          />

          {/* Inputs para os valores */}
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setDensity(text)}
            value={density}
            placeholder="Densidade (kg/m³)"
            keyboardType="numeric"
          />

          {/* Botões para calcular e limpar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.shadow, { backgroundColor: "#53A176", width: '45%' }]}
              onPress={calculateDarcy}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <View style={styles.space} />

            <TouchableOpacity
              style={[styles.button, styles.shadow, { backgroundColor: "#FF0000", width: '45%' }]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {/* Exibe o resultado */}
          {result !== "" && (
            <Text style={styles.result}>Resultado: {result}</Text>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Obtém as dimensões da tela
const { width, height } = Dimensions.get("window");

// Estilos
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.14,
    borderRadius: 15,
  },
  title: {
    marginTop: height * 0.1,
    fontSize: width * 0.08,
    marginBottom: height * 0.03,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: height * 0.07,
    width: width * 0.9,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.04,
    backgroundColor: "#F3F3F3",
    borderRadius: 0,
    fontFamily: "Montserrat-Bold",
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.9,
    marginBottom: height * 0.03,
  },
  button: {
    flex: 1,
    height: Dimensions.get('window').width * 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    shadowColor: "#000",
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
    width: width * 0.02,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 21,
  },
});

// Exporta o componente CalculoDarcy
export default PerdaCargaContinua;
