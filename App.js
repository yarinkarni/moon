import React from 'react';
import { Provider } from 'mobx-react'
import { MoonsiteStore } from './src/store/MoonsiteStore'
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
const App: () => Node = () => {
  initUser = (token) => {
    console.log(token, 'token')
    fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture,cover&access_token=${token}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, 'json')
        user.name = json.name
        user.id = json.id
        console.log(user, 'user')
      })
      .catch(() => {
        alert('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  return (
    <View style={styles.Container}>
      <Text>
        Welcome Stranger!
          </Text>
      <Text>
        Please log in to continue
          </Text>
      <Text>
        to the awesomness
          </Text>
      <LoginButton
        publishPermissions={['publish_actions']}
        readPermissions={['public_profile']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              console.log(result)
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data, "data")
                const { accessToken } = data
                initUser(accessToken)
              })
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
