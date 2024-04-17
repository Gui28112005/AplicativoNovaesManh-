import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons"; // Importação do ícone
import VoltarTela from "./VoltarTela";
import { StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const PerdaCargaContinua = ({ navigation }) => {
  const [vazao, setVazao] = useState("");
  const [confRugosidade, setConfRugosidade] = useState("");
  const [diametro, setDiametro] = useState("");
  const [comprimentoTubulacao, setComprimentoTubulacao] = useState("");
  const [result, setResult] = useState("");
  const [selectedLossType, setSelectedLossType] = useState("continua");
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const calcularPerdaCarga = () => {
    // Verifica se todos os campos foram preenchidos
    if (!vazao || !confRugosidade || !diametro || !comprimentoTubulacao) {
      setResult("Por favor, insira todos os valores.");
      return;
    }

    // Convertendo valores para números e formatando
    const Q = parseFloat(vazao.replace(",", "."));
    const D = parseFloat(diametro.replace(",", "."));
    const C = parseFloat(confRugosidade.replace(",", "."));
    const L = parseFloat(comprimentoTubulacao.replace(",", "."));

    // Verifica se os valores convertidos são válidos
    if (isNaN(Q) || isNaN(D) || isNaN(C) || isNaN(L)) {
      setResult("Valores de entrada inválidos.");
    } else {
      let hf = (((10.643 / C ** 1.852) * Q ** 1.852) / (D / 1000) ** 4.87) * L;
      const formattedHf = hf
        .toString()
        .slice(0, hf.toString().indexOf(".") + 3);
      setResult("Perda de Carga Continua: " + formattedHf + " m");
    }
  };

  const limparCampos = () => {
    setVazao("");
    setConfRugosidade("");
    setDiametro("");
    setComprimentoTubulacao("");
    setResult("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <VoltarTela onPress={() => navigation.goBack()} />

      <TouchableOpacity
        style={[styles.infoButton, styles.infoButtonTop]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="info" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.infoButton, styles.infoButtonTop]} // Adicionei o estilo infoButtonTop
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="info" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.container}>
        <StatusBar backgroundColor="#007B8F" barStyle="light-content" />

        <Text style={styles.title}>Cálculo de Perda de Carga</Text>

        <TouchableOpacity
          style={[styles.infoButton, styles.infoButtonTop]} // Adicionei o estilo infoButtonTop
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="info" size={30} color="white" />
        </TouchableOpacity>

        <Picker
          selectedValue={selectedLossType}
          style={[styles.input, styles.shadow]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLossType(itemValue);
            if (itemValue === "localizada") {
              navigation.navigate("PerdaCargaLocalizada"); // Navega para a tela PerdaCargaLocalizada
            }
          }}
        >
          <Picker.Item label="Perda de Carga Contínua" value="continua" />
          <Picker.Item label="Perda de Carga Localizada" value="localizada" />
        </Picker>

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setVazao(text)}
          value={vazao}
          placeholder="Vazão (m³/s)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setConfRugosidade(text)}
          value={confRugosidade}
          placeholder="Coeficiente de Rugosidade (C)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setDiametro(text)}
          value={diametro}
          placeholder="Diâmetro (m)"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setComprimentoTubulacao(text)}
          value={comprimentoTubulacao}
          placeholder="Comprimento da Tubulação (m)"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#53A176", width: "45%" },
            ]}
            onPress={calcularPerdaCarga}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#FF0000", width: "45%" },
            ]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>{result}</Text>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              O cálculo de perda de carga contínua é essencial na engenharia
              hidráulica para dimensionar tubulações, otimizar o desempenho do
              sistema, facilitar a manutenção, garantir a segurança e reduzir
              custos operacionais. Ele permite prever e controlar as perdas de
              pressão ao longo do sistema, garantindo eficiência, confiabilidade
              e segurança em todas as fases do ciclo de vida do sistema de
              tubulação.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    marginTop: 50,
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginBottom: height * 0.03,
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
  infoButtonTop: {
    position: "absolute",
    top: 45, // ou qualquer valor que desejar
    right: 20, // ou qualquer valor que desejar
    zIndex: 1, // Para garantir que fique acima dos outros elementos
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  space: {
    width: width * 0.04,
  },
  infoButtonTop: {
    position: "absolute",
    top: 45, // ou qualquer valor que desejar
    right: 20, // ou qualquer valor que desejar
    zIndex: 1, // Para garantir que fique acima dos outros elementos
  },
});

export default PerdaCargaContinua;
