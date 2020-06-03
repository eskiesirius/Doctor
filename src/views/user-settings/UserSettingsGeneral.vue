<template>
    <vx-card no-shadow>

        <!-- Img Row -->
        <div class="flex flex-wrap items-center mb-base">
            <vs-avatar :src="image" size="70px" class="mr-4 mb-4" />
            <div>
                <input type="file" ref="file" style="display: none" accept="image/*" @change="onChange">
                <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.file.click()">Upload photo</vs-button>
                <vs-button type="border" color="danger">Remove</vs-button>
                <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
        </div>

        <!-- Info -->
        <vs-input class="w-full mb-base" label-placeholder="Name" v-model="name"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Email" v-model="email" disabled></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Phone"></vs-input>
        <vs-input class="w-full mb-base" label-placeholder="Hospital Name"></vs-input>

        <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">
            <span>Your account is not verified. <a href="#" class="hover:underline">Resend Confirmation</a></span>
        </vs-alert>

        <!-- Bio -->
        <vs-textarea label="Bio" v-model="bio" placeholder="Your bio..." />

        <!-- DOB -->
        <div class="mt-8">
            <label class="text-sm">Birth Date</label>
            <flat-pickr v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>

        <!-- Country -->
        <div class="mt-8">
            <label class="text-sm">Country</label>
            <v-select v-model="country" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <!-- Languages -->
        <div class="mt-8">
            <label class="text-sm">Languages</label>
            <v-select v-model="lang_known" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <!-- Mobile Number -->
        <vs-input class="w-full mt-8" type="number" label-placeholder="Mobile" v-model="mobile" />

        <!-- Website  -->
        <vs-input class="w-full mt-8" label-placeholder="Website" v-model="website" />

        <!-- Gender -->
        <div class="mt-8 mb-base">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
                <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
                <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
                <vs-radio v-model="gender" vs-value="other">Other</vs-radio>
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
       this.name = data.name
       this.email = data.email
    })
  },
  data () {
    return {
      image: this.$store.state.AppActiveUser.image,
      bio: this.$store.state.AppActiveUser.about,
      name: '',
      email: '',
      dob: null,
      country: 'USA',
      lang_known: ['English', 'Russian'],
      gender: 'male',
      mobile: '',
      website: '',
      // Options
      countryOptions: [
        { label: 'Australia',  value: 'australia'  },
        { label: 'France',     value: 'france'     },
        { label: 'Germany',    value: 'germany'    },
        { label: 'India',      value: 'india'      },
        { label: 'Jordan',     value: 'jordan'     },
        { label: 'Morocco',    value: 'morocco'    },
        { label: 'Portuguese', value: 'portuguese' },
        { label: 'Syria',      value: 'syria'      },
        { label: 'USA',        value: 'usa'        }
      ],
      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',  value: 'spanish'  },
        { label: 'French',   value: 'french'   },
        { label: 'Russian',  value: 'russian'  },
        { label: 'German',   value: 'german'   },
        { label: 'Arabic',   value: 'arabic'   },
        { label: 'Sanskrit', value: 'sanskrit' }
      ]
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    update() {
      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]); 

      let config = {
        header : {
          'Content-Type' : 'image/png'
        }
      }
      this.$store.dispatch('user_settings/updateProfile',this.name)
    },
    successUpload(){
      console.log('success')
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.image = URL.createObjectURL(file)
      console.log(this.image)
    }
  }
}
</script>
