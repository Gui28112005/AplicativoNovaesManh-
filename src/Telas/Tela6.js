import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VoltarTela from "./VoltarTela"; // Importe o componente de voltar

const Tela6 = ({ navigation }) => {
  const [flowRate, setFlowRate] = React.useState("");
  const [pipeDiameter, setPipeDiameter] = React.useState("");
  const [pipeLength, setPipeLength] = React.useState("");
  const [viscosity, setViscosity] = React.useState("");
  const [density, setDensity] = React.useState("");
  const [result, setResult] = React.useState(null);

  const calculateDarcy = () => {
    const flowArea = Math.PI * Math.pow(pipeDiameter / 2, 2);
    const velocity = flowRate / flowArea;
    const reynoldsNumber = (velocity * pipeDiameter * density) / viscosity;

    const calculatedResult = reynoldsNumber.toString();
    setResult(calculatedResult);
  };

  const limparCampos = () => {
    setFlowRate("");
    setPipeDiameter("");
    setPipeLength("");
    setViscosity("");
    setDensity("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Cálculo de Darcy</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setFlowRate(text)}
          value={flowRate}
          placeholder="Taxa de Fluxo (m³/s)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setPipeDiameter(text)}
          value={pipeDiameter}
          placeholder="Diâmetro do Tubo (m)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setPipeLength(text)}
          value={pipeLength}
          placeholder="Comprimento do Tubo (m)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setViscosity(text)}
          value={viscosity}
          placeholder="Viscosidade (Pa.s)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setDensity(text)}
          value={density}
          placeholder="Densidade (kg/m³)"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#083C52" }]}
            onPress={calculateDarcy}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF0000" }]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <Text style={styles.result}>Resultado: {result}</Text>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  space: {
    width: 20,
  },
});

export default Tela6;
