// Imports
import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VoltarTela from "./VoltarTela";

// Componente Perimetro
const Perimetro = ({ navigation }) => {
  // Estados para armazenar o raio e o resultado do cálculo
  const [radius, setRadius] = React.useState("");
  const [result, setResult] = React.useState(null);

  // Função para calcular a área do círculo
  const calculateArea = () => {
    if (!isNaN(radius) && parseFloat(radius) >= 0) {
      const area = Math.PI * Math.pow(parseFloat(radius), 2);
      setResult(area.toFixed(2));
    } else {
      setResult('Por favor, insira um valor válido para o raio.');
    }
  };

  // Função para limpar os campos
  const limparCampos = () => {
    setRadius("");
    setResult(null);
  };

  return (
    // Gradiente de fundo
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      {/* ScrollView para permitir a rolagem */}
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Componente VoltarTela */}
          <VoltarTela onPress={() => navigation.goBack()} />

          {/* Título */}
          <Text style={styles.title}>Área do Círculo</Text>

          {/* Input para o raio */}
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: "10%" }]} // Ajuste do paddingHorizontal responsivo
              onChangeText={(text) => setRadius(text)}
              value={radius}
              placeholder="Raio do Círculo"
              keyboardType="numeric"
            />
          </View>

          {/* Botões para calcular e limpar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#53A176" }]}
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

          {/* Exibe o resultado */}
          {result !== null && (
            <Text style={styles.result}>
              Área: {result} unidades quadradas
            </Text>
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
  containerScrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  title: {
    fontSize: width * 0.08,
    marginBottom: 25,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: 0.15 * width,
    width: "95%",
    marginBottom: 10,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
    fontFamily: "Montserrat-Bold",
    alignSelf: "center",
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
    height: 0.10 * width,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    marginHorizontal: "2%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
  },
  space: {
    width: "2%",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

// Exporta o componente Perimetro
export default Perimetro;