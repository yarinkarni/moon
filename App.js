import React from 'react';
import { Provider } from 'mobx-react'
import MovieStore from './src/Store/MovieStore'
import Movie from './src/Screens/Movie'
import HomePage from './src/Screens/HomePage'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { YellowBox, StyleSheet } from "react-native";
YellowBox.ignoreWarnings([""]);
class App extends React.Component {
  render() {
    return (
      <Provider MovieStore={MovieStore}>
        <Screens />
      </Provider>
    );
  }
}
export default App;

const Stack = createStackNavigator();
const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{
          title: 'Movies',
          headerStyle: styles.headerStyle,
          headerTintColor: 'black',
          headerTitleStyle: styles.headerTitleStyle
        }} />
        <Stack.Screen name="Movie" component={Movie} options={{
          title: 'Movies',
          headerStyle: styles.headerStyle,
          headerTintColor: 'black',
          headerTitleStyle: styles.headerTitleStyle
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerTitleStyle: {
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
});