import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Tela2 from "./src/Telas/Tela2";
import Tela3 from "./src/Telas/Tela3";
import Tela4 from "./src/Telas/Tela4";
import Tela5 from "./src/Telas/Tela5";
import Tela6 from "./src/Telas/Tela6";
import Tela7 from "./src/Telas/Tela7";
import Tela8 from "./src/Telas/Tela8";
import Tela9 from "./src/Telas/Tela9";
import Tela10 from "./src/Telas/Tela10";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Calculos Hidraulicos" component={Menu} />
        <Stack.Screen name="Perimetro" component={Tela2} />
        <Stack.Screen name="Q/V" component={Tela3} />
        <Stack.Screen name="Perda de Carga" component={Tela4} />
        <Stack.Screen name="Calculo de Darcy" component={Tela6} />
        <Stack.Screen name="Dimensionamento de Tubulação" component={Tela7} />
        <Stack.Screen name="Area" component={Tela8} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ isMenuOpen, toggleMenu, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#083C52",
          padding: 20,
          marginTop: -50,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Calculos Hidraulicos
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
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          drawerLabel: "Inicio",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Sobre Nós"
        component={Tela5}
        options={{
          drawerLabel: "Sobre Nós",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Politica de Privacidade"
        component={Tela10}
        options={{
          drawerLabel: "Politica de Privacidade",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ajuda"
        component={Tela9}
        options={{
          drawerLabel: "Ajuda",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
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
        <Text style={styles.buttonText}>Perimetro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Q/V")}
      >
        <Text style={styles.buttonText}>Q/V</Text>
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
        <Text style={styles.buttonText}>Calculo de Darcy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dimensionamento de Tubulação")}
      >
        <Text style={styles.buttonText}>Dimensionamento de Tubulação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Area")}
      >
        <Text style={styles.buttonText}>Calcular Área</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#083C52",
    margin: 10,
    borderRadius: 15,
    width: "80%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
  },
});

export default App;
