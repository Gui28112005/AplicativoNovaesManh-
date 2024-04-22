import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export default function SobreNos() {
  const handleButtonPress = () => {
    Linking.openURL("https://gruponovaes.com/");
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <StatusBar style="light" backgroundColor="#007B8F" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.sobre}>SOBRE</Text>
            <View style={styles.space}></View>
            <Text style={styles.nos}>NÓS</Text>
            <Text style={styles.resumo}>
              O Grupo Novaes lança seu aplicativo inovador de cálculos
              hidráulicos, simplificando processos complexos para profissionais
              do setor. Este avanço tecnológico reflete nosso compromisso com a
              inovação e sustentabilidade, proporcionando eficiência operacional
              e promovendo práticas ambientalmente responsáveis. Estamos
              confiantes de que esta ferramenta revolucionária transformará a
              abordagem dos profissionais em projetos hidráulicos, abrindo novas
              possibilidades no mercado.
            </Text>
            <TouchableOpacity
              style={styles.buttonSobre}
              onPress={handleButtonPress}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                SAIBA MAIS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
}

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.socialIcons}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://web.facebook.com/gruponovaes/?_rdc=1&_rdr")
          }
        >
          <FontAwesome name="facebook-square" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.instagram.com/grupo_novaes/")
          }
        >
          <FontAwesome
            name="instagram"
            size={30}
            style={styles.iconMargin}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.youtube.com/channel/UC0HGGKKsSjs9tDrGgZGUwnw"
            )
          }
        >
          <FontAwesome
            name="youtube"
            size={30}
            style={styles.iconMargin}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/company/gruponovaes")
          }
        >
          <FontAwesome
            name="linkedin"
            size={30}
            style={styles.iconMargin}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        © 2024 Grupo Novaes. Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  sobre: {
    marginTop: 20,
    fontSize: 40,
    // fontWeight: "bold",
    height: 620,
    marginRight: 105,
    fontFamily: "Montserrat-Bold",
  },
  nos: {
    marginTop: 20,
    fontSize: 40,
    // fontWeight: "bold",
    height: 620,
    marginTop: -622,
    marginLeft: 120,
    color: "#007B8F",
    marginRight: -30,
    fontWeight: "bold",
  },
  resumo: {
    marginTop: -540,
    fontSize: 19,
    textAlign: "justify",
    paddingHorizontal: 15,
    width: windowWidth * 0.97,
    marginRight: 0,
    fontFamily: "Montserrat-Regular",
  },
  buttonSobre: {
    backgroundColor: "#083C52",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
    marginVertical: 20,
    backgroundColor: "#007B8F",
    height: 80,
  },
  socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconMargin: {
    marginLeft: 15,
  },
  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 10, // ajuste conforme necessário
    fontFamily: "Montserrat-Bold",
  },
});
