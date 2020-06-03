/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'
import moment from 'moment'

export default {
    fetchAppointments({commit}, status) {
        return new Promise((resolve, reject) => {
            axios.get('/api/appointment?status=' + status)
            .then((response) => {
                commit('SET_APPOINTMENT', response.data)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    approveAppointment({commit}, appointment){
        return new Promise((resolve, reject) => {
            axios.patch('/api/appointment/' + appointment.id + '/approve')
            .then((response) => {
                commit('REMOVE_APPOINTMENT', appointment.id)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },

    cancelAppointment({commit}, appointment){
        return new Promise((resolve, reject) => {
            axios.patch('/api/appointment/' + appointment.id + '/cancel')
            .then((response) => {
                commit('REMOVE_APPOINTMENT', appointment.id)
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
}
