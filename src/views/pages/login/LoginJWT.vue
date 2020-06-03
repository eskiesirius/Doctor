<template>
  <div>
    <vs-input
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ emailErrorMessage }}</span>

    <vs-input
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="w-full mt-6" />
    <span class="text-danger text-sm">{{ passwordErrorMessage }}</span>

    <div class="flex flex-wrap justify-between my-5">
        <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button  type="border" @click="registerUser">Register</vs-button>
      <vs-button @click="loginJWT">Login</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: 'gg@gg.com',
      password: '123123',
      checkbox_remember_me: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
    }
  },
  methods: {
    loginJWT () {
      // Loading
      this.$vs.loading()

      this.emailErrorMessage = ''
      this.passwordErrorMessage = ''

      const payload = {
        userDetails: {
          email: this.email,
          password: this.password
        }
      }
      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => { this.$vs.loading.close() })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.response.data.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })

          if (error.response.data.errors.email){
            this.emailErrorMessage = error.response.data.errors.email[0]
            this.isValidEmail = false
          }

          if (error.response.data.errors.password){
            this.passwordErrorMessage = error.response.data.errors.password[0]
            this.isValidPassword = false
          }
        })
    },
    registerUser () {
      this.$router.push({ name: 'register' })
    }
  }
}

</script>

