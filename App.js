import React from 'react';
import { Provider } from 'mobx-react'
import Login from './src/component/Login'
import MoonsiteStore from './src/store/MoonsiteStore'
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
