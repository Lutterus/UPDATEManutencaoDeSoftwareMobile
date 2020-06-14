//@flow
import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Picker,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground
} from "react-native";
import * as Font from 'expo-font';
import EditMilesService from "../services/EditMilesService";
import ExcludeMilesService from "../services/DeleteMilesService";
import GetMileService from "../services/GetMileService";
import DefaultProgramsService from "../services/DefaultProgramService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import { HeaderBackButton } from 'react-navigation-stack';

class EditMilesListScreen extends React.Component {
  constructor() {
    super();
    this.EditMilesService = new EditMilesService();
    this.ExcludeMilesService = new ExcludeMilesService();
    this.GetMileService = new GetMileService();
    this.DefaultProgramsService = new DefaultProgramsService();
    this.state = {
      quantidade: "",
      date: "",
      programa: "",
      programsList: [],
      accountLogin: "",
      mile: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "EDITAR",
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
    AsyncStorage.getItem("login", (err, result) => { }).then(res => {
      AsyncStorage.getItem("miles", (err, result) => { }).then(res2 => {
        this.setState({ accountLogin: res })
        this.setState({ mile: res2 })
        this.getMile();
      });
    });

  }

  _end() {
  }

  getMile = async () => {
    const res = await this.GetMileService.getMile(this.state.mile, this.state.accountLogin);
    const list = await this.DefaultProgramsService.getDefaultPrograms();
    this.setState({ quantidade: res.quantidade });
    this.setState({ date: res.expiracao });
    this.setState({ programa: res.nomePrograma });
    this.setState({ programsList: list })
  };

  buttonMethodExclude = async () => {
    var res = await this.ExcludeMilesService.excludeMile(this.state.mile, this.state.accountLogin, this.state.programa);

    if (res === false) {
      console.log("false")
    }

    Alert.alert("Sucesso", "Milhas excluídas com sucesso", [
      {
        text: "OK",
        onPress: () => this.props.navigation.navigate("MilesList")
      }
    ]);
  };

  buttonMethodSave = async () => {
    if (
      this.state.quantidade != 0 &&
      this.state.programa != null &&
      this.state.date != null
    ) {
      var res = await this.EditMilesService.editMile(
        this.state.mile,
        this.state.accountLogin,
        this.state.quantidade,
        this.state.date,
        this.state.programa
      );

      if (res === false) {
        console.log("false")
      }

      Alert.alert("Sucesso", "Milhas editadas com sucesso", [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("MilesList")
        }
      ]);

    } else {
      Alert.alert(
        "Atenção",
        "Para editar milhas, é necessário que todos os campos estejam preenchidos",
        [{ text: "OK" }]
      );
    }
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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

            <View style={styles.inputView}>
              <Picker
                style={{ itemStyle: "black" }}
                selectedValue={this.state.programa}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ programa: itemValue })
                }
              >
                {this.state.programsList.map((itemValue, itemIndex) => {
                  return (
                    <Picker.Item
                      label={itemValue.nome}
                      value={itemValue.nome}
                      key={itemValue.nome}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.inputView}>
              <DatePicker
                style={{ width: Dimensions.get("window").width * 0.6 }}
                date={this.state.date}
                mode="date"
                placeholder="Data de Vencimento"
                format="YYYY-MM-DD"
                confirmBtnText="Ok"
                cancelBtnText="Cancelar"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  },
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                returnKeyLabel="go"
                underlineColorAndroid={"#0000"}
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(quantidade) => { this.setState({ quantidade }) }}
                value={this.state.quantidade}
              />
            </View>

          </View>

          <View style={styles.bottomGround}>

            <View style={styles.buttonView}>
              <ImageBackground source={require("../assets/images/button.png")} style={styles.imageBackGround}>
                <TouchableOpacity Style={styles.button}
                  onPress={this.buttonMethodExclude}>
                  <Text style={styles.buttonText}>
                    EXCLUIR
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={styles.buttonView}>
              <ImageBackground source={require("../assets/images/button.png")} style={styles.imageBackGround}>
                <TouchableOpacity Style={styles.button}
                  onPress={this.buttonMethodSave}>
                  <Text style={styles.buttonText}>
                    SALVAR
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackGround: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperGround: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: 'rgba(70,97,116, 0.3)',
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 4,
    padding: 15,
    margin: 10
  },
  bottomGround: {
    flex: 1,
    justifyContent: 'space-around',
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

export default EditMilesListScreen;
