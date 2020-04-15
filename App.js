import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
//import MilesList from "./screens/MilesList";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  //MilesList: { screen: MilesList },
});

const App = createAppContainer(MainNavigator);

export default App;