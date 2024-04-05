import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Imagens/SplashScreen.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Cor de fundo da tela de carregamento
  },
  image: {
    width: 200, // Largura da imagem
    height: 200, // Altura da imagem
    resizeMode: 'contain', // Modo de redimensionamento da imagem
  },
});

export default SplashScreen;
