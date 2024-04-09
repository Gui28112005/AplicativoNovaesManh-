import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarTela from "./VoltarTela";

const calcularDiametroEconomico = (Q, K) => {
  const q = parseFloat(Q.replace(',', '.'));
  const k = parseFloat(K.replace(',', '.'));

  if (isNaN(q) || isNaN(k)) {
    return 'Por favor, insira valores válidos para Q e K.';
  } else if (q === 0 || k === 0) {
    return 'Por favor, insira valores maiores que zero para Q e K.';
  } else {
    const D = ((((q / 1000) ** 0.5) * k) * 1000).toFixed(2);
    return D + ' mm';
  }
};

const DiametroEconomico = ({ navigation }) => {
  const [q, setQ] = useState('');
  const [k, setK] = useState('');
  const [diametro, setDiametro] = useState('');

  const handleCalcularDiametroEconomico = () => {
    const resultado = calcularDiametroEconomico(q, k);
    setDiametro(resultado);
  };

  const limparCampos = () => {
    setQ('');
    setK('');
    setDiametro('');
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Diâmetro Econômico</Text>
          <VoltarTela onPress={() => navigation.goBack()} />
        
        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={text => setQ(text)}
          keyboardType="numeric"
          value={q}
          placeholder="Insira a vazão na tubulação (Q) em L/s"
        />

        <TextInput
          style={[styles.input, styles.shadow]}
          onChangeText={text => setK(text)}
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
          <Text style={styles.result}>
            Diâmetro Econômico: {diametro} 
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

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
  title: {
    fontSize: width * 0.11,


    marginBottom: height * 0.06,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center'
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
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },

  space: {
    width: Dimensions.get("window").width * 0.05,
  },
  result: {
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontFamily: "Montserrat-Regular",
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 21,
    paddingHorizontal: 10,
  },
});

export default DiametroEconomico;
