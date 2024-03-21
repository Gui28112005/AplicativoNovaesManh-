import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Tela9 = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  return (
    <LinearGradient
    colors={["#FFFFFF", "#FFFFFF"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible1(true)}
        >
          <Text style={styles.buttonText}>
            1- Como usar as calculadoras do aplicativo?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible2(true)}
        >
          <Text style={styles.buttonText}>
            2- Como posso me localizar no App?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setModalVisible3(true)}
        >
          <Text style={styles.buttonText}>
            3- Onde encontro a política de privacidade?
          </Text>
        </TouchableOpacity>
        
        {/* Modals */}
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

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Definido como transparente para permitir que o gradiente seja visível
  },
  buttonContainer: {
    marginVertical: 10,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#083C52',
    padding: 10,
    alignItems: 'center',
    width: "90%",
    height: 50
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
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
});

export default Tela9;
