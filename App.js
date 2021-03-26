import React from 'react';
import { Provider } from 'mobx-react'
import Login from './src/Screens/Login'
import MoonsiteStore from './src/Store/MoonsiteStore'
class App extends React.Component {
  render() {
    return (
      <Provider MoonsiteStore={MoonsiteStore}>
        <Login />
      </Provider>
    );
  }
}
export default App;
