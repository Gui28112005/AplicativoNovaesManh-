import React, { useState, useEffect } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import VoltarTela from "./VoltarTela";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const Perimetro = ({ navigation }) => {
  const [diametro, setDiametro] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [historico, setHistorico] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    carregarHistorico();
  }, []);

  useEffect(() => {
    salvarHistorico();
  }, [historico]);

  const calcularPerimetro = () => {
    if (!isNaN(diametro.replace(",", ".")) && parseFloat(diametro.replace(",", ".")) >= 0) {
      const raio = parseFloat(diametro.replace(",", ".")) / 2;
      const perimetro = 2 * Math.PI * raio;
      const formattedPerimeter = perimetro.toFixed(2); 
      setResult(formattedPerimeter);
      setError("");
      adicionarAoHistorico(formattedPerimeter);
    } else {
      setError("Insira um valor válido para o diâmetro (mm)");
    }
  };

  const limparCampos = () => {
    setDiametro("");
    setResult(null);
    setError("");
  };

  const adicionarAoHistorico = (resultado) => {
    setHistorico(prevHistorico => {
      let novoHistorico = [resultado, ...prevHistorico].slice(0, 3);
      if (novoHistorico.length === 3) {
        novoHistorico = novoHistorico.slice(0, 3); 
      }
      return novoHistorico;
    });
  };

  const salvarHistorico = async () => {
    try {
      await AsyncStorage.setItem('@historicoPerimetro', JSON.stringify(historico));
    } catch (error) {
      console.error('Erro ao salvar o histórico:', error);
    }
  };

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem('@historicoPerimetro');
      if (historico !== null) {
        setHistorico(JSON.parse(historico));
      }
    } catch (error) {
      console.error('Erro ao carregar o histórico:', error);
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#EAEAEA"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <View style={styles.header}>
            <Text style={styles.title}>Perímetro</Text>
          </View>

          <TouchableOpacity
            style={[styles.infoButton, styles.infoButtonTop]}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="info" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.textInput}>
            <TextInput
              style={styles.input}
              onChangeText={(number) => setDiametro(number)}
              value={diametro}
              placeholder="Diâmetro da Circunferência (mm)"
              keyboardType="numeric"
            />
          </View>

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#53A176", width: "48%" }]}
              onPress={calcularPerimetro}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF0000", width: "48%" }]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {result !== null && <Text style={styles.result}>Perímetro: {result} m</Text>}

          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitle}>Histórico:</Text>
            {historico.map((item, index) => (
              <Text key={index} style={styles.historicoItem}>{`Resultado ${index + 1}: ${item} m`}</Text>
            ))}
          </View>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Perímetro </Text>
                <Text style={[styles.modalText, styles.formula]}>P=2πr</Text>
                <Text style={styles.modalText}>
                  A fórmula para calcular o perímetro (P) de uma tubulação circular é:
                  {"\n\n"}- Onde: π é o valor da constante pi, que representa a relação entre a circunferência de um círculo e seu diâmetro, e é aproximadamente igual a 3.14159.
                  {"\n\n"}- r é o raio da tubulação.
                  {"\n\n"}
                  Portanto, multiplicando o valor do raio pelo dobro da constante pi (π), obtemos o perímetro da tubulação.
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
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
  gradient: {
    flex: 1,
  },
  containerScrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
  input: {
    height: 60,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
    marginTop: 15,
    borderRadius: 0,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  button: {
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    marginHorizontal: "2%",
    paddingHorizontal: "5%",
    elevation: 21,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontFamily: "Montserrat-Bold",
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },
  textInput: {
    height: Dimensions.get("window").width * 0.15,
    width: "100%",
    marginBottom: Dimensions.get("window").width * 0.1,
  },
  infoButtonTop: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 1,
  },
  infoButton: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 1,
  },
  historicoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    width: "100%"
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
    fontSize: width * 0.06,
    fontFamily: "Montserrat-Bold",
    marginBottom: "2%",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Montserrat-Regular",
    marginBottom: "2%",
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
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
  },
});

export default Perimetro;