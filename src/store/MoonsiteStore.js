import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MoonsiteStore {

  // @persist('object') @observable userDate = null

  //@observable Token = '';
  // @computed
  // get getUser() {
  //   return this.userData
  // }
  // @computed
  // get getUser() {
  //   return this.user
  // }

  // @action
  // setUser(userData) {
  //   this.userData = userData
  // }
  // @action
  // setUser(data){
  //   this.User=data
  // }

}


const store = new MoonsiteStore();
export default store;