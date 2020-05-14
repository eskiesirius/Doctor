<template>
    <div id="component-chat-log" class="m-8" v-if="chatData">
        <div v-for="(chat, index) in chatData" class="msg-grp-container" :key="index">

            <!-- If previous msg is older than current time -->
            <template v-if="chatData[index-1]">
                <vs-divider v-if="!isSameDay(chat.created_at, chatData[index-1].created_at)" class="msg-time">
                    <span>{{ toDate(chat.created_at) }}</span>
                </vs-divider>
                <div class="spacer mt-8" v-if="!hasSentPreviousMsg(isSent(chatData[index-1]), isSent(chat))"></div>
            </template>

            <div class="flex items-start" :class="[{'flex-row-reverse' : isSent(chat)}]">

                <template v-if="chatData[index-1]">
                    <template v-if="(!hasSentPreviousMsg(isSent(chatData[index-1]), isSent(chat)) || !isSameDay(chat.time, chatData[index-1].time))">
                        <vs-avatar size="40px" class="border-2 shadow border-solid border-white m-0 flex-shrink-0" :class="isSent(chat) ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'" :src="senderImg(isSent(chat))"></vs-avatar>
                    </template>
                </template>

                <template v-if="index == 0">
                    <vs-avatar size="40px" class="border-2 shadow border-solid border-white m-0 flex-shrink-0" :class="isSent(chat) ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'" :src="senderImg(isSent(chat))"></vs-avatar>
                </template>

                <template v-if="chatData[index-1]">
                    <div class="mr-16" v-if="!(!hasSentPreviousMsg(isSent(chatData[index-1]), isSent(chat)) || !isSameDay(chat.time, chatData[index-1].time))"></div>
                </template>

                <template v-if="chat.isAppointment">
                  <vx-card
                  :title="chat.title"
                  title-color="success"
                  subtitle-color="warning"
                  :subtitle="changeDateFormatFull(chat.appointment_date)">
                  <p class="mb-3">Hi! I would like to set an appointment with you doc.</p>
                </vx-card>
                </template>
                <template v-else>
                  <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm" :class="{'bg-primary-gradient text-white': isSent(chat), 'border border-solid border-transparent bg-white': !isSent(chat)}">
                      <span>{{ chat.message }}</span>
                  </div>
                </template>
                
            </div>
        </div>
    </div>
</template>

<script>
export default{
  props: {
    thread: {
      type: [ String, Number, Object ],
      required: true
    }
  },
  computed: {
    chatData () {
      return this.$store.getters['chat/chatDataOfUser'](this.thread.id)
    },
    isSent () { 
      return (chat) => chat.user_id == this.$store.state.AppActiveUser.id
    },
    senderImg () {
      return (isSentByActiveUser) => {
        if (isSentByActiveUser) return this.$store.state.AppActiveUser.image
        else return this.$store.getters['chat/contact'](this.thread.id).user.image
      }
    },
    hasSentPreviousMsg () {
      return (last_sender, current_sender) => last_sender === current_sender
    }
  },
  methods: {
    isSameDay (time_to, time_from) {
      const date_time_to = new Date(Date.parse(time_to))
      const date_time_from = new Date(Date.parse(time_from))
      return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                date_time_to.getMonth() === date_time_from.getMonth() &&
                date_time_to.getDate() === date_time_from.getDate()
    },
    toDate (time) {
      const locale = 'en-us'
      const date_obj = new Date(Date.parse(time))
      const monthName = date_obj.toLocaleString(locale, {
        month: 'short'
      })
      return `${date_obj.getDate()  } ${   monthName}`
    },
    changeDateFormatFull(date) {
      return date;
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
      })
    }
  },
  updated () {
    this.scrollToBottom()
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>
