//@flow
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity
} from "react-native";
import PasswordService from "../services/PasswordService";

class PasswordScreen extends React.Component {
  constructor() {
    super();
    this.PasswordService = new PasswordService();
    this.state = {
        email: ""
    };
  }

  static navigationOptions = {
    title: "Esqueci minha senha",
    headerTitleStyle: {
      textAlign: "left",
      flex: 1,
      color: "#083b66"
    }
  };

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
      <View
        style={{
          flex: 6,
          alignItems: "center",
          justifyContent:'center'
        }}
      >
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            underlineColorAndroid={"#0000"}
            returnKeyType="done"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={TextInput => this.setState({ email: TextInput })}
          />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            marginBottom: 50,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
        <View style={styles.inputView}>
            <TouchableOpacity
                viewStyle={{
                  flex:1,
                }}
                onPress={this.resetEmail}>
                  <Text style={{ fontSize: 16, color: "white" }}>
                    Login
                  </Text>
            </TouchableOpacity>
        </View>    
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
      color: "black",
      fontSize: 18,
      textAlign: "left",
      alignSelf: "stretch"
    },
    inputView: {
      borderRadius: 4,
      marginTop: 30,
      padding: 10,
      backgroundColor: '#083b66',
      width: Dimensions.get("window").width * 0.7
    },
    signUp: {
      color: "#083b66",
      fontSize: 13,
      textAlign: "center",
      marginBottom: 5,
      fontWeight: "bold"
    }
  });  

export default PasswordScreen;
