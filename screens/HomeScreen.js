import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginService from "../services/LoginService";
import { AsyncStorage } from "react-native";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.LoginService = new LoginService();
    this.state = {
      showPassword: true,
      email: "fulano@hotmail.com",
      senha: "123"
    };
  }

  static navigationOptions = {
    header: () => false
  };

  togglePasswordHandler = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  loginTest = async () => {
    var res = await this.LoginService.login(this.state.email, this.state.senha);
    if (res === false) {
      Alert.alert(
        "Erro durante o login",
        "Alguma das credenciais está incorreta",
        [{ text: "OK" }]
      );
    } else {
      AsyncStorage.setItem("login", this.state.email);
      AsyncStorage.setItem("password", this.state.senha);
      console.log("AAAAAAAAAAAAA")
      //this.props.navigation.navigate("MilesList");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 4 / 5,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/*Logo*/}
        <View style={{ flex: 4 / 5 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.styleTitle}
          />
          <View style={{ width: 400, height: 2, backgroundColor: "#083b66" }} />
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Email */}
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.text}>E-mail</Text>
            <View style={styles.inputView}>
              <TextInput
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                underlineColorAndroid={"#0000"}
                style={styles.textStyle}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={TextInput => this.setState({ email: TextInput })}
              />
            </View>
          </KeyboardAvoidingView>

          {/* Senha */}
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.text}>Senha</Text>
            <View style={styles.inputView}>
              <TextInput
                returnKeyLabel="go"
                secureTextEntry={this.state.showPassword}
                underlineColorAndroid={"#0000"}
                style={styles.textStyle}
                autoCorrect={false}
                autoCapitalize="none"
                ref={input => (this.passwordInput = input)}
                onChangeText={TextInput => this.setState({ senha: TextInput })}
              />
              <Icon
                name={"eye-slash"}
                size={25}
                color="black"
                onPress={this.togglePasswordHandler}
              />
            </View>
          </KeyboardAvoidingView>

          {/* Botão de Login */}
          <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: "#083b66", marginVertical: 20, width: Dimensions.get("window").width * 0.4}}>
            <TouchableOpacity
                viewStyle={{
                  flex:1,
                }}
                onPress={this.loginTest}>
                  <Text style={{ fontSize: 16, color: "white" }}>
                    Login
                  </Text>
              </TouchableOpacity>
          </View>
          

          {/* Cadastre-se */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreateAccount")}
          >
            <Text style={styles.signUp} viewStyle={{ marginTop: 40 }}>
              Criar uma conta
            </Text>
          </TouchableOpacity>

          {/* Esqueci minha senha */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Password")}
          >
            <Text style={styles.signUp} viewStyle={{ marginTop: 40 }}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#083b66",
    fontSize: 22,
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "bold",
    width: Dimensions.get("window").width * 0.7,
    marginTop: 10,
  },
  inputView: {
    borderRadius: 4,
    padding: 2,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    flex: 1
  },
  signUp: {
    color: "#083b66",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold"
  },
  styleTitle: {
    width: Dimensions.get("window").width * 1.1,
    height: Dimensions.get("window").height * 0.3
  },
});

export default HomeScreen;