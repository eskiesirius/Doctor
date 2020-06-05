import axios from '../../axios/index.js'
import store from '../../../store/store.js'

export default {
  updateProfile(name){
    return axios.patch('/api/user-info',{
      name
    })
  }
}
