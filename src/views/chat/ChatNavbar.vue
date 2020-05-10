<template>
    <div v-if="thread != null" class="chat__header">
        <vs-navbar class="p-4 flex navbar-custom" color="white" type="flat">
            <div class="relative flex mr-4">
                <feather-icon icon="MenuIcon" class="mr-4 cursor-pointer" v-if="isSidebarCollapsed" @click.stop="$emit('openContactsSidebar')" />
                <vs-avatar class="m-0 border-2 border-solid border-white" size="40px" :src="userDetails.image" @click.stop="$emit('showProfileSidebar', userDetails)" />
                <div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + getStatusColor(false)"></div>
            </div>
            <h6>{{ userDetails.name }}</h6>
            <vs-spacer></vs-spacer>
            <vs-button color="success" @click="setAppointment">Set Appointment</vs-button>
        </vs-navbar>
    </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: [ String, Number, Object ],
      required: true
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    userDetails () {
      if (this.$store.getters['chat/contact'](this.thread.id) != null)
        return this.$store.getters['chat/contact'](this.thread.id).user

      return this.thread;
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
    }
  },
  methods: {
    getUserStatus (isActiveUser) {
      return isActiveUser ? this.$store.state.AppActiveUser.status : this.userDetails.status
    },
    setAppointment() {
      this.$emit('clicked')
    }
  }
}

</script>

