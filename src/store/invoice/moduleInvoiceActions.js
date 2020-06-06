import axios from '@/axios.js'
import moment from 'moment'

export default {
    deleteInvoice({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.delete('/api/invoice/' + id)
            .then((response) => {
                commit('REMOVE_INVOICE', id)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    deleteMarkInvoice({commit}, invoices){
        return new Promise((resolve, reject) => {
            let invoice_ids = []

            invoices.forEach(function (item) {
                invoice_ids.push(item.id)
            });

            let data = {
                invoices: invoice_ids
            }

            axios.delete('/api/invoice/mark/delete',{ data: data })
            .then((response) => {
                console.log(response)
                invoice_ids.forEach(function (item){
                    commit('REMOVE_INVOICE', item)
                })
                
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    fetchInvoices({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/api/invoice')
            .then((response) => {
                commit('SET_INVOICE', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    mailInvoice({commit}, invoice_id) {
        return new Promise((resolve, reject) => {
            axios.get('/api/invoice/' + invoice_id + '/send-email')
            .then((response) => {
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
}
