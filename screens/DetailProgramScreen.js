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
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
       title: "Milhas",
       headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontWeight: 'bold'
      },
       headerLeft: () => (
        <Icon
          style={{
            paddingHorizontal: 20,
            marginRight: 10,
          }}
          name='arrow-left'
          color='black'
          onPress={() => navigation.navigate("MilesList")} />
       ),
        headerRight: () => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              marginLeft: 10
            }}
            onPress={() => navigation.navigate("AddProgram")}
          >
            <Icon name={"plus"} size={20} color="black" />
          </TouchableOpacity>
        )
    };
  };

  componentDidMount() { 
      AsyncStorage.getItem("login", (err, result) => {}).then(res => {
        AsyncStorage.getItem("nome_programa", (err, result) => {}).then(res2 => {
          this.updateDetailList(res, res2);
        });
      });
  };

  updateDetailList = async (currentUser, cod_program) => {
    const list = await this.DetailService.getUserProgramMiles(currentUser, cod_program);
    this.setState({ detailList: list });
  };

  saveStateBeforeLaunch(currentMile) {
    AsyncStorage.setItem("miles", currentMile.cod_milha.toString());
    this.props.navigation.navigate("EditMilesList");
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList style={{flex:1, alignSelf: 'center', width: Dimensions.get("window").width * 0.8 }}
          data={this.state.detailList}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={() => this.saveStateBeforeLaunch(item)}>
              <View style={{flex: 1, flexDirection:'row', alignItems: "center", paddingTop: 10, marginHorizontal: 10 }}>
                <View style={{ flex: 1, alignItems: "center",backgroundColor: "#083b66", paddingVertical: 10, borderBottomLeftRadius: 20}}>
                    <Text style={styles.miles}>
                      {item.quantidade}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems:"center", backgroundColor:"#0d5fa3", paddingVertical: 10, borderBottomRightRadius: 20}}>
                    <Text style={styles.expiration}>
                      {item.dt_expiracao}
                    </Text>
                </View>
          </View> 
          </TouchableOpacity>          
        }
          keyExtractor={item => item.quantidade}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  programName: {
    top: 40,
    right: 15,
    fontSize: 25,
    fontWeight: "bold"
  },
  foregroundContainer: {
    width: Dimensions.get("window").width,
    height: 140,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  programImage: {
    width: 50,
    height: 50,
    marginHorizontal: 15
  },
  image: {
    width: 85,
    height: 64,
    margin: 10,
    resizeMode: "contain",
    //borderRadius: 10,
    borderWidth: 1,
    borderColor: "#083b66"
  }
});

export default DetailProgramScreen;
