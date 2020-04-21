/*=========================================================================================
  File Name: moduleChatGetters.js
  Description: Chat Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


// import contacts from '@/views/apps/chat/contacts'

export default {
  chatDataOfUser: state => id => {
    return state.chats[Object.keys(state.chats).find(key => Number(key) === Number(id))]
  },
  chatContacts: (state, getters) => {
    const chatContacts = state.chatContacts.filter((contact) => contact.user.name.toLowerCase().includes(state.chatSearchQuery.toLowerCase()))

    chatContacts.sort((x, y) => {
      console.log(getters.chatLastMessaged(x.uuid))
      const timeX = getters.chatLastMessaged(x.uuid).time
      const timeY = getters.chatLastMessaged(y.uuid).time
      return new Date(timeY) - new Date(timeX)
    })

    return chatContacts.sort((x, y) => {
      const chatDataX = getters.chatDataOfUser(x.uuid)
      const chatDataY = getters.chatDataOfUser(y.uuid)
      if (chatDataX && chatDataY) return chatDataY.isPinned - chatDataX.isPinned
      else return 0
    })
  },
  contacts: (state) => state.contacts.filter((contact) => contact.name.toLowerCase().includes(state.chatSearchQuery.toLowerCase())),
  contact: (state) => contactId => state.chatContacts.find((contact) => contact.id === contactId),
  chats: (state) => state.chats,
  chatUser: (state, getters, rootState) => id => state.chatContacts.find((contact) => contact.user.uuid === id),

  chatLastMessaged: (state, getters) => id => {
    if (getters.chatDataOfUser(id)) return getters.chatDataOfUser(id).msg.slice(-1)[0]
    else return false
  },
  chatUnseenMessages: (state, getters) => id => {
    let unseenMsg = 0
    // const chatData = getters.chatDataOfUser(id)
    // if (chatData) {
    //   chatData.msg.map((msg) => {
    //     if (!msg.isSeen && !msg.isSent) unseenMsg++
    //   })
    // }
    return unseenMsg
  }
}
