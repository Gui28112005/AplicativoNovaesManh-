import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import VoltarTela from "./VoltarTela";

const { width, height } = Dimensions.get("window");

const PerdaCargaContinua = ({ navigation }) => {
  const [flowRate, setFlowRate] = useState("");
  const [result, setResult] = useState("");
  const [selectedLossType, setSelectedLossType] = useState("contínua");
  const [customK, setCustomK] = useState(""); 
  const [coefficient, setCoefficient] = useState(""); 
  const [diameter, setDiameter] = useState(""); 
  const [liters, setLiters] = useState(""); // Novo estado para os litros inseridos

  const calcularPerdaCarga = () => {
    // Verifica se todos os campos foram preenchidos
    if (!flowRate || !coefficient || !diameter || !liters) {
      setResult("Por favor, insira todos os valores.");
      return;
    }
  
    // Substitui vírgulas por pontos
    const flowRateFixed = flowRate.replace(',', '.');
    const coefficientFixed = coefficient.replace(',', '.');
    const diameterFixed = diameter.replace(',', '.');
  
    // Converte os valores para números
    const Q = parseFloat(flowRateFixed); 
    const D = parseFloat(diameterFixed); 
    const C = parseFloat(coefficientFixed);
    const L = parseFloat(liters); // Converte os litros para número
  
    // Verifica se os valores convertidos são válidos
    if (isNaN(Q) || isNaN(D) || isNaN(C) || isNaN(L)) {
      setResult("Valores de entrada inválidos.");
      return;
    }
  
    // Calcula a perda de carga
    let hf = 0;
    if (selectedLossType === "contínua") {
      hf = (10.674 * Math.pow(Q, 1.852)) / (Math.pow(C, 1.852) * Math.pow(D, 4.87)) * L / 1000;
    } else if (selectedLossType === "localizada") {
      const V = Q / (Math.PI * Math.pow(D / 2, 2)); 
      const finalK = customK !== "" ? parseFloat(customK) : 0.9; 
      hf = finalK * (Math.pow(V, 2) / (2 * 9.81)); 
    }
  
    // Define o resultado calculado
    const hfFixed = hf.toFixed(4);
    setResult("Perda de Carga: " + hfFixed.toString() + " m");

    // Calcula o volume perdido em litros
    const areaTransversal = Math.PI * Math.pow(D / 2, 2); 
    const volumePerdido = hf * areaTransversal * 1000; // Convertendo de metros cúbicos para litros
    setResult(result + "\nVolume Perdido: " + volumePerdido.toFixed(20) + " litross");
  };

  const limparCampos = () => {
    setFlowRate("");
    setCoefficient("");
    setDiameter("");
    setCustomK("");
    setLiters(""); // Limpa também o campo dos litros
    setResult("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Cálculo de Perda de Carga</Text>

        <Picker
          selectedValue={selectedLossType}
          style={[styles.input, styles.shadow]}
          onValueChange={(itemValue, itemIndex) => setSelectedLossType(itemValue)}
        >
          <Picker.Item label="Perda de Carga Contínua" value="contínua" />
          <Picker.Item label="Perda de Carga Localizada" value="localizada" />
        </Picker>

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setFlowRate(text)}
          value={flowRate}
          placeholder="Vazão (m³/s)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setCoefficient(text)}
          value={coefficient}
          placeholder="Coeficiente de Rugosidade (C)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setDiameter(text)}
          value={diameter}
          placeholder="Diâmetro (m)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setLiters(text)}
          value={liters}
          placeholder="Litros"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#53A176" }]}
            onPress={calcularPerdaCarga}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF0000" }]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>{result}</Text>
      </View>
    </LinearGradient>
  );
};
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
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: width * 0.45, // Ocupa 90% da largura da tela
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
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

export default PerdaCargaContinua;
