import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
class MoonsiteStore {
  @persist('object') @observable userData = null
  //משתנים לוקאלי של האפליקציה
  @observable Token = '';

  //מחזיר משתנים
  @computed
  get getScholorships() {
    return this.scholorships
  }

  //לשנות את המשתנה

  @action
  setPicker(data){
    this.picker=data
  }

}


const store = new MoonsiteStore();
export default store;