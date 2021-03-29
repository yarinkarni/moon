import React from 'react';
import { Provider } from 'mobx-react'
import MovieStore from './src/Store/MovieStore'
import Movie from './src/Screens/Movie'
import Login from './src/Screens/Login'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);
class App extends React.Component {
  render() {
    return (
      <Provider MovieStore={MovieStore}>
        <App2 />
      </Provider>
    );
  }
}
export default App;



const Stack = createStackNavigator();
const titleStyle = {
  title: 'Movies',
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    width: '80%',
    fontWeight: 'bold',
    textAlign: 'center',
  }
};
const App2 = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          title: titleStyle.title,
          headerStyle: titleStyle.headerStyle,
          headerTintColor: titleStyle.headerTintColor,
          headerTitleStyle: {
            width: '100%',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20
          }
        }} />
        <Stack.Screen name="Movie" component={Movie} options={{
          title: titleStyle.title,
          headerStyle: titleStyle.headerStyle,
          headerTintColor: titleStyle.headerTintColor,
          headerTitleStyle: {
            width: '80%',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}