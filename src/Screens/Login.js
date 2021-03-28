import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import MoonsiteStore from '../Store/MovieStore'
import { observer, inject } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
import { Api } from '../Components/Api'
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';



const hydrate = create({
  storage: AsyncStorage,
});

const GetHydrate = async () => {
  await hydrate('userData', MoonsiteStore).then(() =>
    console.log('Get data from store'),
  );
}
componentDidMount = async () => {
  await GetHydrate()
}
@inject("MoonsiteStore")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      isModalVisible: false,
    };
  }
  componentDidMount = async () => {
    await GetHydrate()
  }
  initUser = (token) => {
    const { MoonsiteStore } = this.props
    fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture.type(large),cover&access_token=${token}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userInfo: json })
        MoonsiteStore.setUser(json)
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
      })
  }
  Movies = async () => {
    const { MoonsiteStore } = this.props
    const res = await Api();
    console.log(res, 'Movies')
    console.log(res.results.map(e => e.title), 'title')
    MoonsiteStore.setMovies(res.results.map(e => e.title), 'title')
    console.log(MoonsiteStore.getMovies, 'getMovies')
    return res;
  }
  ListMovies = () => {
    const { getMovies } = this.props.MoonsiteStore
    return getMovies.map((item, index) => {
      if (getMovies) {
        return (
          <ListItem itemDivider key={index}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Text>{item}</Text>
            </TouchableOpacity>
          </ListItem >
        )
      }
    }
    )
  }
  toggleModal = (index) => {
    const { isModalVisible } = this.state
    this.setState({ isModalVisible: !isModalVisible, index });
  };
  render() {
    const { MoonsiteStore } = this.props
    const { isModalVisible } = this.state
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
        {this.state.userInfo?.picture.data.url ?
          <TouchableOpacity
            onPress={this.Movies}>
            <Text style={styles.TextBotton}>Movies</Text>
          </TouchableOpacity>
          : <Text />}

        <Container >
          <Content>
            <List style={styles.ListMovies}>
              {this.ListMovies()}
            </List>
          </Content>
        </Container>

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
        <View style={styles.Container}>
          <Modal
            animationType='fade'
            transparent={true}
            isVisible={isModalVisible}>
            <View style={{ height: '10%', backgroundColor: 'rgba(100,200,200,0.6)', width: '100%' }}>
              <Text>שם הסרט</Text>
            </View>
            <View style={{ backgroundColor: 'white', width: '100%', height: '85%', alignItems: 'center' }}>
              {/* {this.ApprovalOfReports()} */}
            </View>
            <AntDesign
              name="closecircle"
              size={30}
              style={styles.closecircle}
              onPress={() => this.toggleModal()}
            />
          </Modal>
        </View>
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
    top: 650,
    right: 0,
    width: '45%',
    height: 30,
    margin: 20,
  },
  TextBotton: {
    backgroundColor: '#4267B2',
    margin: 20,
  },
  ListMovies: {
    // height: 700
    //width: '100%',


  },
  closecircle: {

    position: 'absolute',
    margin: 16,
    //top: 4,
    right: 0,
    bottom: 0,
  },
});