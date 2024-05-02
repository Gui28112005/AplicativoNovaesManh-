import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import VoltarTela from "./VoltarTela";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const PerdaCargaContinua = ({ navigation }) => {
  const [vazao, setVazao] = useState("");
  const [confRugosidade, setConfRugosidade] = useState("");
  const [diametro, setDiametro] = useState("");
  const [comprimentoTubulacao, setComprimentoTubulacao] = useState("");
  const [result, setResult] = useState("");
  const [selectedLossType, setSelectedLossType] = useState("continua");
  const confRugosidadeInputRef = useRef(null);
  const diametroInputRef = useRef(null);
  const comprimentoTubulacaoInputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedLossType("continua");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  useEffect(() => {
    salvarHistorico();
  }, [historico]);

  const calcularPerdaCarga = () => {
    if (!vazao || !confRugosidade || !diametro || !comprimentoTubulacao) {
      setResult("Por favor, insira todos os valores.");
      return;
    }

    const Q = parseFloat(vazao.replace(",", "."));
    const D = parseFloat(diametro.replace(",", "."));
    const C = parseFloat(confRugosidade.replace(",", "."));
    const L = parseFloat(comprimentoTubulacao.replace(",", "."));

    if (isNaN(Q) || isNaN(D) || isNaN(C) || isNaN(L)) {
      setResult("Valores de entrada inválidos.");
    } else {
      let hf = (((10.643 / C ** 1.852) * Q ** 1.852) / (D / 1000) ** 4.87) * L;
      const formattedHf = hf
        .toString()
        .slice(0, hf.toString().indexOf(".") + 3);
      setResult("Perda de Carga Continua: " + formattedHf + " mm");
      adicionarAoHistorico(formattedHf);
    }
  };

  const limparCampos = () => {
    setVazao("");
    setConfRugosidade("");
    setDiametro("");
    setComprimentoTubulacao("");
    setResult("");
  };

  const adicionarAoHistorico = (resultado) => {
    setHistorico((prevHistorico) => {
      let novoHistorico = [resultado, ...prevHistorico].slice(0, 3);
      if (novoHistorico.length === 3) {
        novoHistorico = novoHistorico.slice(0, 3);
      }
      return novoHistorico;
    });
  };

  const salvarHistorico = async () => {
    try {
      await AsyncStorage.setItem(
        "@historicoformattedHf",
        JSON.stringify(historico)
      );
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem(
        "@historicoformattedHf"
      );
      if (historico !== null) {
        setHistorico(JSON.parse(historico));
      }
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
    }
  };

  const NavegarproximoInput = (inputRef) => {
    inputRef.current.focus();
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
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Cálculo de Perda de Carga</Text>

          <Picker
            selectedValue={selectedLossType}
            style={[styles.input, styles.shadow]}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLossType(itemValue);
              if (itemValue === "localizada") {
                navigation.navigate("PerdaCargaLocalizada");
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
            onSubmitEditing={() => NavegarproximoInput(confRugosidadeInputRef)}
          />

          <TextInput
            ref={confRugosidadeInputRef}
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setConfRugosidade(text)}
            value={confRugosidade}
            placeholder="Coeficiente de Rugosidade (C)"
            keyboardType="numeric"
            onSubmitEditing={() => NavegarproximoInput(diametroInputRef)}
          />

          <TextInput
            ref={diametroInputRef}
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setDiametro(text)}
            value={diametro}
            placeholder="Diâmetro (mm)"
            keyboardType="numeric"
            onSubmitEditing={() =>
              NavegarproximoInput(comprimentoTubulacaoInputRef)
            }
          />

          <TextInput
            ref={comprimentoTubulacaoInputRef}
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setComprimentoTubulacao(text)}
            value={comprimentoTubulacao}
            placeholder="Comprimento da Tubulação (m)"
            keyboardType="numeric"
            onSubmitEditing={calcularPerdaCarga}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#53A176", width: "48%" },
              ]}
              onPress={calcularPerdaCarga}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <View style={styles.space} />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FF0000", width: "48%" },
              ]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.result}>{result}</Text>



          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitle}>Histórico:</Text>
            {historico.map((item, index) => (
              <Text key={index} style={styles.historicoItem}>{`Resultado ${
                index + 1
              }: ${item} m`}</Text>
            ))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Cálculo de Perda de Carga Contínua
                </Text>
                <Text style={[styles.modalText, styles.formula]}>
                  ℎ𝑓 = (10,643 ∗ 𝑄^1,852)
                  _______________________
                 (𝐶^1,852 ∗ 𝐷^4,87)
                </Text>
                <Text style={styles.modalText}>
                  O cálculo de perda de carga contínua é essencial na engenharia
                  hidráulica para dimensionar tubulações, otimizar o desempenho
                  do sistema, facilitar a manutenção, garantir a segurança e
                  reduzir custos operacionais. Ele permite prever e controlar as
                  perdas de pressão ao longo do sistema, garantindo eficiência,
                  confiabilidade e segurança em todas as fases do ciclo de vida
                  do sistema de tubulação.
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
            </View>
          </Modal>
        </View>
      </ScrollView>
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
    paddingVertical: height * 0.09,
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
    width: width * 0.45,
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
  containerScrollView: {
    flexGrow: 1,
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
    top: 45,
    right: 20,
    zIndex: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalText: {
    fontFamily: "Montserrat-Regular",
    marginBottom: 17,
    marginTop: 0,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    marginTop: 30,
    margin: 40,
    borderRadius: 40,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 27,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  historicoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    width: "100%",
  },
  historicoTitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    marginBottom: 5,
    textAlign: "center",
  },
  historicoItem: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
});

export default PerdaCargaContinua;