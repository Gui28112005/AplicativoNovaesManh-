// Imports
import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient 
import VoltarTela from "./VoltarTela"; // Import da seta de voltar tela

// Obtém as dimensões da tela
const { width, height } = Dimensions.get("window");

// Componente PerdaCarga
const PerdaCarga = ({ navigation }) => {
  // Estados para armazenar os valores dos campos e o resultado do cálculo
  const [comprimento, setComprimento] = React.useState("");
  const [diametro, setDiametro] = React.useState("");
  const [velocidade, setVelocidade] = React.useState("");
  const [perdaCarga, setPerdaCarga] = React.useState("");

  // Função para calcular a perda de carga
  const calcularPerdaCarga = () => {
    const L = parseFloat(comprimento);
    const D = parseFloat(diametro);
    const V = parseFloat(velocidade);

    // Verifica se todos os valores necessários foram inseridos
    if (isNaN(L) || isNaN(D) || isNaN(V) || D === 0) {
      setPerdaCarga("Por favor, insira todos os valores.");
      return;
    }

    const g = 9.81; // Aceleração devido à gravidade em m/s^2
    const f = 0.02; // Supondo um coeficiente de atrito típico para canos

    // Calcula a perda de carga
    const resultado = (f * (L / D) * V ** 2) / (2 * g);
    setPerdaCarga(`A perda de carga é: ${resultado.toFixed()} metros`);
  };

  // Função para limpar os campos
  const limparCampos = () => {
    setDiametro("");
    setComprimento("");
    setVelocidade("");
    setPerdaCarga("");
  };

  return (
    // Gradiente de fundo
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      {/* ScrollView para permitir a rolagem */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.navigation}>
          {/* Componente VoltarTela */}
          <VoltarTela onPress={() => navigation.goBack()} />
        </View>

        {/* Título principal */}
        <View style={styles.tituloPrincipal}>
          <Text style={styles.carga}>Perda de carga</Text>
        </View>

        <View style={styles.container}>
          {/* Inputs para os valores */}
          <Text style={styles.label}>Comprimento do cano (L):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              // multiline={true} // Permitir várias linhas
              placeholder="Digite o comprimento do cano (m)"
              keyboardType="numeric"
              value={comprimento}
              onChangeText={(text) => setComprimento(text)}
            />
          </View>

          <Text style={styles.label}>Diâmetro do cano (D):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              // multiline={true} // Permitir várias linhas
              placeholder="Digite o diâmetro do cano (m)"
              keyboardType="numeric"
              value={diametro}
              onChangeText={(text) => setDiametro(text)}
            />
          </View>

          <Text style={styles.label}>Velocidade do fluido (V):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              // multiline={true} // Permitir várias linhas
              placeholder="Digite a velocidade do fluido (m/s)"
              keyboardType="numeric"
              value={velocidade}
              onChangeText={(text) => setVelocidade(text)}
            />
          </View>

          {/* Botões para calcular e limpar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#53A176" }]}
              onPress={calcularPerdaCarga}
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
          <Text style={styles.result}>{perdaCarga}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Estilos CSS
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  navigation: {
    paddingTop: height * 0.25, 
    alignItems: "center",
  },
  container: {
    alignItems: "center", 
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  tituloPrincipal: {
    marginBottom: 30,
  },
  carga: {
    fontSize: width * 0.08,
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
    textAlign: 'center',
  },
  label: {
    fontSize: width * 0.055,
    marginBottom: height * 0.020, 
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: height * 0.08, 
    width: width * 0.9, 
    marginBottom: height * 0.02,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
    fontFamily: "Montserrat-Bold",
    alignSelf: 'center',
  },
  textInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: height * 0.04,
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
    width: width * 0.04,
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
});

// Exporta o componente PerdaCarga
export default PerdaCarga;
