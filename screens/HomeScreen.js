import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ImageBackground
} from "react-native";
import LoginService from "../services/LoginService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';

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

  _start = async () => {
  }

  _end() {
  }

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
      this.props.navigation.navigate("MilesList");
    }
  };

  render() {
    return (
      <View style={styles.viewBackground}>

        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />

        <View style={styles.upperGround}>
          <View style={styles.imageView}>
            <Image style={styles.image}
              source={require("../assets/images/passport.png")}
            />
          </View>
        </View>

        <View style={styles.middleGround}>

          <View style={{ flex: 0.15 }}>
            <ImageBackground source={require("../assets/images/waves-left.png")}
              style={styles.image}>
            </ImageBackground>
          </View>

          <View style={styles.insideMiddleGround}>

            <View style={styles.logoView}>
              <Image style={styles.image}
                source={require("../assets/images/logo.jpg")}
              />
            </View>

            <View style={styles.inputsView}>
              <Text style={styles.text}>E-mail</Text>
              <View style={styles.inputView}>
                <TextInput
                  returnKeyLabel="next"
                  underlineColorAndroid={"#0000"}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(email) => { this.setState({ email }) }}
                  value={this.state.email}
                />
              </View>
            </View>

            <View style={styles.inputsView}>
              <Text style={styles.text}>Senha</Text>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  underlineColorAndroid={"#0000"}
                  returnKeyType="next"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(senha) => { this.setState({ senha }) }}
                  value={this.state.senha}
                />
              </View>
            </View>

            <View style={styles.buttonView}>
              <ImageBackground source={require("../assets/images/button.png")} style={styles.imageBackGround}>
                <TouchableOpacity Style={styles.button}
                  onPress={this.loginTest}>
                  <Text style={styles.buttonText}>
                    ENTRAR
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </View>

          <View style={{ flex: 0.15 }}>
            <ImageBackground source={require("../assets/images/waves-right.png")}
              style={styles.image}>
            </ImageBackground>
          </View>

        </View>

        <View style={styles.lowerGround}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreateAccount")}
          >
            <Text style={styles.textButton}>
              Cadastre-se
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Password")}
          >
            <Text style={styles.textButton}>
              Esqueci minha senha
              </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageBackGround: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
  middleGround: {
    flex: 1.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insideMiddleGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get("window").width * 0.5
  },
  inputsView: {
    flex: 1,
  },
  text: {
    paddingLeft: 15,
    fontSize: 14,
    flexWrap: 'wrap',
    color: "grey",
    fontStyle: 'italic',
  },
  inputView: {
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 4,
    padding: 12,
    borderColor: "#15415E",
    borderWidth: 1,
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
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButton: {
    textAlign: "center",
    color: "#15415E",
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  },
  line: {
    borderTopColor: "#15415E",
    borderTopWidth: 2,
    borderRadius: 1,
    width: Dimensions.get("window").width * 0.85,
  },
  lowerGround: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;