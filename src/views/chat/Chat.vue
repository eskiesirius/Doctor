<template>
    <div id="chat-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#chat-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

            <!-- USER PROFILE SIDEBAR -->
            <user-profile :active="activeProfileSidebar" :userId="userProfileId" class="user-profile-container" :isLoggedInUser="isLoggedInUserProfileView" @closeProfileSidebar="closeProfileSidebar"></user-profile>

            <div class="chat__profile-search flex p-4">
                <div class="relative inline-flex">
                    <vs-avatar v-if="activeUser.image" class="m-0 border-2 border-solid border-white" :src="activeUser.image" size="40px" @click="showProfileSidebar(Number(activeUser.uuid), true)" />
                    <div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + getStatusColor(true)"></div>
                </div>
                <vs-input icon-no-border icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full" placeholder="Search or start a new chat" v-model="searchQuery"/>

                <feather-icon class="md:inline-flex lg:hidden -ml-3 cursor-pointer" icon="XIcon" @click="toggleChatSidebar(false)" />
            </div>

            <vs-divider class="d-theme-border-grey-light m-0" />
            <component :is="scrollbarTag" class="chat-scroll-area pt-4" :settings="settings" :key="$vs.rtl">

                <!-- ACTIVE CHATS LIST -->
                <div class="chat__chats-list mb-8">
                    <h3 class="text-primary mb-5 px-4">Chats</h3>
                    <ul class="chat__active-chats bordered-items">
                        <li class="cursor-pointer" v-for="(contact, index) in chatContacts" :key="index" @click="updateActiveThread(contact)">
                            <chat-contact showLastMsg :contact="contact.user" :lastMessaged="chatLastMessaged(contact.uuid).time" :unseenMsg="chatUnseenMessages(contact.uuid)" :isActiveThread="isActiveThread(contact.uuid)"></chat-contact>
                        </li>
                    </ul>
                </div>


                <!-- CONTACTS LIST -->
                <div class="chat__contacts">
                    <h3 class="text-primary mb-5 px-4">Contacts</h3>
                    <ul class="chat__contacts bordered-items">
                        <li class="cursor-pointer" v-for="contact in contacts" :key="contact.uuid" @click="updateActiveThread(contact)">
                            <chat-contact :contact="contact"></chat-contact>
                        </li>
                    </ul>
                </div>
            </component>
        </vs-sidebar>

        <!-- RIGHT COLUMN -->
        <div class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0" :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeThread === null}">
            <template v-if="activeThread">
                <div class="chat__navbar">
                    <chat-navbar :isSidebarCollapsed="!clickNotClose" :thread="activeThread" @openContactsSidebar="toggleChatSidebar(true)" @showProfileSidebar="showProfileSidebar" @toggleIsChatPinned="toggleIsChatPinned" @clicked="openDialog"></chat-navbar>
                </div>
                <component :is="scrollbarTag" class="chat-content-scroll-area border border-solid d-theme-border-grey-light" :settings="settings" ref="chatLogPS" :key="$vs.rtl">
                    <div class="chat__log" ref="chatLog">
                        <chat-log :thread="activeThread" v-if="activeThread"></chat-log>
                    </div>
                </component>
                <div class="chat__input flex p-4 bg-white">
                    <vs-input class="flex-1" placeholder="Type Your Message" v-model="typedMessage" @keyup.enter="sendMsg" />
                    <vs-button class="bg-primary-gradient ml-4" type="filled" @click="sendMsg">Send</vs-button>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center">
                    <feather-icon icon="MessageSquareIcon" class="mb-4 bg-white p-8 shadow-md rounded-full" svgClasses="w-16 h-16"></feather-icon>
                    <h4 class=" py-2 px-4 bg-white shadow-md rounded-full cursor-pointer" @click.stop="toggleChatSidebar(true)">Start Conversation</h4>
                </div>
            </template>
        </div>

        <vs-prompt
        class="calendar-event-dialog"
        title="Set Appointment"
        accept-text= "Set Appointment"
        :is-valid="validForm"
        :active.sync="activePromptSetAppointment"
        @accept="setAppointment">
          <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input>
          <div class="my-4">
              <flat-pickr :config="configdateTimePicker" name="start-date" class="w-full" v-model="startDate" :disabled="disabledFrom" />
          </div>
          <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>
        </vs-prompt>
    </div>
</template>

<script>
import ChatContact         from './ChatContact.vue'
import ChatLog             from './ChatLog.vue'
import ChatNavbar          from './ChatNavbar.vue'
import UserProfile         from './UserProfile.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleChat          from '@/store/chat/moduleChat.js'
import Datepicker          from 'vuejs-datepicker'
import { en, he }          from 'vuejs-datepicker/src/locale'
import flatPickr           from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';


