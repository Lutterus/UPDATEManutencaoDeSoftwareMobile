//@flow
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import * as Font from 'expo-font';
import PasswordService from "../services/PasswordService";
import { HeaderBackButton } from 'react-navigation-stack';
import { NavigationEvents } from 'react-navigation';

class PasswordScreen extends React.Component {
  constructor() {
    super();
    this.PasswordService = new PasswordService();
    this.state = {
      email: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "RECUPERAR SENHA",
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

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  resetEmail = async () => {
    if (this.state.email != "") {
      var res = await this.passwordService.resetPassword(this.state.email);
      if (res === true) {
        Alert.alert(
          "Sucesso",
          "Para sua segurança, uma mensagem de confirmação foi enviada para seu email",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("Login")
            }
          ]
        );
      } else {
        Alert.alert(
          "Falha",
          "Ocorreu um erro enquanto procurávamos seu email",
          [{ text: "OK" }]
        );
      }
    } else {
      Alert.alert(
        "Atenção",
        "O campo do email não foi devidamente preenchido",
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
          </View>

          <View style={styles.middleGround}>
            <View style={styles.textInputView}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                underlineColorAndroid={"#0000"}
                returnKeyType="done"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={TextInput => this.setState({ email: TextInput })}
              />
            </View>

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

          <View style={styles.bottomGround}>
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
    flex: 1,
  },
  middleGround: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  bottomGround: {
    flex: 1,
  },
  textInputView: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 4,
    padding: 15,
    margin: 10
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

export default PasswordScreen;
