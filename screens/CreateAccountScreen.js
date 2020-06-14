//flow
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ImageBackground
} from "react-native";
import * as Font from 'expo-font';
import CreateAccountService from "../services/CreateAccountService";
import { AsyncStorage } from "react-native";
import LoginService from "../services/LoginService";
import { HeaderBackButton } from 'react-navigation-stack';
import { NavigationEvents } from 'react-navigation';

class CreateAccountScreen extends React.Component {
  constructor() {
    super();
    this.focusNextField = this.focusNextField.bind(this);
    this.CreateAccountService = new CreateAccountService();
    this.LoginService = new LoginService();
    this.state = {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      confirmaSenha: ""
    };
    this.inputs = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "CADASTRAR",
      headerTitleAlign: 'center',
      //header todo
      headerStyle: {
        backgroundColor: '#f7f6f6'
      },
      //cor dos 3 elementos
      headerTintColor: '#15415E',
      //style do titulo
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <HeaderBackButton tintColor={'#15415E'}
            onPress={() => navigation.goBack()} />
        </View>

      ),
      headerRight: () => (
        <View style={{ flex: 1 }}>
        </View>
      ),
    };
  };

  _start = async () => {
    console.log("antes de tudo")
    await Font.loadAsync({
      Trebuchetms: require('../assets/images/trebuchet-ms.ttf')
    })
  }

  _end() {
  }

  focusNextField(key) {
    this.inputs[key].focus();
  }

  onSubmitEditing = () => {
    this.focusNextField('next-field');
  }

  loginTest = async () => {
    AsyncStorage.setItem("login", this.state.email);
    AsyncStorage.setItem("password", this.state.senha);
    var res = await this.LoginService.login(this.state.email, this.state.senha);

    if (res === true) {
      this.props.navigation.navigate("MilesList");
    } else {
      Alert.alert(
        "Erro durante o login",
        "Alguma das credenciais está incorreta",
        [{ text: "OK" }]
      );
    }
  };

  CreateAccount = async () => {
    if (
      this.state.email != "" &&
      this.state.senha != "" &&
      this.state.telefone != "" &&
      this.confirmaSenha != "" &&
      this.state.senha === this.state.confirmaSenha
    ) {
      var res = await this.CreateAccountService.addUser(
        this.state.email,
        this.state.nome,
        this.state.telefone,
        this.state.senha
      );
      if (res === true) {
        Alert.alert("Sucesso", "Sua conta foi criada com sucesso", [
          { text: "OK", onPress: () => this.loginTest() }
        ]);
        this.props.navigation.navigate("Home");
      } else {
        Alert.alert(
          "Erro durante a criação",
          "Alguma das credenciais está incorreta ou ocorreu erro com sua conexão à internet",
          [{ text: "OK" }]
        );
      }
    } else if (this.state.senha != this.state.confirmaSenha) {
      Alert.alert(
        "Erro durante a criação",
        "As senhas preenchidas não são iguais",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Erro durante a criação",
        "Algum dos campos não foi preenchido",
        [{ text: "OK" }]
      );
    }
  };

  render() {
    return (
      <View style={styles.viewBackground}>

        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />

        <ImageBackground source={require("../assets/images/airport_blur.png")}
          style={styles.imageBackGround}>

          <View style={styles.upperGround}>
            <KeyboardAvoidingView style={styles.textInputView}>
              <TextInput
                returnKeyType="next"
                onSubmitEditing={() => { this.focusNextField('Email'); }}
                blurOnSubmit={false}
                underlineColorAndroid={"#0000"}
                placeholder="Nome"
                placeholderTextColor="#C7CCD0"
                onChangeText={TextInput => this.setState({ nome: TextInput })}
                ref={input => { this.inputs['Nome'] = input; }}
              />
            </KeyboardAvoidingView>

            <View style={styles.textInputView}>
              <TextInput
                onSubmitEditing={() => { this.focusNextField('Telefone'); }}
                ref={input => { this.inputs['Email'] = input; }}
                blurOnSubmit={false}
                returnKeyType="next"
                underlineColorAndroid={"#0000"}
                placeholder="Email"
                placeholderTextColor="#C7CCD0"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={TextInput => this.setState({ email: TextInput })}
              />
            </View>

            <View style={styles.textInputView}>
              <TextInput
                returnKeyType="next"
                placeholder="Telefone"
                placeholderTextColor="#C7CCD0"
                underlineColorAndroid={"#0000"}
                refInput={ref => { this.input = ref }}
                onSubmitEditing={() => { this.focusNextField('Senha') }}
                blurOnSubmit={false}
                onChangeText={TextInput => this.setState({ telefone: TextInput })}
                keyboardType="phone-pad"
                value={this.state.telefone}
              />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                onSubmitEditing={() => { this.focusNextField('ConfirmaSenha'); }}
                ref={input => { this.inputs['Senha'] = input; }}
                blurOnSubmit={false}
                placeholder="Senha"
                placeholderTextColor="#C7CCD0"
                secureTextEntry
                underlineColorAndroid={"#0000"}
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={TextInput => this.setState({ senha: TextInput })}
              />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                ref={input => { this.inputs['ConfirmaSenha'] = input; }}
                placeholder="Confirmar senha"
                placeholderTextColor="#C7CCD0"
                secureTextEntry
                underlineColorAndroid={"#0000"}
                returnKeyType="done"
                onChangeText={TextInput =>
                  this.setState({ confirmaSenha: TextInput })
                }
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>

          </View>

          <View style={styles.bottomGround}>
            <View style={styles.buttonView}>
              <ImageBackground source={require("../assets/images/button.png")} style={styles.imageBackGround}>
                <TouchableOpacity Style={styles.button}
                  onPress={() => this.CreateAccount()}>
                  <Text style={styles.buttonText}>
                    CADASTRE-SE
                </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1,
  },
  imageBackGround: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperGround: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputView: {
    backgroundColor: 'rgba(70,97,116, 0.3)',
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 4,
    padding: 15,
    margin: 10
  },
  bottomGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',

    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").height * 0.07,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  button: {
    flex: 1
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Trebuchetms'
  }
});

export default CreateAccountScreen;
