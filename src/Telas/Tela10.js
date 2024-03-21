import React from "react";
import { StatusBar } from "expo-status-bar";
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
import Ionicons from "react-native-ionicons";

const windowWidth = Dimensions.get("window").width;

export default function Tela10() {

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.sobrePolitica}>POLÍTICA DE</Text>
            <Text style={styles.privacidade}>PRIVACIDADE</Text>
            <Text style={styles.resumo}>
              A privacidade dos usuários é uma prioridade para nós.
              Comprometemo-nos a respeitar a privacidade dos visitantes do site
              calc. hidraulicos e de outros sites sob nossa gestão. Coletamos
              informações pessoais apenas quando necessário, agindo de maneira
              justa e legal, com o consentimento do usuário. Informamos
              claramente os motivos da coleta e como os dados serão utilizados.
              As informações coletadas são retidas pelo tempo necessário para
              fornecer o serviço solicitado, sendo armazenadas de forma segura
              para evitar perdas, roubos ou acesso não autorizado. Não
              compartilhamos publicamente informações pessoais, exceto quando
              exigido por lei. O site pode conter links para sites externos,
              sobre os quais não temos controle nem responsabilidade por suas
              políticas de privacidade. Os usuários têm o direito de recusar o
              fornecimento de informações pessoais, compreendendo que isso pode
              limitar o acesso a determinados serviços. O uso contínuo do site é
              considerado como aceitação das práticas de privacidade. Dúvidas
              sobre o tratamento de dados podem ser esclarecidas através de
              contato. O serviço Google AdSense usado para veicular anúncios
              utiliza cookies para exibir anúncios relevantes e limitar sua
              frequência. Anúncios são utilizados para custear o funcionamento
              do site. Cookies de publicidade rastreiam interesses do usuário de
              forma anônima para apresentar anúncios relevantes. Parceiros
              afiliados podem receber créditos pela promoção de produtos ou
              serviços. O compromisso do usuário envolve o uso adequado dos
              conteúdos e informações, não se envolvendo em atividades ilegais
              ou prejudiciais. O usuário não deve disseminar conteúdo
              prejudicial, como racismo, xenofobia, pornografia ilegal ou
              apologia ao terrorismo. Danos aos sistemas físicos e lógicos do
              site são proibidos. Esperamos que estas informações estejam
              esclarecedoras. A política é efetiva a partir de 4 de março de
              2024 às 11:50.
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </LinearGradient>
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
  sobrePolitica: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: "bold",
    height: 640,
    padding: -20
  },
  privacidade: {
    marginTop: -600,
    fontSize: 34,
    fontWeight: "bold",
    height: 620,
    color: "#007B8F"
  },
  resumo: {
    marginTop: -550,
    fontSize: 16,
    textAlign: "justify",
    paddingHorizontal: 15,
    width: windowWidth * 0.9,
    marginRight: 15,
  },
});
