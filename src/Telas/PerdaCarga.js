import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions, // Importe Dimensions do react-native
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VoltarTela from "./VoltarTela";

const { width, height } = Dimensions.get("window"); // Obtenha as dimensões da tela

const PerdaCarga = ({ navigation }) => {
  const [comprimento, setComprimento] = React.useState("");
  const [diametro, setDiametro] = React.useState("");
  const [velocidade, setVelocidade] = React.useState("");
  const [perdaCarga, setPerdaCarga] = React.useState("");

  const calcularPerdaCarga = () => {
    const L = parseFloat(comprimento);
    const D = parseFloat(diametro);
    const V = parseFloat(velocidade);

    if (isNaN(L) || isNaN(D) || isNaN(V) || D === 0) {
      setPerdaCarga("Por favor, insira todos os valores.");
      return;
    }

    const g = 9.81; // Aceleração devido à gravidade em m/s^2
    const f = 0.02; // Supondo um coeficiente de atrito típico para canos

    const resultado = (f * (L / D) * V ** 2) / (2 * g);
    setPerdaCarga(`A perda de carga é: ${resultado.toFixed()} metros`);
  };

  const limparCampos = () => {
    setDiametro("");
    setComprimento("");
    setVelocidade("");
    setPerdaCarga("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.navigation}>
          <VoltarTela onPress={() => navigation.goBack()} />
        </View>

        <View style={styles.tituloPrincipal}>
            <Text style={styles.carga}>Perda de carga </Text> 

          </View>

        <View style={styles.container}>
          <Text style={styles.label}>Comprimento do cano (L):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              multiline={true} // Permitir várias linhas
              placeholder="Digite o comprimento do cano"
              keyboardType="numeric"
              value={comprimento}
              onChangeText={(text) => setComprimento(text)}
            />
          </View>

          <Text style={styles.label}>Diâmetro do cano (D):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              multiline={true} // Permitir várias linhas
              placeholder="Digite o diametro do cano"
              keyboardType="numeric"
              value={diametro}
              onChangeText={(text) => setDiametro(text)}
            />
          </View>

          <Text style={styles.label}>Velocidade do fluido (V):</Text>
          <View style={styles.textInput}>
            <TextInput
              style={[styles.input, { paddingHorizontal: width * 0.09 }]} // Ajuste do paddingHorizontal responsivo
              multiline={true} // Permitir várias linhas
              placeholder="Digite a velocidade do fluido"
              keyboardType="numeric"
              value={velocidade}
              onChangeText={(text) => setVelocidade(text)}
            />
          </View>

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

          <Text style={styles.result}>{perdaCarga}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    

  },
  scrollViewContent: {
    flexGrow: 1,
  },
  navigation: {
    paddingTop: height * 0.25, // Ajuste para manter a barra de navegação no topo responsivo
    alignItems: "center",
  },
  container: {
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  label: {
    fontSize: width * 0.055, // Ajuste do fontSize responsivo
    marginBottom: height * 0.020, // Ajuste do marginBottom responsivo
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: height * 0.08, // Ajuste da altura responsiva
    width: width * 0.9, // Largura ajustada para 80% da largura da tela
    marginBottom: height * 0.02, // Ajuste do marginBottom responsivo
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 21,
    fontFamily: "Montserrat-Bold",
    alignSelf: 'center', // Centraliza o TextInput na horizontal
},

  textInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05, // Ajuste do paddingHorizontal responsivo
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginBottom: height * 0.04, // Ajuste do marginBottom responsivo
    

  
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
    width: width * 0.04, // Ajuste do width responsivo
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  carga: {
    fontSize: width * 0.08, // 5% da largura da tela
    marginBottom: 30,
    fontFamily: "Montserrat-Bold",
    textAlign: 'center',
  }
});

export default PerdaCarga;