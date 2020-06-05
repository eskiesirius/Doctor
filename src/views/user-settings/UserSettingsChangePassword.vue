<template>
    <vx-card no-shadow>

        <vs-input class="w-full" type="password" label-placeholder="Old Password" v-model="old_password" />
        <span class="text-danger text-sm">{{ oldPasswordError }}</span>
        <vs-input class="w-full mt-base" type="password" label-placeholder="New Password" v-model="password" />
        <span class="text-danger text-sm">{{ passwordError }}</span>
        <vs-input class="w-full mt-base" type="password" label-placeholder="Confirm Password" v-model="password_confirmation" />

        <!-- Save & Reset Button -->
        <div class="flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="submit">Save Changes</vs-button>
        </div>
    </vx-card>
</template>

<script>
    export default {
        data () {
            return {
                old_password: '',
                password: '',
                password_confirmation: '',
                oldPasswordError: '',
                passwordError: '',
            }
        },
        computed: {
            activeUserInfo () {
                return this.$store.state.AppActiveUser
            }
        },
        methods: {
            async submit() {

                const payload = {
                    old_password:           this.old_password,
                    password:               this.password,
                    password_confirmation:  this.password_confirmation
                }
              
                this.$store.dispatch('user_settings/changePassword',payload)
                .then(() => { 
                    this.old_password = ''
                    this.password = ''
                    this.password_confirmation = ''

                    this.oldPasswordError = ''
                    this.passwordError = ''

                    this.$vs.notify({
                        color: 'success',
                        title: 'Password Changed',
                        text: 'Password changed successfully.'
                    })
                })
                .catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Error',
                        text: error.response.data.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    })

                    if (error.response.data.errors.old_password){
                        this.oldPasswordError = error.response.data.errors.old_password[0]
                    }

                    if (error.response.data.errors.password){
                        this.passwordError = error.response.data.errors.password[0]
                    }
                })
            },
          }
    }
</script>
