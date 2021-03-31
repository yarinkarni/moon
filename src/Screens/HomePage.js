import React, { Component } from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import MovieStore from '../Store/MovieStore'
import { observer, inject } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
import { Api } from '../Apis/Api'
import MovieList from '../Components/MovieList'
const hydrate = create({
  storage: AsyncStorage,
});
const GetHydrate = async () => {
  await hydrate('userData', MovieStore).then(() =>
    console.log('Get data from store'),
  );
}
@inject("MovieStore")
@observer
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }
  componentDidMount = async () => {
    await GetHydrate()
    const { MovieStore } = this.props
    const res = await Api();
    res.results && MovieStore.setMovies(res.results)
  }
  initUser = async (token) => {
    const { MovieStore } = this.props
    await fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture.type(large),cover&access_token=${token}`)
      .then((response) => response.json())
      .then((json) => {
        MovieStore.setUser(json)
        this.setState({ userInfo: json })
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  render() {
    const { MovieStore } = this.props
    return (
      <View style={styles.Container}>
        {MovieStore.getUser?.picture.data.url ?
          <>
            <Text style={styles.TextUser}>
              Welcome {MovieStore.getUser.name} !
          </Text>
            <Image style={styles.ImageUser}
              source={{ uri: MovieStore.getUser?.picture.data.url || null }}
            />
            <MovieList {...this.props} />
          </>
          :
          <>
            <Text style={styles.TextUser}>
              Welcome Stranger!
          </Text>
            <Image style={styles.ImageUser}
              source={require('../images/user.png')} />
            <Text>
              Please log in to continue
          </Text>
            <Text>
              to the awesomness
          </Text>
          </>}

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
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  this.initUser(accessToken)
                })
              }
            }
          }
          onLogoutFinished={() => {
            console.log("logout."),
              MovieStore.setUser(null),
              this.setState({ userInfo: null })
          }} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15
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
    top: 600,
    width: '45%',
    height: 30,
    margin: 20,
  },
  TextBotton: {
    backgroundColor: '#4267B2',
    margin: 20,
    borderRadius: 20,
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});