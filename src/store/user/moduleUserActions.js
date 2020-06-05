import axios from '@/axios.js'
import moment from 'moment'

export default {
    addUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/user',payload)
            .then((response) => {
                commit('ADD_USER', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    updateUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.patch('/api/user/' + payload.id,payload)
            .then((response) => {
                commit('UPDATE_USER', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    deleteUser({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.delete('/api/user/' + id)
            .then((response) => {
                commit('REMOVE_USER', id)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    fetchUsers({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/api/user')
            .then((response) => {
                commit('SET_USER', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    fetchTenants({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/api/tenant')
            .then((response) => {
                commit('SET_TENANT', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    deleteMarkUser({commit}, users){
        return new Promise((resolve, reject) => {
            let User_ids = []

            users.forEach(function (item) {
                User_ids.push(item.id)
            });

            let data = {
                users: User_ids
            }

            axios.delete('/api/user/mark/delete',{ data: data })
            .then((response) => {
                console.log(response)
                User_ids.forEach(function (item){
                    commit('REMOVE_USER', item)
                })
                
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
}
