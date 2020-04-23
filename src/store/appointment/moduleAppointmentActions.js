/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  addEvent ({ commit, rootState }, event) {
    let data = {
      'patient_id': rootState.AppActiveUser.role == 'patient' ? rootState.AppActiveUser.id : null,
      'doctor_id': rootState.AppActiveUser.role == 'doctor' ? rootState.AppActiveUser.id : null,
      'title': event.title,
      'time_schedule_id': null,
      'appointment_date': event.startDate,
      'isWholeDay': true,
      'label': event.label,
    }
    
    return new Promise((resolve, reject) => {
        axios.post('/api/appointment', data)
        .then((response) => {
          commit('ADD_EVENT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchEvents ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/appointment')
        .then((response) => {

          commit('SET_EVENTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchBlockedDates ({ commit }, doctor) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/doctors-list/${doctor.uuid}/appointment`)
        .then((response) => {
          console.log(response.data)
          commit('SET_EVENTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchEventLabels ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/apps/calendar/labels')
        .then((response) => {
          commit('SET_LABELS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  editEvent ({ commit }, event) {
    let data = {
      'title': event.title,
      'time_schedule_id': event.time_schedule_id,
      'appointment_date': event.startDate,
      'isWholeDay': true,
      'label': event.label,
    }
    
    return new Promise((resolve, reject) => {
      axios.patch(`/api/appointment/${event.id}`,data)
        .then((response) => {
          commit('UPDATE_EVENT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeEvent ({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointment/${eventId}`)
        .then((response) => {
          commit('REMOVE_EVENT', eventId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  eventDragged ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload})
        .then((response) => {

          // Convert Date String to Date Object
          const event = response.data
          event.startDate = new Date(event.startDate)
          event.endDate = new Date(event.endDate)

          commit('UPDATE_EVENT', event)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