export default {
  data () {
    return {
      active               : true,
      isHidden             : false,
      searchContact        : '',
      activeProfileSidebar : false,
      activeThread       : null,
      userProfileId        : -1,
      typedMessage         : '',
      isChatPinned         : false,
      settings             : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.70
      },
      clickNotClose        : true,
      isChatSidebarActive  : true,
      isLoggedInUserProfileView: false,
      activePromptSetAppointment: false,
      url: '',
      title: '',
      startDate: '',
      disabledFrom: false,
      lang: en,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'F d, Y h:i K'
      }
    }
  },
  watch: {
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    chatLastMessaged () {
      return (userId) => this.$store.getters['chat/chatLastMessaged'](userId);
      // return (userId) => userId;
    },
    chatUnseenMessages () {
      return (userId) => {
        const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](userId)
        if (unseenMsg) return unseenMsg
      }
    },
    activeUser () {
      return this.$store.state.AppActiveUser
    },
    getStatusColor () {
      return (isActiveUser) => {
        const userStatus = this.getUserStatus(isActiveUser)

        if (userStatus === 'online') {
          return 'success'
        } else if (userStatus === 'do not disturb') {
          return 'danger'
        } else if (userStatus === 'away') {
          return 'warning'
        } else {
          return 'grey'
        }
      }
    },
    chatContacts () {
      return this.$store.getters['chat/chatContacts']
    },
    contacts () {
      return this.$store.getters['chat/contacts']
    },
    searchQuery: {
      get () {
        return this.$store.state.chat.chatSearchQuery
      },
      set (val) {
        this.$store.dispatch('chat/setChatSearchQuery', val)
      }
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    },
    isActiveThread () {
      return (userId) => {
        if (this.activeThread != null)
          return userId === this.activeThread.uuid

        return false
      }
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },
    validForm () {
      return this.title !== '' && this.startDate !== '' && new Date() - Date.parse(this.startDate) <= 0 && !this.errors.has('event-url')
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    },
  },
  methods: {
    async setAppointment(){
      const payload = {
        'message'           : '',
        'time'              : String(new Date()), 
        'isSeen'            : false,
        'thread'            : this.activeThread,
        'isAppointment'     : true,
        'title'             : this.title,
        'appointment_date'  : new Date(this.startDate)
      }

      await this.$store.dispatch('chat/setAppointment', payload)

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
    },
    openDialog() {
      this.disabledFrom = false
      this.addNewEventDialog(new Date())
    },
    addNewEventDialog (date) {
      this.clearFields()
      this.startDate = date
      this.endDate = date
      this.activePromptSetAppointment = true
    },
    clearFields () {
      this.title = this.endDate = this.url = ''
    },
    getUserStatus (isActiveUser) {
      // return "active"
      return isActiveUser ? this.$store.state.AppActiveUser.status : this.contacts[this.activeThread].status
    },
    closeProfileSidebar (value) {
      this.activeProfileSidebar = value
    },
    async updateActiveThread (thread) {
      this.activeThread = thread

      if (this.$store.getters['chat/chatDataOfUser'](this.activeThread.id) == null){
        await this.$store.dispatch('chat/fetchChats', this.activeThread)
      }

      Echo.private('chat.' + this.activeThread.uuid)
      .listen('.App\\Events\\Conversation\\MessageSent',(e) => {
        console.log(e);
        this.$store.dispatch('chat/addChat',e.conversation)
      });

      // if (this.$store.getters['chat/chatDaatOfUser'](this.activeThread)) {
      //   this.$store.dispatch('chat/markSeenAllMessages', contactId)
      // }

      this.toggleChatSidebar()
      this.typedMessage = ''
    },
    showProfileSidebar (userId, openOnLeft = false) {
      this.userProfileId = userId
      this.isLoggedInUserProfileView = openOnLeft
      this.activeProfileSidebar = !this.activeProfileSidebar
    },
    async sendMsg () {
      if (!this.typedMessage) return
      const payload = {
        'message'           : this.typedMessage,
        'time'              : String(new Date()), 
        'isSeen'            : false,
        'thread'            : this.activeThread,
        'isAppointment'     : false,
        'title'             : null,
        'appointment_date'  : null
      }

      this.typedMessage = ''
      let result = await this.$store.dispatch('chat/sendChatMessage', payload)

      if (result.isNew) {
        await this.$store.dispatch('chat/fetchChatContacts')
        this.openChatForDoctor(this.activeThread)
      }

      const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
      scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
    },
    toggleIsChatPinned (value) {
      this.isChatPinned = value
    },
    setSidebarWidth () {
      if (this.windowWidth < 1200) {
        this.isChatSidebarActive = this.clickNotClose = false
      } else {
        this.isChatSidebarActive = this.clickNotClose = true
      }
    },
    toggleChatSidebar (value = false) {
      if (!value && this.clickNotClose) return
      this.isChatSidebarActive = value
    },
    openChatForDoctor(user) {
      if (this.$store.getters['chat/chatUser'](user.uuid) != null) {
        this.updateActiveThread(this.$store.getters['chat/chatUser'](user.uuid))
        return
      }

      this.activeThread = user
    }
  },
  components: {
    VuePerfectScrollbar,
    ChatContact,
    UserProfile,
    ChatNavbar,
    ChatLog,
    flatPickr
  },
  async created () {
    this.$store.registerModule('chat', moduleChat)
    await this.$store.dispatch('chat/fetchChatContacts')

    if (this.$route.params.uuid) {
      this.openChatForDoctor(this.$route.params)
    }

    this.setSidebarWidth()

    Echo.private('thread.' + this.$store.state.AppActiveUser.id)
      .listen('.App\\Events\\Thread\\ThreadWasCreated',(e) => {
        this.$store.dispatch('chat/fetchChatContacts')
      });
  },
  beforeDestroy () {
    this.$store.unregisterModule('chat')
  },
  mounted () {
    this.$store.dispatch('chat/setChatSearchQuery', '')
  },
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";
</style>
