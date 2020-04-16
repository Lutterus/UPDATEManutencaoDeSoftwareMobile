//@flow
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
//import PasswordService from "../services/PasswordService";

type State = {
  email: string
};

type Props = {
  navigation: NavigationScreenProp<{}>
};

class PasswordContainer extends React.Component<Props, State> {
  PasswordService;
  constructor(props: Props) {
    super(props);
    //this.passwordService = new PasswordService();
    this.state = {
      email: ""
    };
  }

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  resetEmail = async () => {
    if (this.state.email != "") {
      var res = false//await this.passwordService.resetPassword(this.state.email);
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
          alignItems: "center"
        }}
      >
        <CardView style={styles.inputView}>
          <TextInput
            placeholder="Email"
            underlineColorAndroid={"#0000"}
            returnKeyType="done"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={TextInput => this.setState({ email: TextInput })}
          />
        </CardView>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            marginBottom: 50,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <CardButton
            viewStyle={{
              justifyContent: "center",
              marginVertical: 20,
              width: Dimensions.get("window").width * 0.5,
              backgroundColor: "#083b66"
            }}
            textStyle={{ fontSize: 16, color: "white" }}
            text="Enviar"
            onPress={() => this.resetEmail()}
          />
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
    padding: 10
  },
  signUp: {
    color: "#083b66",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold"
  }
});

export default PasswordContainer;
