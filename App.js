import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen";
import MilesListScreen from "./screens/MilesListScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import PasswordScreen from "./screens/PasswordScreen";
import AddProgramScreen from './screens/AddProgramScreen';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  MilesList: { screen: MilesListScreen },
  CreateAccount: { screen: CreateAccountScreen },
  Password: { screen: PasswordScreen },
  AddProgram: { screen: AddProgramScreen },
  
});

const App = createAppContainer(MainNavigator);

export default App;