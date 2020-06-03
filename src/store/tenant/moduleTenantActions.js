import axios from '@/axios.js'
import moment from 'moment'

export default {
    addTenant({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/tenant',payload)
            .then((response) => {
                commit('ADD_TENANT', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    updateTenant({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.patch('/api/tenant/' + payload.id,payload)
            .then((response) => {
                commit('UPDATE_TENANT', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    deleteTenant({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.delete('/api/tenant/' + id)
            .then((response) => {
                commit('REMOVE_TENANT', id)
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

    deleteMarkTenant({commit}, tenants){
        return new Promise((resolve, reject) => {
            let tenant_ids = []

            tenants.forEach(function (item) {
                tenant_ids.push(item.id)
            });

            let data = {
                tenants: tenant_ids
            }

            axios.delete('/api/tenant/mark/delete',{ data: data })
            .then((response) => {
                console.log(response)
                tenant_ids.forEach(function (item){
                    commit('REMOVE_TENANT', item)
                })
                
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
}
