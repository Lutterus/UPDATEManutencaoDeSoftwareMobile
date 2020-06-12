//@flow
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ImageBackground,
  Dimensions
} from "react-native";
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/FontAwesome";
import MilesService from "../services/MilesService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';

class MilesListScreen extends React.Component {
  constructor() {
    super();
    this.MilesService = new MilesService();
    this.state = {
      milesList: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "MILHAS",
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
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontWeight: 'bold', color: '#15415E', fontSize: 20 }}>Sair</Text>
          </TouchableOpacity>
        </View>

      ),
      headerRight: () => (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}
            onPress={() => navigation.navigate("AddProgram")}
          >
            <Icon name={"plus"} size={20} color="#15415E" />
          </TouchableOpacity>
        </View>
      ),
    };
  };
  _start() {
    Font.loadAsync({
      Trebuchetms: require('../assets/images/trebuchet-ms.ttf')
    })

    AsyncStorage.getItem("login", (err, result) => { }).then(res => {
      this.updateMilesList(res);
    });
  }

  _end() {
  }

  updateMilesList = async (currentUser) => {
    var list = await this.MilesService.listMiles(currentUser);
    if (list === false) {
      Alert.alert(
        "Erro durante o login",
        "Alguma das credenciais está incorreta",
        [{ text: "OK" }]
      );
    } else {
      this.setState({ milesList: list });
    }

  };

  saveStateBeforeLaunch = async (program_Name) => {
    // Persisting data
    try {
      await AsyncStorage.setItem('nome_programa', program_Name);
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate("DetailProgram");
  }

  render() {
    return (
      <View style={styles.viewBackground}>

        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />

        <ImageBackground source={require("../assets/images/airport_blur.png")}
          style={styles.imageBackGround}>

          {this.state.milesList.length === 0 ? (

            <View style={styles.textBox}>
              <Text style={styles.text}>
                Não foi possível encontrar milhas nesta conta
                </Text>
            </View>

          ) : (

              <FlatList
                data={this.state.milesList}
                renderItem={({ item }) => (

                  <View style={styles.entireBoxView}>
                    <TouchableOpacity
                      onPress={() => this.saveStateBeforeLaunch(item.nome)}
                    >
                      <View style={styles.entireBox}>

                        <View style={styles.boxImageView}>
                          {item.nome === "Smiles" &&
                            <Image style={styles.boxLogo}
                              source={require("../assets/images/Smiles-logo.png")}
                            />
                          }
                          {item.nome === "Livelo" &&
                            <Image style={styles.boxLogo}
                              source={require("../assets/images/Livelo-logo.png")}
                            />
                          }
                          {item.nome === "Azul" &&
                            <Image style={styles.boxLogo}
                              source={require("../assets/images/Azul-logo.png")}
                            />
                          }

                        </View>

                        <View style={styles.boxTextView}>

                          <View style={styles.boxTextView}>
                            <Text style={styles.textTotal}>
                              Total: {item.somaMilhas}
                            </Text>
                          </View>

                          <View style={styles.boxTextView}>
                            <Text style={styles.textExpire}>
                              Vencem em: ?
                            </Text>
                          </View>

                        </View>
                      </View>

                    </TouchableOpacity>
                  </View>

                )}
                keyExtractor={item => item.nome}
              />

            )}

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1
  },
  imageBackGround: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    flexWrap: 'wrap',
    color: "#083b66",
    fontWeight: 'bold',
    margin: 10,
  },
  entireBoxView: {
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    backgroundColor: 'rgba(70,97,116, 0.3)',
    borderRadius: 10
  },
  entireBox: {
    flexDirection: "row",
    marginTop: 10,
    margin: 10,
    height: Dimensions.get("window").width * 0.3,
  },
  boxImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginHorizontal: 20,
    resizeMode: "cover",
  },
  boxTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  textTotal: {
    textAlign: 'center',
    fontSize: 22,
    flexWrap: 'wrap',
    color: "#083b66",
    fontWeight: 'bold',
    fontFamily: 'Trebuchetms'
  },
  textExpire: {
    textAlign: 'center',
    fontSize: 14,
    flexWrap: 'wrap',
    color: "#083b66",
    fontStyle: 'italic',
    fontFamily: 'Trebuchetms'
  }

});

export default MilesListScreen;
