import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import MovieStore from '../Store/MovieStore'
import { observer, inject } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
import { Api } from '../Components/Api'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';


let url = 'https://image.tmdb.org/t/p/w500'

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
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }
  componentDidMount = async () => {
    await GetHydrate()
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
  Movies = async () => {
    const { MovieStore } = this.props
    const res = await Api();
    MovieStore.setMovies(res.results)
    return res;
  }
  ListMovies = () => {
    const { getMovies } = this.props.MovieStore
    const { navigation } = this.props;
    return getMovies.map((item, index) => {
      if (getMovies) {
        return (
          <ListItem itemDivider key={index}>
            <TouchableOpacity style={{ alignItems: 'center', width: '100%' }} onPress={() => navigation.navigate('Movie', { item })}
            >
              <Text>{item.title}</Text>
              <Image style={{ height: 100, width: 180, marginTop: 8 }} source={{ uri: url + item.poster_path }} />
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingVertical: 10, width: '100%' }} />
            </TouchableOpacity>
          </ListItem >
        )
      }
    }
    )
  }

  render() {
    const { MovieStore } = this.props
    return (
      <View style={styles.Container}>
        {MovieStore.User?.picture.data.url ?
          <Text style={styles.TextUser}>
            Welcome {MovieStore.User.name} !
          </Text>
          :
          <Text style={styles.TextUser}>
            Welcome Stranger!
          </Text>}
        {MovieStore.User?.picture.data.url ?
          <Image style={styles.ImageUser}
            source={{ uri: MovieStore.User?.picture.data.url }}
          /> : <Image style={styles.ImageUser}
            source={require('../images/user.png')} />
        }
        <Text>
          Please log in to continue
          </Text>
        <Text>
          to the awesomness
          </Text>
        {MovieStore.User ?
          <View style={{ width: 250, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={this.Movies}>
              <Text style={styles.TextBotton}>Movies</Text>
            </TouchableOpacity>
            <View style={{ height: 250 }}>
              <Container >
                <Content>
                  <List>
                    {this.ListMovies()}
                  </List>
                </Content>
              </Container>
            </View>
          </View> : <View />}
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
    right: 0,
    width: '45%',
    height: 30,
    margin: 20,
  },
  TextBotton: {
    backgroundColor: '#4267B2',
    margin: 20,
  },
});