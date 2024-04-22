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
import { useNavigation } from "@react-navigation/native";
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from "@expo/vector-icons";

const VelocidadeDaTubulacao = () => {
  const navigation = useNavigation();
  const [diametro, setDiametro] = useState("");
  const [fluxo, setFluxo] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const calcularVelocidade = () => {
    const d = parseFloat(diametro);
    const q = parseFloat(fluxo);

    if (isNaN(d) || isNaN(q) || d === 0) {
      setVelocidade("Por favor, insira todos os valores corretamente.");
      return;
    }

    const raio = d / 2;
    const area = Math.PI * Math.pow(raio, 2);
    const velocidadeCalculada = q / area;
    setVelocidade(`A velocidade é: ${velocidadeCalculada.toFixed(2)} m/s`);
  };

  const limparCampos = () => {
    setDiametro("");
    setFluxo("");
    setVelocidade("");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <VoltarTela onPress={() => navigation.goBack()} />

      <TouchableOpacity
        style={[styles.infoButton, styles.infoButtonTop]} // Adicionei o estilo infoButtonTop
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="info" size={30} color="white" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.tituloPrincipal}>
            <Text style={styles.velocidade}>Velocidade da Tubulação</Text>
          </View>

          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite o diâmetro (Metros)"
            keyboardType="numeric"
            value={diametro}
            onChangeText={(text) => setDiametro(text)}
          />

          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite o fluxo (Metros cúbicos por segundo)"
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

          <Text style={styles.result}>{velocidade}</Text>

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
                  
                Esse componente faz parte de um aplicativo que calcula a velocidade do fluxo em uma tubulação,
                 Você insere o diâmetro da tubulação e o fluxo de líquido, e ele retorna a velocidade em metros por segundo,
                  Há um botão de informação para detalhes 
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
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
    ...StyleSheet.absoluteFillObject,
    marginTop: 60,
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
    shadowRadius: 3,
    elevation: 10,
    fontFamily: "Montserrat-Bold",
    marginTop:15,
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
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    marginVertical: 0,
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
    fontSize:18,
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
    top: 45, // ou qualquer valor que desejar
    right: 20, // ou qualquer valor que desejar
    zIndex: 1, // Para garantir que fique acima dos outros elementos
  },
});

export default VelocidadeDaTubulacao;
