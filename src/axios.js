// axios
import axios from 'axios'
import router from '@/router'

const baseURL = 'http://localhost/'

const instance =  axios.create({
  baseURL,
  withCredentials: true
  // You can add your headers here
})

instance.interceptors.response.use(response => {
	return response
}, error => {
	const { response } = error

  if (response && (response.status === 401 || response.status === 419)) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLoggedIn')
    router.push({ name: 'login' })
  }

  return Promise.reject(error)
})

export default instance