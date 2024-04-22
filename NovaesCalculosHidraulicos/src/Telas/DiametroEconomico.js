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
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from "@expo/vector-icons"; // Importação do ícone

const calcularDiametroEconomico = (Q, K) => {
  const q = parseFloat(Q.replace(",", "."));
  const k = parseFloat(K.replace(",", "."));

  if (isNaN(q) || isNaN(k)) {
    return "Por favor, insira valores válidos para Q e K.";
  } else if (q === 0 || k === 0) {
    return "Por favor, insira valores maiores que zero para Q e K.";
  } else {
    const D = ((q / 1000) ** 0.5 * k * 1000).toFixed(2);
    return D + " mm";
  }
};

const DiametroEconomico = ({ navigation }) => {
  const [q, setQ] = useState("");
  const [k, setK] = useState("");
  const [diametro, setDiametro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalcularDiametroEconomico = () => {
    const resultado = calcularDiametroEconomico(q, k);
    setDiametro(resultado);
  };

  const limparCampos = () => {
    setQ("");
    setK("");
    setDiametro("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Diâmetro Econômico</Text>
        </View>
        <VoltarTela onPress={() => navigation.goBack()} />

        <TouchableOpacity
          style={[styles.infoButton, styles.infoButtonTop]} // Adicionei o estilo infoButtonTop
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="info" size={30} color="white" />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setQ(text)}
          keyboardType="numeric"
          value={q}
          placeholder="Insira a vazão na tubulação (Q) em L/s"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={(text) => setK(text)}
          keyboardType="numeric"
          value={k}
          placeholder="Insira o coeficiente K - fórmula de Bresse"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              { backgroundColor: "#53A176", width: "45%" },
            ]}
            onPress={handleCalcularDiametroEconomico}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <View style={styles.space} />

          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              { backgroundColor: "#FF0000", width: "45%" },
            ]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {diametro !== "" && (
          <Text style={styles.result}>Diâmetro Econômico: {diametro}</Text>
        )}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Diâmetro Econômico - Fórmula de Bresse
              </Text>
              <Text style={[styles.modalText, styles.formula]}>D=K X √Q</Text>
              <Text style={styles.modalText}>
                Para realizar o cálculo do diâmetro econômico de uma tubulação
                usando a fórmula de Bresse, primeiro precisamos entender os
                elementos envolvidos:
                {"\n\n"}
                D: (Diâmetro econômico): É o diâmetro da tubulação que resulta
                em menor custo total, considerando tanto o custo inicial da
                tubulação quanto os custos de energia ao longo do tempo.
                {"\n\n"}
                K: (Coeficiente da fórmula de Bresse): É um coeficiente
                adimensional que varia de acordo com o tipo de material da
                tubulação, as condições de fluxo, entre outros fatores.
                {"\n\n"}
                Q: (Vazão na tubulação): É a quantidade de fluido que passa pela
                tubulação em determinado tempo. Neste caso, Q é igual a litros
                por segundo.
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
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
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
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.06,
  },
  title: {
    fontSize: width * 0.11,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
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
    marginBottom: Dimensions.get("window").width * 0.0,
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
    width: width * 0.04,
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 21,
    paddingHorizontal: 10,
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
    top: 45, // ou qualquer valor que desejar
    right: 20, // ou qualquer valor que desejar
    zIndex: 1, // Para garantir que fique acima dos outros elementos
  },
  formula: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
});

export default DiametroEconomico;
