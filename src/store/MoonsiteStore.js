import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MoonsiteStore {
  @persist('object') @observable userData = null
  @observable Token = '';

  @computed
  get getUser() {
    return this.user
  }


  @action
  setUser(data){
    this.User=data
  }

}


const store = new MoonsiteStore();
export default store;