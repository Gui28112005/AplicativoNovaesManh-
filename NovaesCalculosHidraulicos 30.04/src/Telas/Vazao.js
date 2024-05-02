import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import VoltarTela from "./VoltarTela";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Vazao = ({ navigation }) => {
  const [velocidade, setVelocidade] = useState("");
  const [diametro, setDiametro] = useState("");
  const [vazao, setVazao] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [historico, setHistorico] = useState([]);
  const segundoInputRef = useRef(null);

  useEffect(() => {
    carregarHistorico();
  }, []);

  useEffect(() => {
    salvarHistorico();
  }, [historico]);

  const calcularVazao = () => {
    const v = parseFloat(velocidade.replace(",", "."));
    const d = parseFloat(diametro.replace(",", ".")) / 1000;

    if (isNaN(v) || isNaN(d) || v === 0 || d === 0) {
      setVazao("Por favor, insira todos os valores corretamente.");
      return;
    }

    const area = (Math.PI * d ** 2) / 4;
    const vazaoCalculada = (area * v).toFixed(3);
    setVazao(`A vazão é: ${vazaoCalculada} m³/s`);
    adicionarAoHistorico(`Vazão: ${vazaoCalculada} m³/s`);
  };

  const limparCampos = () => {
    setVelocidade("");
    setDiametro("");
    setVazao("");
  };

  const navigateToNextInput = () => {
    segundoInputRef.current.focus();
  };

  const adicionarAoHistorico = (resultado) => {
    setHistorico((prevHistorico) => {
      const novoHistorico = [resultado, ...prevHistorico].slice(0, 3);
      return novoHistorico;
    });
  };

  const salvarHistorico = async () => {
    try {
      await AsyncStorage.setItem("@historicoVazao", JSON.stringify(historico));
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem("@historicoVazao");
      if (historico !== null) {
        setHistorico(JSON.parse(historico));
      }
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled"
      >
        <VoltarTela onPress={() => navigation.goBack()} />

        <TouchableOpacity
          style={[styles.infoButton, styles.infoButtonTop]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="info" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.tituloPrincipal}>
            <Text style={styles.vazao}>Cálculo de vazão</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Digite a velocidade (m/s)"
            keyboardType="numeric"
            value={velocidade}
            onChangeText={(text) => setVelocidade(text)}
            returnKeyType="next"
            onSubmitEditing={navigateToNextInput}
          />

          <TextInput
            ref={segundoInputRef}
            style={styles.input}
            placeholder="Digite o diâmetro (mm)"
            keyboardType="numeric"
            value={diametro}
            onChangeText={(text) => setDiametro(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.calcularButton,
                { backgroundColor: "#53A176", width: "45%" },
              ]}
              onPress={calcularVazao}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.limparButton,
                { backgroundColor: "#FF0000", width: "45%" },
              ]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.result}>{vazao}</Text>

          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitle}>Histórico</Text>
            {historico.map((item, index) => (
              <Text key={index} style={styles.historicoItem}>
                {item}
              </Text>
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
                <Text style={styles.modalTitle}>Vazão</Text>
                <Text style={[styles.modalText, styles.formula]}>
                  𝑉=𝑄/((π∗𝐷²)/4)
                </Text>
                <Text style={styles.modalText}>
                  {"\n\n"}
                  Velocidade: A velocidade do fluido dentro das tubulações é uma
                  medida da rapidez com que o fluido se move através do sistema.
                  {"\n\n"}
                  Diâmetro: O diâmetro refere-se ao diâmetro interno das
                  tubulações ou condutos pelos quais o fluido está fluindo.
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
    marginTop: 90,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  tituloPrincipal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  vazao: {
    fontSize: width * 0.11,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
  label: {
    fontSize: width * 0.06,
    marginBottom: width * 0.03,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: width * 0.15,
    width: "100%",
    marginBottom: width * 0.1,
    backgroundColor: "#F3F3F3",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
    paddingHorizontal: width * 0.05,
  },
  containerScrollView: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: width * 0.05,
  },
  button: {
    flex: 1,
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    elevation: 11,
  },
  calcularButton: {
    backgroundColor: "#53A176",
    marginRight: width * 0.025,
  },
  limparButton: {
    backgroundColor: "#FF0000",
    marginLeft: width * 0.025,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
  modalText: {
    fontFamily: "Montserrat-Regular",
    marginBottom: 17,
    marginTop: 0,
  },
  modalTextBold: {
    fontFamily: "Montserrat-Bold",
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
  infoButtonTop: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 1,
  },
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
});

export default Vazao;