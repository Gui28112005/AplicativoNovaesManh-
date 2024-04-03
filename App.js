import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Font from 'expo-font';

// Importações de telas do projeto
import Perimetro from "./src/Telas/Perimetro";
import Vazao from "./src/Telas/Vazao";
import PerdaCarga from "./src/Telas/PerdaCarga";
import SobreNos from "./src/Telas/SobreNos";
import CalculoDarcy from "./src/Telas/CalculoDarcy";
import DimenTubulacao from "./src/Telas/DimenTubulacao";
import Ajuda from "./src/Telas/Ajuda";
import PoliticaPrivacidade from "./src/Telas/PoliticaPrivacidade";

// Inicialização do navegador de pilha (stack navigator)
const Stack = createNativeStackNavigator();

// Componente principal do aplicativo
const App = () => {
  // Estado para verificar se a fonte foi carregada
  const [fontLoaded, setFontLoaded] = useState(false);

  // Efeito para carregar a fonte quando o componente é montado
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  // Se a fonte ainda não foi carregada, retorna null
  if (!fontLoaded) {
    return null; // Renderizar qualquer coisa enquanto a fonte está sendo carregada
  }

  // Retorna a navegação do aplicativo
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Calculos Hidraulicos" component={Menu} />
        <Stack.Screen name="Perimetro" component={Perimetro} />
        <Stack.Screen name="Vazão" component={Vazao} />
        <Stack.Screen name="Perda de Carga" component={PerdaCarga} />
        <Stack.Screen name="Calculo de Darcy" component={CalculoDarcy} />
        <Stack.Screen name="Dimensionamento de Tubulação" component={DimenTubulacao} />
      </Stack.Navigator>
      {/* Define a cor da barra de notificações */}
      <StatusBar style="light" backgroundColor="#007B8F" />
    </NavigationContainer>
  );
};

// Inicialização do navegador de gaveta (drawer navigator)
const Drawer = createDrawerNavigator();

// Configurações de tema personalizado
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white', // Define a cor de fundo padrão
  },
};

// Componente personalizado para o conteúdo do drawer
function CustomDrawerContent({ isMenuOpen, toggleMenu, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#007B8F",
          padding: 20,
          marginTop: -50,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            marginTop: 50,
            fontFamily: "Montserrat-Bold"
          }}
        >
          Cálculos Hidráulicos
        </Text>
      </View>
      <DrawerItemList
        {...props}
        labelStyle={{ marginLeft: -10, fontSize: 16 }}
      />
    </DrawerContentScrollView>
  );
}

// Componente para renderizar o menu
function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Retorna o navegador de gaveta com as telas do menu
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      )}
      screenOptions={{
        headerTintColor: "white",
        drawerActiveBackgroundColor: "#007B8F", // Cor de fundo do item selecionado
        drawerActiveTintColor: "#fff", // Cor do texto do item selecionado
        labelStyle: {
          fontFamily: "Montserrat-Bold", // Aplicando a fonte personalizada
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={HomeScreen}
        options={{
          drawerLabel: "Início",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: '#007B8F',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="Sobre Nós"
        component={SobreNos}
        options={{
          drawerLabel: "Sobre Nós",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: '#007B8F',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="Politica de Privacidade"
        component={PoliticaPrivacidade}
        options={{
          drawerLabel: "Política de Privacidade",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#007B8F',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="Ajuda"
        component={Ajuda}
        options={{
          drawerLabel: "Ajuda",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#007B8F',
          },
          headerTintColor: 'white',
        }}
      />
    </Drawer.Navigator>
  );
}

// Componente para a tela inicial do menu
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Perimetro")}
      >
        <Text style={styles.buttonText}>Perímetro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Vazão")}
      >
        <Text style={styles.buttonText}>Vazão</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Perda de Carga")}
      >
        <Text style={styles.buttonText}>Perda de Carga</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calculo de Darcy")}
      >
        <Text style={styles.buttonText}>Cálculo de Darcy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dimensionamento de Tubulação")}
      >
        <Text style={styles.buttonText}>Dimensionamento de Tubulação</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007B8F",
    margin: 10,
    borderRadius: 15,
    width: "90%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
});

// Exporta o componente App
export default App;
