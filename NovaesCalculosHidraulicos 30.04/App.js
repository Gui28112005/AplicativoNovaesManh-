import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import SplashScreen from "./src/Telas/SplashScreen";

import Perimetro from "./src/Telas/Perimetro";
import Vazao from "./src/Telas/Vazao";
import SobreNos from "./src/Telas/SobreNos";
import Ajuda from "./src/Telas/Ajuda";
import PoliticaPrivacidade from "./src/Telas/PoliticaPrivacidade";
import DiametroEconomico from "./src/Telas/DiametroEconomico";
import PerdaCargaContinua from "./src/Telas/PerdaCargaContinua";
import VelocidadeDaTubulacao from "./src/Telas/VelocidadeDaTubulação";
import PerdaCargaLocalizada from "./src/Telas/PerdaCargaLocalizada";

const Stack = createNativeStackNavigator();

const App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);

  const [splashVisible, setSplashVisible] = useState(true);

  <StatusBar style="light" backgroundColor="#007B8F" />

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); 

    return () => clearTimeout(splashTimer);
  }, []);


  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splashVisible ? (
          <Stack.Screen name="Splash Screen" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Calculos Hidraulicos" component={Menu} />
            <Stack.Screen name="Perimetro" component={Perimetro} />
            <Stack.Screen name="Vazão" component={Vazao} />
            <Stack.Screen
              name="PerdaCargaContinua"
              component={PerdaCargaContinua}
            />
            <Stack.Screen
              name="VelocidadeDaTubulacao"
              component={VelocidadeDaTubulacao}
            />
            <Stack.Screen
              name="DiametroEconomico"
              component={DiametroEconomico}
            />
            <Stack.Screen
              name="PerdaCargaLocalizada"
              component={PerdaCargaLocalizada}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white", 
  },
};

function CustomDrawerContent({ isMenuOpen, toggleMenu, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <StatusBar style="light" backgroundColor="#007B8F" />
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
            fontFamily: "Montserrat-Bold",
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

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        drawerActiveBackgroundColor: "#007B8F", 
        drawerActiveTintColor: "#fff", 
        labelStyle: {
          fontFamily: "Montserrat-Bold", 
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
              size={focused ? 30 : 25}
              color={color}
            />
          ),
           headerStyle: {
            backgroundColor: "#007B8F",
          },
          headerTintColor: "white"
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
              size={focused ? 30 : 25}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: "#007B8F",
          },
          headerTintColor: "white",
        }}
      />
      <Drawer.Screen
        name="Politica de Privacidade"
        component={PoliticaPrivacidade}
        options={{
          drawerLabel: "Política de Privacidade",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="document-text"
             size={focused ? 30 : 25}
            color={color} />
          ),
          headerStyle: {
            backgroundColor: "#007B8F",
          },
          headerTintColor: "white",
        }}
      />
      <Drawer.Screen
        name="Ajuda"
        component={Ajuda}
        options={{
          drawerLabel: "Ajuda",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="help-circle-outline" 
            size={size} 
            color={color} />
          ),
          headerStyle: {
            backgroundColor: "#007B8F",
          },
          headerTintColor: "white",
        }}
      />
    </Drawer.Navigator>
  );
}

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
        onPress={() => navigation.navigate("DiametroEconomico")}
      >
        <Text style={styles.buttonText}>Diâmetro econômico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PerdaCargaContinua")}
      >
        <Text style={styles.buttonText}>Perda De Carga</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VelocidadeDaTubulacao")}
      >
        <Text style={styles.buttonText}>Velocidade da tubulação</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

function Footer() {
  return (
    <View style={styles.footerContainer}>
       <Image
        source={require("./src/Imagens/logoFooter.png")} 
        style={styles.footerImagem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007B8F",
    margin: 10,
    borderRadius: 20,
    width: "90%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    bottom: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "Montserrat-Bold",
  },
  footerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007B8F",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  footerImagem: {
    width: "50%",
    height: "70%",
    resizeMode: "contain"
  },
});
export default App;