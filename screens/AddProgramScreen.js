//@flow
import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Picker,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import ProgramService from "../services/ProgramService";
import { AsyncStorage } from "react-native";
import DefaultProgramService from "../services/DefaultProgramService";

var programsList = [];
class AddProgramScreen extends React.Component {
  constructor() {
    super();
    this.ProgramService = new ProgramService();
    this.DefaultProgramService = new DefaultProgramService();
    this.state = {
        json: this.componentDidMount(2),
      quantidade: 0,
      date: null,
      programa: null,
      user: ""
    };
  }

  static navigationOptions = {
    title: "Cadastrar Milhas",
    headerTitleStyle: {
      textAlign: "left",
      flex: 1
    }
  };

  setProgramsDefault = async (res) => {
    programsList = [];
    var list = await this.DefaultProgramService.getDefaultPrograms();
    if(list != false){
        this.setState({ user: res })
        for (i in list) {
            programsList.push(list[i].nome);
        }
    }else{
        Alert.alert(
            "Falha",
            "Ocorreu um erro durante o cadastro das milhas, favor verificar sua conexão com a internet",
            [{ text: "OK" }]
        );
    }
    
  };

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  componentDidMount(index) {
    AsyncStorage.getItem("login", (err, result) => {}).then(res => {
      this.setProgramsDefault(res);
    });
  }

  addProgram = async () => {
    if (
      this.state.quantidade != 0 &&
      this.state.programa != null &&
      this.state.date != null
    ) {
      var res = await this.ProgramService.addProgram(
        this.state.programa,
        this.state.user,
        this.state.quantidade,
        this.state.date
      );
      if (res != false) {
        Alert.alert("Sucesso", "Milhas adicionadas com sucesso", [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("MilesList")
          }
        ]);
      } else {
        Alert.alert(
          "Falha",
          "Ocorreu um erro durante o cadastro das milhas, favor verificar sua conexão com a internet",
          [{ text: "OK" }]
        );
      }
    } else {
      Alert.alert(
        "Atenção",
        "Para cadastrar milhas, é necessário preencher todos os campos",
        [{ text: "OK" }]
      );
    }
  };

  render() {
    return (
      <View style={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <KeyboardAvoidingView behavior="padding" style={{ marginTop: 55 }}>
          <View style={styles.inputView}>
            <Picker
              selectedValue={this.state.programa}
              style={{ height: 40, width: 300, itemStyle: "white" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ programa: itemValue })
              }
            >
              {programsList.map((itemValue, itemIndex) => {
                return (
                  <Picker.Item
                    label={itemValue}
                    value={itemValue}
                    key={itemValue}
                  />
                );
              })}
            </Picker>
          </View>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          behavior="padding"
          style={{ justifyContent: "space-between", marginTop: 15 }}
        >
          <View style={styles.inputView}>
            <TextInput
              returnKeyType="done"
              keyboardType="numeric"
              placeholder="Quantidade"
              underlineColorAndroid={"#0000"}
              onChangeText={TextInput => {
                this.setState({ quantidade: TextInput });
              }}
            />
          </View>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" style={{ marginTop: 15 }}>
          <View style={styles.inputView}>
          <TextInput
                underlineColorAndroid={"#0000"}
                style={styles.textStyle}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Data de vencimento"
                onChangeText={TextInput => this.setState({ date: TextInput })}
              />
          </View>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" style={{ marginTop: 100 }}>
        <View style={styles.inputView}>
            <TouchableOpacity
                viewStyle={{
                  flex:1,
                }}
                onPress={this.addProgram}>
                  <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>
                    Salvar
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
      fontSize: 16,
      color: "black",
      textAlign: "left"
    },
    view: {
      flexDirection: "column",
      justifyContent: "space-between"
    },
    inputView: {
        borderRadius: 4,
        marginTop: 30,
        padding: 10,
        backgroundColor: '#083b66',
        width: Dimensions.get("window").width * 0.7
      },
    styleTitle: {
      width: Dimensions.get("window").width * 0.5,
      height: Dimensions.get("window").height * 0.3
    }
  });

export default AddProgramScreen;
