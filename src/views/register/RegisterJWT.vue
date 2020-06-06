<template>
  <div class="clearfix">
    <vs-input
      label-placeholder="Name"
      name="name"
      placeholder="Name"
      v-model="name"
      class="w-full" />
    <span class="text-danger text-sm">{{ nameErrorMessage }}</span>

    <vs-input
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ emailErrorMessage }}</span>

    <vs-input
      ref="password"
      type="password"
      name="password"
      label-placeholder="Password"
      placeholder="Password"
      v-model="password"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ passwordErrorMessage }}</span>

    <vs-input
      type="password"
      name="password_confirmation"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="password_confirmation"
      class="w-full mt-6" />

    <div class="flex flex-wrap justify-between my-5 w-full">
      <ul>
        <li class="inline-block mr-5">
          <vs-radio v-model="role" vs-value="admin">admin</vs-radio>
        </li>
        <li class="inline-block mr-5">
          <vs-radio v-model="role" vs-value="doctor">doctor</vs-radio>
        </li>
        <li class="inline-block mr-5">
          <vs-radio v-model="role" vs-value="patient">patient</vs-radio>
        </li>
      </ul>
      <span class="text-danger text-sm">{{ roleErrorMessage }}</span>
    </div>
    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox>
    <vs-button  type="border" to="/login" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="registerUserJWt">Register</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      nameErrorMessage: '',
      roleErrorMessage: '',
      isTermsConditionAccepted: true,
      role: ''
    }
  },
  methods: {
    registerUserJWt () {

      this.$vs.loading()

      const payload = {
        userDetails: {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          role: this.role
        },
      }
      
      this.nameErrorMessage
      this.emailErrorMessage = ''
      this.passwordErrorMessage = ''
      this.roleErrorMessage = ''
      this.$store.dispatch('auth/registerUserJWT', payload)
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

          if (error.response.data.errors.name){
            this.nameErrorMessage = error.response.data.errors.name[0]
          }

          if (error.response.data.errors.email){
            this.emailErrorMessage = error.response.data.errors.email[0]
          }

          if (error.response.data.errors.password){
            this.passwordErrorMessage = error.response.data.errors.password[0]
          }

          if (error.response.data.errors.role){
            this.roleErrorMessage = error.response.data.errors.role[0]
          }
        })
    }
  }
}
</script>
