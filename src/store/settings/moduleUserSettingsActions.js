import axios from '@/axios.js'
import moment from 'moment'

export default {
	updateProfile ({ commit }, payload) {
		return new Promise((resolve, reject) => {
			axios.patch('/api/user-info',payload)
			.then((response) => {
				commit('UPDATE_USER_INFO', response.data, {root: true})
				resolve(response)
			})
			.catch((error) => { reject(error) })
		})
	}
}

