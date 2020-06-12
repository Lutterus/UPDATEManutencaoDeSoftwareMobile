//@flow
import React from "react";
import DetailService from "../services/DetailService";
import DefaultProgramsService from "../services/DefaultProgramService";
import {
  AsyncStorage,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
import * as Font from 'expo-font';
import { NavigationEvents } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation-stack';

class DetailProgramScreen extends React.Component {
  constructor() {
    super();
    this.DetailService = new DetailService();
    this.DefaultProgramsService = new DefaultProgramsService();
    this.state = {
      detailList: [],
      programName: "Bird's Nest",
      programImage: "ABC"
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

    AsyncStorage.getItem("login", (err, result) => {}).then(res => {
      AsyncStorage.getItem("nome_programa", (err, result) => {}).then(res2 => {
        this.updateDetailList(res, res2);
      });
    });
  }

  _end() {
  }

  updateDetailList = async (currentUser, cod_program) => {
    const list = await this.DetailService.getUserProgramMiles(currentUser, cod_program);
    this.setState({ detailList: list });
  };

  buttonMethod(currentMile) {
    AsyncStorage.setItem("miles", currentMile.cod_milha.toString());
    this.props.navigation.navigate("EditMilesList");
  }

  render() {
    return (
      <View style={styles.viewBackground}>

        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />

        <ImageBackground source={require("../assets/images/airport_blur.png")}
          style={styles.imageBackGround}>

          <FlatList
            data={this.state.detailList}
            renderItem={({ item }) => (

              <View style={styles.entireBoxView}>
                <TouchableOpacity
                  onPress={() => this.buttonMethod(item)}
                >
                  <View style={styles.entireBox}>

                    <View style={styles.insideItemViewLeft}>
                      <Text style={styles.titleText}>Quantidade:</Text>
                      <Text style={styles.text}>{item.quantidade}</Text>
                    </View>

                    <View style={styles.insideItemViewRight}>
                      <Text style={styles.titleText}>Vencimento:</Text>
                      <Text style={styles.text}>{item.dt_expiracao}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.contaLogin}
            />
            
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
  entireBoxView: {
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    backgroundColor: 'rgba(70,97,116, 0.3)',
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
    borderRadius: 5
  },
  entireBox: {
    flexDirection: "row",
    marginTop: 10,
    margin: 10,
    height: Dimensions.get("window").width * 0.2,
  },
  insideItemViewLeft:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#083b66'
  },
  insideItemViewRight:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#083b66'
  },
  titleText:{
    textAlign: 'center',
    fontSize: 20,
    flexWrap: 'wrap',
    color: "#083b66",
    fontWeight: 'bold',
    fontFamily: 'Trebuchetms'
  },
  text:{
    textAlign: 'center',
    fontSize: 17,
    flexWrap: 'wrap',
    color: "#083b66",
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Trebuchetms'
  }
});

export default DetailProgramScreen;
