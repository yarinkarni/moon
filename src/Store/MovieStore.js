import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MovieStore {

  @persist('object') @observable user = null
  @persist('object') @observable FavoritesMovies = []

  @observable Token = '';
  @observable Movies = [];
  @observable MovieDetails = [];

  @computed
  get getFavoritesMovies() {
    return this.FavoritesMovies
  }
  @computed
  get getMovieDetails() {
    return this.MovieDetails
  }
  @computed
  get getMovies() {
    return this.Movies
  }
  @computed
  get getUser() {
    return this.user
  }



  @action
  setFavoritesMovies(FavoritesMovies) {
    this.FavoritesMovies = FavoritesMovies
  }
  @action
  setMovieDetails(MovieDetails) {
    this.MovieDetails = MovieDetails
  }
  @action
  setMovies(Movies) {
    this.Movies = Movies
  }
  @action
  setUser(data) {
    this.User = data
  }

}


const store = new MovieStore();
export default store;