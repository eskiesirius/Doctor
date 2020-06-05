<template>
    <vx-card no-shadow>

        <!-- Img Row -->
        <div class="flex flex-wrap items-center mb-base" v-if="false">
            <vs-avatar :src="image" size="70px" class="mr-4 mb-4" />
            <div>
                <input type="file" ref="file" style="display: none" accept="image/*" @change="onChange">
                <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.file.click()">Upload photo</vs-button>
                <vs-button type="border" color="danger">Remove</vs-button>
                <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
        </div>

        <!-- Info -->
        <vs-input class="w-full mb-base" label-placeholder="First Name" v-model="first_name"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Last Name" v-model="last_name"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Phone" v-model="phone"></vs-input>

        <!-- Biography -->
        <vs-textarea class="w-full mb-base" label="Biography" v-model="biography" placeholder="Your biography" />

        <!-- Specialization -->
        <vs-input class="w-full" label-placeholder="Specialization" v-model="specialization"></vs-input>

        <!-- Gender -->
        <div class="mt-8 mb-base">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
                <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
                <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
            </div>
        </div>

        <!-- Save & Reset Button -->
        <div class="flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="update">Save Changes</vs-button>
        </div>
    </vx-card>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

export default {
  components: {
    flatPickr,
    vSelect
  },
  mounted(){
    this.$store.dispatch('auth/getUserInfo').then(({data}) => {

        this.first_name = data.first_name
        this.last_name = data.last_name
        this.phone = data.phone
        this.biography = data.biography
        this.specialization = data.specialization
        this.gender = data.gender
    })
  },
  data () {
    return {
        image: this.$store.state.AppActiveUser.image,
        first_name: this.$store.state.AppActiveUser.first_name,
        last_name: this.$store.state.AppActiveUser.last_name,
        phone: this.$store.state.AppActiveUser.phone,
        biography: this.$store.state.AppActiveUser.biography,
        specialization: this.$store.state.AppActiveUser.specialization,
        gender: this.$store.state.AppActiveUser.gender,
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    async update() {
        const payload = {
            first_name:         this.first_name,
            last_name:          this.last_name,
            phone:              this.phone,
            biography:          this.biography,
            specialization:     this.specialization,
            gender:             this.gender
        }
      
        await this.$store.dispatch('user_settings/updateProfile',payload)

        this.$vs.notify({
            color: 'success',
            title: 'Profile Updated',
            text: 'Profile updated successfully.'
        })
    },
  }
}
</script>
