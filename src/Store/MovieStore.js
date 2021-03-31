import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MovieStore {

  @persist('object') @observable user = null
  @persist('object') @observable favoritesMovies = []

  @observable movies = [];
  @observable movieDetails = [];
  

  @computed
  get getFavoritesMovies() {
    return this.favoritesMovies
  }
  @computed
  get getMovieDetails() {
    return this.movieDetails
  }
  @computed
  get getMovies() {
    return this.movies
  }
  @computed
  get getUser() {
    return this.user
  }



  @action.bound
  setFavoritesMovies(favoritesMovies) {
    this.favoritesMovies = favoritesMovies
  }
  @action
  setMovieDetails(movieDetails) {
    this.movieDetails = movieDetails
  }
  @action
  setMovies(movies) {
    this.movies = movies
  }
  @action
  setUser(data) {
    this.user = data
  }

}


const store = new MovieStore();
export default store;