import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native"; // Importe useNavigation
import VoltarTela from "./VoltarTela";

const VelocidadeDaTubulacao = () => {
  const navigation = useNavigation(); // Obtenha a função de navegação

  const [diametro, setDiametro] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [velocidade, setVelocidade] = useState("");

  const calcularVelocidade = () => {
    const d = parseFloat(diametro);
    const q = parseFloat(fluxo);

    if (isNaN(d) || isNaN(q) || d === 0) {
      setVelocidade("Por favor, insira todos os valores corretamente.");
      return;
    }

    const raio = d / 2;
    const area = Math.PI * Math.pow(raio, 2);
    const velocidadeCalculada = q / area;
    setVelocidade(`A velocidade é: ${velocidadeCalculada.toFixed(2)} m/s`);
  };

  const limparCampos = () => {
    setDiametro("");
    setFluxo("");
    setVelocidade("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <View style={styles.tituloPrincipal}>
            <Text style={styles.velocidade}>Cálculo de Velocidade da Tubulação</Text>
          </View>

          <Text style={styles.label}>Diâmetro (D):</Text>
          <TextInput
            style={[styles.input, { paddingHorizontal: Dimensions.get("window").width * 0.05 }]}
            placeholder="Digite o diâmetro (em metros)"
            keyboardType="numeric"
            value={diametro}
            onChangeText={(text) => setDiametro(text)}
          />

          <Text style={styles.label}>Fluxo (Q):</Text>
          <TextInput
            style={[styles.input, { paddingHorizontal: Dimensions.get("window").width * 0.05 }]}
            placeholder="Digite o fluxo (em metros cúbicos por segundo)"
            keyboardType="numeric"
            value={fluxo}
            onChangeText={(text) => setFluxo(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#53A176" }]}
              onPress={calcularVelocidade}
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

          <Text style={styles.result}>{velocidade}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: Dimensions.get("window").width * 0.06,
    marginBottom: Dimensions.get("window").width * 0.03,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: Dimensions.get("window").width * 0.15,
    width: "100%",
    marginBottom: Dimensions.get("window").width * 0.1,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: Dimensions.get("window").width * 0.05,
  },
  button: {
    flex: 1,
    height: Dimensions.get("window").width * 0.1,
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
  space: {
    width: Dimensions.get("window").width * 0.05,
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  velocidade: {
    fontSize: width * 0.08, // 5% da largura da tela
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
  },
});

export default VelocidadeDaTubulacao;
