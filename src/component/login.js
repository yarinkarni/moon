import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import MoonsiteStore from '../store/MoonsiteStore'
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
    return (
      <View style={styles.Container}>
        {this.state.userInfo?.picture.data.url ?
          <Text style={styles.TextUser}>
            Welcome {this.state.userInfo.name} !
          </Text>
          :
          <Text style={styles.TextUser}>
            Welcome Stranger!
          </Text>}

        {this.state.userInfo?.picture.data.url ?
          <Image style={styles.ImageUser}
            source={{ uri: this.state.userInfo?.picture.data.url }}
          /> : <Image style={styles.ImageUser}
            source={require('../images/user.png')} />
        }
        <Text>
          Please log in to continue
          </Text>
        <Text>
          to the awesomness
          </Text>
        {/* <TouchableOpacity
          style={styles.LoginButton}
        // onPress={this.handleFacebookLogin}
        // title="Continue with fb"
        >
          <Text style={styles.TextBotton}>Press Here</Text>
        </TouchableOpacity> */}
        {/* <Button
          icon={<Icon name="facebook-box" size={32} color="white" />}
          buttonStyle={styles.LandingButtonFacebook}
          title="continue with Facebook"
          titleStyle={styles.LandingBtnText}
          type="solid"
          onPress={() => loginWithFacebook()}
        /> */}
        <LoginButton
          style={styles.LoginButton}
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
  TextUser: {
    fontSize: 24,
    fontWeight: '600',
  },
  ImageUser: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 30
  },
  LoginButton: {
    position: 'absolute',
    top: 650,
    right: 0,
    width: '45%',
    height: 30,
    margin: 20,
  },
  TextBotton: {
    backgroundColor: '#4267B2',

  }
});