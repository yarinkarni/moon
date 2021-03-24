import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { MoonsiteStore } from '../store/MoonsiteStore'
import { observer, inject } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
// const hydrate = create({
//   storage: AsyncStorage,
// });

// const GetHydrate = async () => {
//   await hydrate('userData', MoonsiteStore).then(() =>
//     console.log('Get data from store'),
//   );
// }
// componentDidMount = async () => {
//   await GetHydrate()
// }
// @inject("MoonsiteStore")
// @observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: null, };
  }
  initUser = (token) => {
    console.log(token, 'token')
    fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture.type(large),cover&access_token=${token}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, 'json')
        this.setState({ userInfo: json })
        user.name = json.name
        user.id = json.id
        console.log(user, 'user')
      })
      .catch(() => {
        alert('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  render() {
    console.log(this.state.userInfo?.picture.data.url, 'this.state.userInfo?.picture.data.url')
    return (
      <View style={styles.Container}>
        <Text>
          Welcome Stranger!
          </Text>
        {/* 'https://graph.facebook.com/' + friend.id + '/picture?type=large' */}
        {this.state.userInfo?.picture.data.url ?
          <Image style={{ height: 100, width: 100, borderRadius: 50 }}
            source={{ uri: this.state.userInfo?.picture.data.url }}
          /> : <Text>cosilamlam</Text>
        }
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
                  this.initUser(accessToken)
                })
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
      </View>
    )
  }
}

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