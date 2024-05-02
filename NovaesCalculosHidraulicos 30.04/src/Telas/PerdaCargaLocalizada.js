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
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const PerdaCargaLocalizada = ({ navigation }) => {
  const [quantidade, setQuantidade] = useState("");
  const [coefPeca, setCoefPeca] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [result, setResult] = useState("");
  const [selectedLossType, setSelectedLossType] = useState("localizada");
  const [modalVisible, setModalVisible] = useState(false);
  const [valorPecaSelecionada, setValorPecaSelecionada] = useState("");
  const [historico, setHistorico] = useState([]);

  const coefPecaRef = useRef(null);
  const velocidadeRef = useRef(null);

  useEffect(() => {
    carregarHistorico();
  }, []);

  useEffect(() => {
    salvarHistorico();
  }, [historico]);

  useEffect(() => {
    setCoefPeca(valorPecaSelecionada);
  }, [valorPecaSelecionada]);

  const calcularPerdaCarga = () => {
    const g = 9.81;

    // Substituir vírgulas por pontos após a conversão para número
    const quantidadeNumber = parseFloat(quantidade.replace(",", "."));
    const coefPecaNumber = parseFloat(coefPeca.replace(",", "."));
    const velocidadeNumber = parseFloat(velocidade.replace(",", "."));

    if (
      isNaN(quantidadeNumber) ||
      isNaN(coefPecaNumber) ||
      isNaN(velocidadeNumber)
    ) {
      setResult("Insira os valores válidos");
    } else {
      const localizada =
        (coefPecaNumber * quantidadeNumber * velocidadeNumber ** 2) / (2 * g);
      setResult("Perda de Carga Localizada: " + localizada.toFixed(2) + " m");
      adicionarAoHistorico(localizada.toFixed(2));
    }
  };

  const limparCampos = () => {
    setQuantidade("");
    setCoefPeca("");
    setVelocidade("");
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
        "@historicoLocalizada",
        JSON.stringify(historico)
      );
    } catch (error) {
      console.error("Erro ao salvar o histórico:", error);
    }
  };

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem("@historicoLocalizada");
      if (historico !== null) {
        setHistorico(JSON.parse(historico));
      }
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Calculos Hidraulicos"); // Navegue para a tela inicial (HomeScreen)
      return true; // Impede o comportamento padrão (fechar o aplicativo)
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); // Adicione navigation como uma dependência para garantir que ele seja referenciado corretamente

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <VoltarTela onPress={() => navigation.navigate("Calculos Hidraulicos")} />
      <TouchableOpacity
        style={[styles.infoButton, styles.infoButtonTop]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="info" size={30} color="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Cálculo de Perda de Carga Localizada</Text>

          <View style={styles.tamanhoPicker}>
            <Picker
              selectedValue={selectedLossType}
              style={[styles.input, styles.shadow]}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedLossType(itemValue);
                if (itemValue === "continua") {
                  navigation.navigate("PerdaCargaContinua");
                }
              }}
            >
              <Picker.Item label="Perda de Carga Contínua" value="continua" />
              <Picker.Item
                label="Perda de Carga Localizada"
                value="localizada"
              />
            </Picker>
            <Picker
              selectedValue={valorPecaSelecionada}
              style={[styles.input, styles.shadow]}
              onValueChange={(itemValue, itemIndex) => {
                setValorPecaSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione uma peça" value="" />
              <Picker.Item key="1" label="Ampliação Gradual" value="0,30*" />
              <Picker.Item key="2" label="Bocais" value="2,75" />
              <Picker.Item key="3" label="Comporta aberta" value=" 1,00 " />
              <Picker.Item key="4" label="Controlador de vazão" value="2,50 " />
              <Picker.Item key="5" label="Cotovelo de 90°" value="0,90" />
              <Picker.Item key="6" label="Cotovelo de 45°" value="0,40*" />
              <Picker.Item key="7" label="Crivo" value="0,75" />
              <Picker.Item key="8" label="Curva de 90°" value="0,40 " />
              <Picker.Item key="9" label="Curva de 45°" value="0,20 " />
              <Picker.Item key="10" label="Curva de 22,5°" value="0,10" />
              <Picker.Item key="11" label="Entrada normal em canalização" value="0,50" />
              <Picker.Item key="12" label="Entrada de borda" value="1,00   " />
              <Picker.Item key="13" label="Existêcia de pequena derivação" value="0,03" />
              <Picker.Item key="14" label="Junção" value="0,40" />
              <Picker.Item key="15" label="Medidor Venturi" value="2,50**" />
              <Picker.Item key="16" label="Redução gradual" value="0,15*" />
              <Picker.Item key="17" label="Saída de canalização" value="1,00 " />
              <Picker.Item key="18" label="Tê, passagem direta" value="0,60" />
              <Picker.Item key="19" label="Tê, saída de lado" value="1,30" />
              <Picker.Item key="20" label="Tê, saída bilateral" value="1,80" />
              <Picker.Item key="21" label="Válvula de ângulo aberta" value="5,00" />
              <Picker.Item key="22" label="Válvula de gaveta aberta" value="0,20" />
              <Picker.Item key="23" label="Válvula-de-pé" value="1,75" />
              <Picker.Item key="24" label="Válvula de retenção" value="2,50" />
              <Picker.Item key="25" label="Válvula de globo aberta" value="10,00" />
              <Picker.Item key="26" label="Velocidade" value="1,00" />
            </Picker>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.input, styles.shadow]}
              onChangeText={(text) => setQuantidade(text)}
              value={quantidade}
              placeholder="Quantidade"
              keyboardType="numeric"
              returnKeyType="default"
              onSubmitEditing={() => coefPecaRef.current.focus()}
            />

            <TextInput
              ref={coefPecaRef}
              style={[styles.input, styles.shadow]}
              onChangeText={(text) => setCoefPeca(text)}
              value={coefPeca}
              placeholder="Coeficiente da Peça"
              keyboardType="numeric"
              // returnKeyType="next"
              onSubmitEditing={() => velocidadeRef.current.focus()}
            />

            <TextInput
              ref={velocidadeRef}
              style={[styles.input, styles.shadow]}
              onChangeText={(text) => setVelocidade(text)}
              value={velocidade}
              placeholder="Velocidade (m/s)"
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={calcularPerdaCarga}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#53A176", width: width * 0.4 },
              ]}
              onPress={calcularPerdaCarga}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <View style={styles.space} />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FF0000", width: width * 0.4 },
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
                  Calculo De Perda Carga Localizada
                </Text>
                <Text style={[styles.modalText, styles.formula]}>
                  ℎ𝑓 = (𝐾 𝑥 𝑣²)⁄(2 𝑥 𝑔)
                </Text>
                <Text style={styles.modalText}>
                  O cálculo de perda de carga localizada é essencial em
                  engenharia para determinar a diminuição de pressão devido a
                  obstáculos em sistemas de tubulação. Utiliza-se equações como
                  a de Darcy-Weisbach para relacionar a perda de carga com
                  fatores como diâmetro do tubo, velocidade do fluido e
                  rugosidade da superfície. Isso permite projetar sistemas
                  eficientes e prever o comportamento do fluxo.
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
    paddingVertical: height * 0.13,
    borderRadius: 15,
    marginTop: height * 0.0, // Alterei o valor para ser relativo à altura da tela
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginBottom: height * 0.03,
  },
  input: {
    height: height * 0.08,
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
    marginBottom: 0, // Reduza ou defina como 0 para mover o título para cima
    textAlign: "center",
  },

  historicoItem: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Alterei para espaço ao redor para melhorar o espaçamento
    alignItems: "center",
    width: "100%",
  },
  button: {
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
  textInputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
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
    top: height * 0.0523,
    right: width * 0.05,
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
    marginBottom: height * 0.02,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: width * 0.08,
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: width * 0.08,
    fontFamily: "Montserrat-Bold",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  closeButton: {
    marginTop: height * 0.02,
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
    width: width * 0.1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

export default PerdaCargaLocalizada;