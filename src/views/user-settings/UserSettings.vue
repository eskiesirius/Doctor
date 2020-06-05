<template>
    <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

        <!-- GENERAL -->
        <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
            <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
                <user-settings-general />
            </div>
        </vs-tab>
        <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Change Password' : ''">
            <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
                <user-settings-change-password />
            </div>
        </vs-tab>
        <vs-tab icon-pack="feather" icon="icon-clock" :label="!isSmallerScreen ? 'Time Schedule' : ''">
            <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
                <user-settings-time />
            </div>
        </vs-tab>
    </vs-tabs>
</template>

<script>
import UserSettingsGeneral from './UserSettingsGeneral.vue'
import UserSettingsChangePassword from './UserSettingsChangePassword.vue'
import UserSettingsTime from './UserSettingsTime.vue'

export default {
  components: {
    UserSettingsGeneral,
    UserSettingsChangePassword,
    UserSettingsTime
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
