// Imports
import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; // Import dos componentes usados
import { LinearGradient } from 'expo-linear-gradient'; // Importação Grandient Linear

// Componente Ajuda
const Ajuda = () => {
  // Controla a visibilidade dos modais da tela
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  return (
    // Linear Gradient
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={styles.gradient}
    >
      {/* // Titulo */}
      <Text style={styles.titulo}>
        DÚVIDAS FREQUENTES
      </Text>
      {/* Container de botões */}
      <View style={styles.container}>
        {/* Botão ajuda 1 */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible1(true)}
        >
          <Text style={styles.buttonText}>
            1- Como usar as calculadoras do aplicativo?
          </Text>
        </TouchableOpacity>
        {/* Botão ajuda 2 */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible2(true)}
        >
          <Text style={styles.buttonText}>
            2- Como posso me localizar no App?
          </Text>
        </TouchableOpacity>
        {/* Botão ajuda 3 */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible3(true)}
        >
          <Text style={styles.buttonText}>
            3- Onde encontro a política de privacidade?
          </Text>
        </TouchableOpacity>
        
        {/* Modais */}
        {/* Modal ajuda 1 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../Imagens/exemplo.jpg')}
                style={styles.image}
              />
              <TouchableOpacity onPress={() => setModalVisible1(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* Modal ajuda 2 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../Imagens/exemplo.jpg')}
                style={styles.image}
              />
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* Modal ajuda 3 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => setModalVisible3(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../Imagens/exemplo.jpg')}
                style={styles.image}
              />
              <TouchableOpacity onPress={() => setModalVisible3(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

// Estilos
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
    // Aqui está as propriedades para adicionar a sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
    marginBottom: 100,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#007B8F',
    padding: 10,
    alignItems: 'center',
    width: "90%",
    height: 70,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Montserrat-Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#083C52',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#3498DB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 365,
    height: 500,
    marginBottom: 10,
  },
  titulo:{
    fontSize:30,
    textAlign: 'center',
    fontFamily: "Montserrat-Regular",
    marginTop:100,
  }
});

// Exporta o componente Ajuda
export default Ajuda;
