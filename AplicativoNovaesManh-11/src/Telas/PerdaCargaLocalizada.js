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
import { StatusBar } from "react-native";
import PerdaCargaContinua from "./PerdaCargaContinua";
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const PerdaCargaLocalizada = ({ navigation }) => {
  const [quantidade, setQuantidade] = useState("");
  const [coefPeca, setCoefPeca] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [result, setResult] = useState("");
  const [selectedLossType, setSelectedLossType] = useState("localizada");
  const [modalVisible, setModalVisible] = useState(false);

  const calcularPerdaCarga = () => {
    const g = 9.81;

    if (isNaN(quantidade) || isNaN(coefPeca) || isNaN(velocidade)) {
      setResult("Insira os valores válidos");
    } else {
      const localizada =
        (parseFloat(coefPeca) *
          parseFloat(quantidade) *
          parseFloat(velocidade) ** 2) /
        (2 * g);
      setResult(localizada.toFixed(2) + " metros");
    }
  };

  const limparCampos = () => {
    setQuantidade("");
    setCoefPeca("");
    setVelocidade("");
    setResult("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <StatusBar backgroundColor="#007B8F" barStyle="light-content" />
      <VoltarTela onPress={() => navigation.goBack()} />

      <TouchableOpacity
        style={[styles.infoButton, styles.infoButtonTop]}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="info" size={30} color="white" />
      </TouchableOpacity>
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
            <Picker.Item label="Perda de Carga Localizada" value="localizada" />
          </Picker>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setQuantidade(text)}
            value={quantidade}
            placeholder="Quantidade"
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setCoefPeca(text)}
            value={coefPeca}
            placeholder="Coeficiente da Peça"
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, styles.shadow]}
            onChangeText={(text) => setVelocidade(text)}
            value={velocidade}
            placeholder="Velocidade (m/s)"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#53A176", width: "40%" }, // Reduzi a largura para 40%
            ]}
            onPress={calcularPerdaCarga}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#FF0000", width: "40%" }, // Reduzi a largura para 40%
            ]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.result}>{result}</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Seu texto informativo aqui...</Text>
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
    height: height * 0.05,
    width: width * 0.9,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.04,
    backgroundColor: "#F3F3F3",
    borderRadius: 0,
    fontFamily: "Montserrat-Bold",
    width: 355,
    left: 2,
    marginHorizontal: 12,
  },
  result: {
    marginTop: height * 0.02,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
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
    top: 45,
    right: 20,
    zIndex: 1,
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
    width: width * 0.06,
  },
});

export default PerdaCargaLocalizada;
