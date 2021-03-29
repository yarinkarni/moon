import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Content, List, ListItem, Text } from 'native-base';



let url = 'https://image.tmdb.org/t/p/w500'
@inject("MovieStore")
@observer
export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    }
  }
  AddFavoritesMovies = () => {
    const { item } = this.props.route.params
    const { MovieStore } = this.props
    MovieStore.setFavoritesMovies([...MovieStore.FavoritesMovies, item])
  }
  RemoveFavoritesMovies = () => {
    const { item } = this.props.route.params
    const { MovieStore } = this.props
    MovieStore.setFavoritesMovies(MovieStore.getFavoritesMovies.filter((e) => e.id != item.id))
  }
  toggleModal = (index) => {
    const { isModalVisible } = this.state
    this.setState({ isModalVisible: !isModalVisible, index });
  };
  ListFavoritesMovies = () => {
    const { getFavoritesMovies } = this.props.MovieStore
    return getFavoritesMovies.map((item, index) => {
      return (
        <ListItem itemDivider key={index} >
          <Text style={{ width: '100%', textAlign: 'center' }}>{item.title}</Text>
        </ListItem >
      )
    }
    )
  }
  FavoritesModal = () => {
    return (
      <View>
        <List>
          {this.ListFavoritesMovies()}
        </List>
      </View>
    )
  }
  render() {
    const { item } = this.props.route.params
    const { MovieStore } = this.props
    const { isModalVisible, getFavoritesMovies } = this.state
    return (
      <View style={styles.Container}>
        <ScrollView>
          <Card style={{ color: 'red' }}>
            <CardImage
              source={{ uri: url + item.poster_path }}
            />
            <CardContent text={'Name : \n\n' + item.title} />
            <CardContent text={'popularity : \n\n' + item.popularity} />
            <CardContent text={'overview : \n\n' + item.overview} />
            <CardAction
              separator={true}
              inColumn={false}>
              <CardButton
                onPress={MovieStore.getFavoritesMovies.find((e) => e.id == item.id) === undefined ? this.AddFavoritesMovies : this.RemoveFavoritesMovies}
                title={MovieStore.getFavoritesMovies.find((e) => e.id == item.id) === undefined ? "Add" : "Remove"}
                color={MovieStore.getFavoritesMovies.find((e) => e.id == item.id) === undefined ? "#FEB557" : "red"}
              />
              <CardButton
                onPress={() => this.toggleModal()}
                title="Favorites"
                color="black"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', marginHorizontal: 10, color: 'green' }}>{MovieStore.getFavoritesMovies.length}</Text>
            </CardAction>
          </Card>
        </ScrollView>
        <View style={styles.Modal}>
          <Modal
            animationType='fade'
            transparent={true}
            isVisible={isModalVisible}>
            <View style={styles.ModalTextView}>
              <Text style={styles.ModalText}>Favorites</Text>
            </View>
            <View style={styles.ModalBody}>
              {this.FavoritesModal()}
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
    flex: 1
  },
  closecircle: {
    position: 'absolute',
    margin: 16,
    top: 20,
    left: 0,
    bottom: 0,
  },
  ModalTextView: {
    height: '10%',
    backgroundColor: 'rgba(100,200,200,0.6)',
    width: '100%'
  },
  ModalText: {
    textAlign: 'center',
    fontSize: 25,
    top: 10,
    fontWeight: 'bold'
  },
  ModalBody: {
    backgroundColor: 'white',
    width: '100%',
    height: '85%',
    alignItems: 'center'
  }
})