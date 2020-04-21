/*=========================================================================================
  File Name: moduleChatActions.js
  Description: Chat Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  setChatSearchQuery ({ commit }, query) {
    commit('SET_CHAT_SEARCH_QUERY', query)
  },
  updateAboutChat ({ commit, rootState }, value) {
    commit('UPDATE_ABOUT_CHAT', {
      rootState,
      value
    })
  },
  updateStatusChat ({ commit, rootState }, value) {
    commit('UPDATE_STATUS_CHAT', {
      rootState,
      value
    })
  },

  setAppointment({ commit, dispatch }, payload){
    return new Promise((resolve, reject) => {
      dispatch('sendChatMessage',payload)
    })
  },

  addContact({ commit },payload){
    return new Promise((resolve, reject) => {
      commit('UPDATE_CONTACTS', payload)
      resolve(response)
    })
  },

  // API CALLS
  sendChatMessage ({ getters, commit, dispatch, rootState }, payload) {
    const data = {
      'message'           : payload.message,
      'isAppointment'     : payload.isAppointment,
      'title'             : payload.title,
      'appointment_date'  : payload.appointment_date,
      'doctor_id'         : payload.thread.doctor_id == null ? payload.thread.id : payload.thread.doctor_id,
      'patient_id'        : payload.thread.patient_id == null ? rootState.AppActiveUser.id : payload.thread.patient_id
    }

    return new Promise((resolve, reject) => {
      axios.post('/api/chat/message', data)
        .then(response => {
          let newThread = []
          newThread[response.data[0].thread_id] = response.data

          // commit('SEND_CHAT_MESSAGE',{payload: response.data, thread: newThread})

          if (payload.thread.doctor_id != null)
            resolve({isNew: false})
          
          resolve({isNew: true, thread_id: response.data[0].thread_id})
        })
        .catch((error) => { reject(error) })
    })
  },

  async addChat({commit}, payload) {
    return new Promise((resolve, reject) => {
      console.log(payload)
      commit('SEND_CHAT_MESSAGE',{payload: [payload], thread: []})
      resolve()
    })
  },

  fetchThreadByConversation({commit}, thread_id) {
    return new Promise((resolve, reject) => {
      axios.get('/api/conversation/' + thread_id + '/thread')
        .then(response => {

          resolve(response.data)
        })
        .catch((error) => { reject(error) })
    })
  },

  // Get contacts from server. Also change in store
  fetchContacts ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/apps/chat/contacts', {params: {q: ''}})
        .then((response) => {
          commit('UPDATE_CONTACTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // Get chat-contacts from server. Also change in store
  fetchChatContacts ({ getters, commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/chat/message')
        .then((response) => {
          commit('UPDATE_CHAT_CONTACTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // Get chats from server. Also change in store
  fetchChats ({ commit }, thread) {
    return new Promise((resolve, reject) => {
      axios.get('/api/chat/message/' + thread.uuid)
        .then((response) => {
          let newThread = []
          newThread[thread.id] = response.data
          
          commit('UPDATE_CHATS', newThread)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  markSeenAllMessages ({ getters, commit }, id) {

    return new Promise((resolve, reject) => {
      axios.post('/api/apps/chat/mark-all-seen', {id})
        .then((response) => {
          commit('MARK_SEEN_ALL_MESSAGES', {
            id,
            chatData: getters.chatDataOfUser(id)
          })
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  toggleIsPinned ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/apps/chat/set-pinned/', {contactId: payload.id,
        value: payload.value})
        .then((response) => {
          commit('TOGGLE_IS_PINNED', payload)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
