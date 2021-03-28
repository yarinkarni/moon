import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MoonsiteStore {

  @persist('object') @observable userData = null

  @observable Token = '';
  @observable Movies = [];
  @computed
  get getMovies() {
    return this.Movies
  }
  @computed
  get getUser() {
    return this.userData
  }
  @computed
  get getUser() {
    return this.user
  }
  @action
  setMovies(Movies) {
    this.Movies = Movies
  }
  @action
  setUser(userData) {
    this.userData = userData
  }
  @action
  setUser(data) {
    this.User = data
  }

}


const store = new MoonsiteStore();
export default store;