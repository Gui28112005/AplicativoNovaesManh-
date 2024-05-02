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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VelocidadeDaTubulacao = () => {
  const navigation = useNavigation();
  const [diametro, setDiametro] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [historico, setHistorico] = useState([]);
  const segundoInputRef = useRef(null);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const calcularVelocidade = () => {
    const d = parseFloat(diametro.replace(",", "."));
    const q = parseFloat(fluxo.replace(",", "."));

    if (isNaN(d) || isNaN(q) || d === 0) {
      setVelocidade("Por favor, insira todos os valores corretamente.");
      return;
    }

    const raio = d / 2;
    const area = Math.PI * Math.pow(raio, 2);
    const velocidadeCalculada = q / area;
    const velocidadeFormatada = `A velocidade é: ${velocidadeCalculada.toFixed(
      2
    )} m/s`;
    setVelocidade(velocidadeFormatada);
    adicionarAoHistorico(velocidadeFormatada);
  };

  const limparCampos = () => {
    setDiametro("");
    setFluxo("");
    setVelocidade("");
  };

  const navigateToNextInput = () => {
    segundoInputRef.current.focus();
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
        "@historicoVelocidade",
        JSON.stringify(historico)
      );
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem("@historicoVelocidade");
      if (historico !== null) {
        setHistorico(JSON.parse(historico));
      }
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
    }
  };

  useEffect(() => {
    salvarHistorico();
  }, [historico]);

  return (
    <ScrollView
      contentContainerStyle={styles.containerScrollView}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
        <VoltarTela onPress={() => navigation.goBack()} />

        <TouchableOpacity
          style={[styles.infoButton, styles.infoButtonTop]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="info" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.tituloPrincipal}>
            <Text style={styles.velocidade}>Velocidade da Tubulação</Text>
          </View>

          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite o diâmetro (m)"
            keyboardType="numeric"
            value={diametro}
            onChangeText={(text) => setDiametro(text)}
            returnKeyType="next"
            onSubmitEditing={navigateToNextInput}
          />

          <TextInput
            ref={segundoInputRef}
            style={[styles.input, styles.textInput]}
            placeholder="Digite a vazão (m³/s)"
            keyboardType="numeric"
            value={fluxo}
            onChangeText={(text) => setFluxo(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#53A176", width: "45%" },
              ]}
              onPress={calcularVelocidade}
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

          

          <View style={styles.retanguloHistorico}>
          <Text style={styles.historicoTitle}>Resultado:</Text>
            <View style={styles.historicoTitleContainer}>
            <Text style={styles.result}>{velocidade}</Text>
              <Text style={styles.historicoTitle}>Histórico de cálculos:</Text>
            
            </View>
            {historico.map((item, index) => (
              <View key={index}>
                <Text style={styles.historicoItem}>{`Cálculo ${
                  index + 1
                }: ${item}`}</Text>
                {index !== historico.length - 5 && (
                  <View style={styles.linha}></View>
                )}
              </View>
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
                <Text style={styles.modalTitle}>Velocidade da Tubulação</Text>
                <Text style={styles.modalText}>
                  Esse componente faz parte de um aplicativo que calcula a
                  velocidade do fluxo em uma tubulação, Você insere o diâmetro
                  da tubulação e o fluxo de líquido, e ele retorna a velocidade
                  em metros por segundo, Há um botão de informação para detalhes
                  extras e um botão "Limpar" para recomeçar. Simples assim!
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
      </LinearGradient>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
    ...StyleSheet.absoluteFillObject,
    marginTop: 90,
  },
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  tituloPrincipal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  velocidade: {
    fontSize: width * 0.11,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
  label: {
    fontSize: 27,
    marginBottom: 25,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    height: 60,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 7,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
    marginTop: 15,
  
  },
  textInput: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 30,
  },
  button: {
    flex: 1,
    height: 45,
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
    width: 10,
  },
  result: {
    marginTop: 16,
    fontSize: 23,
    fontFamily: "Montserrat-Regular",
    textAlign: "center", // Centralizar o texto horizontalmente
    marginStart:20,
    marginVertical: 0,
  },
  historicoContainer: {
    width: "100%",
  },
  historicoTitle: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    marginBottom: 16,
    justifyContent: "flex-start",
    textAlign: "center",
    marginTop: 3,
  },
  historicoItem: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginVertical: 8,
  },
  linha: {
    borderBottomColor: "gray",
    marginVertical: 1,
    borderBottomWidth: 1,
    marginBottom: 5,
    marginHorizontal: "0.0%",
    marginLeft: 1,
    marginRight: 0.1,
  },
  retanguloHistorico: {
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    padding: 20,
    marginTop: 25,
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    marginTop: 10,
    margin: 40,
    borderRadius: 40,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 27,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
    marginTop: 30,
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Montserrat-Regular",
    marginBottom: 17,
    fontSize: 18,
    marginTop: 25,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
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
  containerScrollView: {
    flexGrow: 1,
  },
});

export default VelocidadeDaTubulacao;
