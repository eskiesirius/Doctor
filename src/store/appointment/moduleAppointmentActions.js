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

    approveMarkAppointment({commit}, appointments){
        return new Promise((resolve, reject) => {
            let appointment_ids = []

            appointments.forEach(function (item) {
                appointment_ids.push(item.id)
            });

            let data = {
                appointments: appointment_ids
            }

            axios.patch('/api/appointment/mark/approve',data)
            .then((response) => {
                console.log(response)
                appointment_ids.forEach(function (item){
                    commit('REMOVE_APPOINTMENT', item)
                })
                
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

    cancelMarkAppointment({commit}, appointments){
        return new Promise((resolve, reject) => {
            let appointment_ids = []

            appointments.forEach(function (item) {
                appointment_ids.push(item.id)
            });

            let data = {
                appointments: appointment_ids
            }

            axios.patch('/api/appointment/mark/cancel',data)
            .then((response) => {
                console.log(response)
                appointment_ids.forEach(function (item){
                    commit('REMOVE_APPOINTMENT', item)
                })
                
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
}
