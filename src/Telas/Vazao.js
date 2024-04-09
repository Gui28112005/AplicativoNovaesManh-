import React, { useState } from "react";
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
import { MaterialIcons } from '@expo/vector-icons'; // Importação do ícone
import VoltarTela from "./VoltarTela";

const Vazao = ({ navigation }) => {
  const [quantidade, setQuantidade] = useState("");
  const [volume, setVolume] = useState("");
  const [vazao, setVazao] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const calcularVazao = () => {
    const q = parseFloat(quantidade);
    const v = parseFloat(volume);

    if (isNaN(q) || isNaN(v) || v === 0) {
      setVazao("Por favor, insira todos os valores.");
      return;
    }

    const resultado = q / v;
    setVazao(`A vazão é: ${resultado}`);
  };

  const limparCampos = () => {
    setQuantidade("");
    setVolume("");
    setVazao("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <View style={styles.tituloPrincipal}>
            <Text style={styles.vazao}>Cálculo de vazão</Text>
            {/* Ícone de informação */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="info" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Quantidade (Q):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={(text) => setQuantidade(text)}
          />

          <Text style={styles.label}>Volume (V):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o volume"
            keyboardType="numeric"
            value={volume}
            onChangeText={(text) => setVolume(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.calcularButton]}
              onPress={calcularVazao}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.limparButton]}
              onPress={limparCampos}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.result}>{vazao}</Text>

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
    paddingHorizontal: width * 0.05,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tituloPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  vazao: {
    fontSize: width * 0.08, // 5% da largura da tela
    fontFamily: "Montserrat-Bold",
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    backgroundColor: 'white',
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
});

export default Vazao;
