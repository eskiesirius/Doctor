import mock from '@/fake-db/mock.js'

// Contact
const data = {
  contacts: [
    {
      uuid: 1,
      name: 'Felecia Rower',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      image: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
      status: 'offline'
    },
    {
      uuid: 2,
      name: 'Adalberto Granzin',
      about: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      image: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      status: 'do not disturb'
    },
    {
      uuid: 3,
      name: 'Joaquina Weisenborn',
      about: 'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
      image: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      status: 'do not disturb'
    },
    {
      uuid: 4,
      name: 'Verla Morgano',
      about: 'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
      image: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
      status: 'online'
    },
    {
      uuid: 5,
      name: 'Margot Henschke',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      image: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      status: 'do not disturb'
    },
    {
      uuid: 6,
      name: 'Sal Piggee',
      about: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      image: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      status: 'online'
    },
    {
      uuid: 7,
      name: 'Miguel Guelff',
      about: 'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
      image: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      status: 'online'
    },
    {
      uuid: 8,
      name: 'Mauro Elenbaas',
      about: 'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      image: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
      status: 'away'
    },
    {
      uuid: 9,
      name: 'Bridgett Omohundro',
      about: 'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      image: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
      status: 'offline'
    },
    {
      uuid: 10,
      name: 'Zenia Jacobs',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      image: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
      status: 'away'
    }
  ],
  chats: {
    1: {
      isPinned: true,
      msg: [
        {
          textContent: 'How can we help? We\'re here for you!',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'It should be Bootstrap 4 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'Modern admin is the responsive bootstrap 4 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'It\'s perfect for my next project.',
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'I will purchase it for sure. 👍',
          time: 'Mon Dec 10 2018 07:47:00 GMT+0000 (GMT)',
          isSent: false,
          isSeen: false
        }
      ]
    },
    2: {
      isPinned: false,
      msg: [
        {
          textContent: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          isSent: true,
          isSeen: true
        },
        {
          textContent: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          isSent: false,
          isSeen: true
        },
        {
          textContent: 'If it takes long you can mail me at my mail address.',
          time: 'Mon Dec 11 2018 07:46:20 GMT+0000 (GMT)',
          isSent: true,
          isSeen: false
        }
      ]
    }
  }
}

// Functions
const chatDataOfUser = (id) => {
  return data.chats[Object.keys(data.chats).find(key => key == id)]
}

// GET : Contacts List
mock.onGet('/api/apps/chat/contacts').reply((request) => {

  // Filter contact based on search query
  const filteredContacts = data.contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(request.params.q.toLowerCase())
  })

  return [200, filteredContacts]
})


// GET : Get All Contacts
mock.onGet('/api/apps/chat/contacts').reply(() => {
  return [200, data.contacts]
})

// GET : Get All Chats
mock.onGet('/api/apps/chat/chats').reply(() => {
  return [200, data.chats]
})

// GET : Chats List
mock.onGet('/api/apps/chat/chat-contacts').reply((request) => {

  const chatContactsArray = data.contacts.filter((contact) => {
    if (data.chats[contact.uuid]) return data.chats[contact.uuid] && contact.name.toLowerCase().includes(request.params.q.toLowerCase())
  })

  return [200, chatContactsArray]
})

// POST : add chat lists
mock.onPost('/api/apps/chat/chat-contacts').reply((request) => {
  data.contacts.push(JSON.parse(request.data).payload)
  return [200, data.contacts]
})


// POST : Mark all msgs as seen
mock.onPost('/api/apps/chat/mark-all-seen/').reply((request) => {
  const contactId = JSON.parse(request.data).contactId


  // Get chat data
  const chatLog = chatDataOfUser(contactId)

  // console.log(chatLog);
  chatDataOfUser(1) == chatLog

  // Loop over all msg & mark them as seen
  chatLog.msg.forEach((msg) => {
    msg.isSeen = true
  })

  // Set unsen Msg flag to 0
  chatLog.unseenMsg = 0

  // console.log(data.chats[0] == chatDataOfUser(contactId));

  return [200]
})

mock.onPost('/api/apps/chat/set-pinned/').reply((request) => {
  const {contactId, value} = JSON.parse(request.data)
  const index = Object.keys(data.chats).find(key => key == contactId)
  data.chats[index].isPinned = value
  return [200, data.chats[index]]
})


mock.onPost('/api/apps/chat/msg').reply((request) => {
  const payload = JSON.parse(request.data).payload

  // Get chat data
  payload.chatData = chatDataOfUser(payload.id)

  if (payload.chatData) {
    // If there's already chat. Push msg to existing chat
    data.chats[Object.keys(data.chats).find(key => key == payload.id)].msg.push(payload.msg)
  } else {
    // Create New chat and add msg
    data.chats[payload.id] = {isPinned: payload.isPinned,
      msg: [payload.msg]}
  }

  return [200]
})


mock.onPost('/api/apps/chat/mark-all-seen').reply((request) => {
  const uuid = JSON.parse(request.data).id

  // Get chat data
  const chatLog = chatDataOfUser(uuid)

  chatLog.msg.forEach((msg) => {
    msg.isSeen = true
  })

  return [200]
})
