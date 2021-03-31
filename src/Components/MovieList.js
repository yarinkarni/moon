import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Container, Content, List, ListItem, Text } from 'native-base';
let url = 'https://image.tmdb.org/t/p/w500'
@inject("MovieStore")
@observer
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesVisible: false
    }
  }
  getMovies = () => {
    const { navigation, MovieStore } = this.props;
    return (MovieStore.getMovies && MovieStore.getMovies.map((item, index) => (
      <ListItem itemDivider key={index}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Movie', { item })}>
          <Text>{item.title}</Text>
          <Image style={styles.img} source={{ uri: url + item.poster_path }} />
          <View style={styles.imgBorder} />
        </TouchableOpacity>
      </ListItem >
    )))
  }
  render() {
    const { moviesVisible } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({ moviesVisible: true })}>
          <Text style={styles.TextBotton}>Movies</Text>
        </TouchableOpacity>
        {moviesVisible &&
          <View style={styles.listView}>
            <Container >
              <Content>
                <List>
                  {this.getMovies()}
                </List>
              </Content>
            </Container>
          </View>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: 250,
    alignItems: 'center'
  },
  listView: {
    height: 250
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
  img: {
    height: 100,
    width: 180,
    marginTop: 8
  },
  btn: {
    alignItems: 'center',
    width: '100%'
  },
  imgBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    width: '100%'
  }
});