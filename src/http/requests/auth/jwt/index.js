import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  async login (email, pwd) {
    await axios.get('sanctum/csrf-cookie')

    return axios.post('/login', {
      email,
      password: pwd
    })
  },
  getUserInfo(){
    return axios.get('/api/user')
  },
  async registerUser (name, email, password, password_confirmation) {
    await axios.get('sanctum/csrf-cookie')

    return axios.post('/register', {
      name,
      email,
      password,
      password_confirmation
    })
  },
  logout(){
    return axios.post('/logout')
  },
  async forgotPassword(email) {
    await axios.get('sanctum/csrf-cookie')

    return axios.post('password/email', {
      email
    })
  }
}
