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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MilesService from "../services/MilesService";
import { AsyncStorage } from "react-native";

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
      title: "Milhas",
      headerLeft: () => false,
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
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

  componentDidMount () {

    AsyncStorage.getItem("login", (err, result) => {}).then(res => {
        this.updateMilesList(res);
    });
  }

  updateMilesList = async (currentUser) => {
    var list = await this.MilesService.listMiles(currentUser);
    if(list === false){
        Alert.alert(
            "Erro durante o login",
            "Alguma das credenciais está incorreta",
            [{ text: "OK" }]
        );
    }else{
        this.setState({ milesList: list });
    }
    
  };

  saveStateBeforeLaunch(program_Name) {
    AsyncStorage.setItem("nome_programa", program_Name);
    this.state.navigation.navigate("DetailProgram");
  }

  render() {
    if(this.state.milesList.length!=0){
      return (
        <View>
          <FlatList
            data={this.state.milesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.saveStateBeforeLaunch(item.nome)}
              >
                <View style={styles.generalView}>
                    <View style={{ flex: 0.6, borderColor: "#083b66", borderWidth: 1, borderRadius: 10}}>
                        <Image
                        style={styles.image}
                        borderRadius={20}
                        //source={{ uri: this.state.milesList.programa_default.imagem }}
                        />
                    </View>
                    <View style={styles.columnView}>
                        <View style={{ flex: 1}}>
                        <Text style={styles.programName}> {this.state.milesList.nome} </Text>
                        </View>
                        <View style={{ flex: 0.3}}>
                        <Text style={styles.date}>
                            ? vencem em ?
                        </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.miles}>
                        <Text style ={{fontSize: 14, color: "darkgray"}}> total: </Text>
                        {this.state.milesList.somaMilhas}
                        </Text>
                    </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.nome}
          />
        </View>
      );
    }else{
      return (
        <View>
          <FlatList
            data={[{key: "Não encontramos milhas nesta conta"}]}
            renderItem={({item}) => <Text style={styles.programName}>{item.key}</Text>}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    programName: {
      fontSize: 24,
      textAlign: 'center',
      margin: 10,
      color: "#083b66",    
      fontWeight: 'bold'
    },
    generalView: {
        flexDirection: "row",
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "white",
        marginHorizontal: 10    
      },
    
      image: {     
        width: 64, 
        height: 64, 
        margin: 10,
        resizeMode: 'contain'
      },
      
      columnView: { 
        flexDirection: "column",
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
      },
    
      programName: {
        fontSize: 24,
        textAlign: 'auto',
        margin: 10,
        color: "#083b66",    
        fontWeight: 'bold'
      },
    
      date: {
        fontSize: 10,
        textAlign: 'center',
        height: 30,
        color: 'darkgray',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#083b66"
      },
    
      miles: {
        fontSize: 30,
        textAlign: 'center',
        color: "#083b66",
        fontWeight: 'bold'
      }
  });

export default MilesListScreen;
