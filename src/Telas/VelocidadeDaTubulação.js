import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import VoltarTela from "./VoltarTela";
import { MaterialIcons } from '@expo/vector-icons';

const VelocidadeDaTubulacao = () => {
  const navigation = useNavigation();
  const [diametro, setDiametro] = useState("0.08");
  const [fluxo, setFluxo] = useState("0.0037");
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
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <VoltarTela onPress={() => navigation.goBack()} />

          <View style={styles.tituloPrincipal}>
            <Text style={styles.velocidade}>Velocidade da Tubulação</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="info" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Diâmetro (D):</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite o diâmetro (em metros)"
            keyboardType="numeric"
            value={diametro}
            onChangeText={(text) => setDiametro(text)}
          />

          <Text style={styles.label}>Fluxo (Q):</Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Digite o fluxo (em metros cúbicos por segundo)"
            keyboardType="numeric"
            value={fluxo}
            onChangeText={(text) => setFluxo(text)}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#53A176" }]}
              onPress={calcularVelocidade}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <View style={styles.space} />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF0000" }]}
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
  velocidade: {
    fontSize: 30,
    marginBottom: 33,
    fontFamily: "Montserrat-Bold",
    marginVertical: 55,
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
  },
  textInput: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
  },
  button: {
    flex: 1,
    height: 40,
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

export default VelocidadeDaTubulacao;
