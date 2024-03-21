import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VoltarTela from "./VoltarTela";

const Tela8 = ({ navigation }) => {
  const [radius, setRadius] = React.useState("");
  const [result, setResult] = React.useState(null);

  const calculateArea = () => {
    if (!isNaN(radius) && parseFloat(radius) >= 0) {
      const area = Math.PI * Math.pow(parseFloat(radius), 2);
      setResult(area.toFixed(2));
    } else {
      setResult("Erro: Insira um raio válido");
    }
  };

  const limparCampos = () => {
    setRadius("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <View style={styles.container}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <Text style={styles.title}>Calculadora de Área de Círculo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRadius(text)}
          value={radius}
          placeholder="Raio do Círculo"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#083C52" }]}
            onPress={calculateArea}
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
          <Text style={styles.result}>Área: {result} unidades quadradas</Text>
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
    borderRadius: 15,
    overflow: "hidden",
    // Adicione as propriedades de sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F3F3F3",
    borderWidth: 0, // Remova a borda
    // Adicione as propriedades de sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  space: {
    width: 50,
  },
  buttonText: {
    color: "#F3F3F3",
    // fontSize: 20
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Tela8;
