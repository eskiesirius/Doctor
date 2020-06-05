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
	},
	changePassword ({ commit }, payload) {
		return new Promise((resolve, reject) => {
			axios.patch('/api/user-info/change-password',payload)
			.then((response) => {
				resolve(response)
			})
			.catch((error) => { reject(error) })
		})
	},
	getTime ({ commit }) {
		return new Promise((resolve, reject) => {
			axios.get('/api/user-info/time')
			.then((response) => {
				commit('SET_TIME',response.data)
				resolve(response)
			})
			.catch((error) => { reject(error) })
		})
	},
	setTime ({ commit }, payload) {
		return new Promise((resolve, reject) => {
			axios.post('/api/user-info/time',payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => { reject(error) })
		})
	},
}

