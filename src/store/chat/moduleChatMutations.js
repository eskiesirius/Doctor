/*=========================================================================================
  File Name: moduleChatMutations.js
  Description: Chat Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'

export default {
  UPDATE_ABOUT_CHAT (state, obj) {
    obj.rootState.AppActiveUser.about = obj.value
  },
  UPDATE_STATUS_CHAT (state, obj) {
    obj.rootState.AppActiveUser.status = obj.value
  },

  // API AFTER
  SEND_CHAT_MESSAGE (state, {payload, thread}) {
    let data = {
      'thread_id'         : payload[0].thread_id,
      'user_id'           : payload[0].user_id,
      'message'           : payload[0].message,
      'isAppointment'     : payload[0].isAppointment,
      'isSeen'            : payload[0].isSeen,
      'title'             : payload[0].title,
      'appointment_date'  : payload[0].appointment_date,
      'created_at'        : payload[0].created_at,
    }

    if (state.chats[Object.keys(state.chats).find(key => Number(key) === Number(data.thread_id))]) {

      // If there's already chat. Push msg to existing chat
      state.chats[Object.keys(state.chats).find(key => Number(key) === Number(data.thread_id))].push(data)
    } else {
      // Create New chat and add msg
      state.chats = thread
    }
  },
  UPDATE_CONTACTS (state, contacts) {
    state.contacts = contacts
  },
  UPDATE_CHAT_CONTACTS (state, chatContacts) {
    state.chatContacts = chatContacts
  },
  UPDATE_CHATS (state, {chats, thread_id}) {
    state.chats = chats
  },
  SET_CHAT_SEARCH_QUERY (state, query) {
    state.chatSearchQuery = query
  },
  MARK_SEEN_ALL_MESSAGES (state, payload) {
    payload.chatData.forEach((msg) => {
      msg.isSeen = true
    })
  },
  TOGGLE_IS_PINNED (state, payload) {
    state.chats[Object.keys(state.chats).find(key => String(key) === payload.id)].isPinned = payload.value
  }
}

