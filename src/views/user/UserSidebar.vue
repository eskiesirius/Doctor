<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} USER</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <!-- Tenants -->
                <v-select v-model="tenant" placeholder="Tenant" value="id" :clearSearchOnSelect="false" label="clinic_name" class="mt-5 w-full" :options="tenants" />
                <span class="text-danger text-sm">{{ tenantIdErrorMessage }}</span>

                <!-- First Name -->
                <vs-input label="First Name" v-model="first_name" class="mt-5 w-full" name="item-name" />
                <span class="text-danger text-sm">{{ firstNameErrorMessage }}</span>

                <!-- Last Name -->
                <vs-input label="Last Name" v-model="last_name" class="mt-5 w-full" name="item-name" />
                <span class="text-danger text-sm">{{ lastNameErrorMessage }}</span>

                <!-- Email -->
                <vs-input label="Email" v-model="email" class="mt-5 w-full" name="item-name" type="email" />
                <span class="text-danger text-sm">{{ emailErrorMessage }}</span>

                <!-- Phone -->
                <vs-input label="Phone" v-model="phone" class="mt-5 w-full" name="item-name" />
                <span class="text-danger text-sm">{{ phoneErrorMessage }}</span>

                <!-- Password -->
                <vs-input label="Password" v-model="password" class="mt-5 w-full" name="item-name" type="password" v-if="Object.entries(this.data).length === 0" />
                <span class="text-danger text-sm" v-if="Object.entries(this.data).length === 0">{{ passwordErrorMessage }}</span>

                <!-- Biography -->
                <vs-textarea label="Biography" v-model="biography" class="mt-5 w-full" name="item-name" />

                <!-- Specialization -->
                <vs-input label="Specialization" v-model="specialization" class="mt-5 w-full" name="item-name" />

                <!-- Gender -->
                <div class="mt-5 w-full">
                    <label class="text-sm">Gender</label>
                    <div class="mt-2">
                        <vs-radio v-model="gender" vs-value="male" class="mr-4">Male</vs-radio>
                        <vs-radio v-model="gender" vs-value="female" class="mr-4">Female</vs-radio>
                    </div>
                </div>

            </div>
        </component>

        <div class="flex flex-wrap items-center p-6" slot="footer">
            <vs-button class="mr-6" @click="submitData">Submit</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {
    props: {
        isSidebarActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        VuePerfectScrollbar,
        vSelect
    },
    data () {
        return {
            id: null,
            tenant: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            biography: '',
            specialization: '',
            gender: 'male',

            tenantIdErrorMessage: '',
            firstNameErrorMessage: '',
            lastNameErrorMessage: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            phoneErrorMessage: '',
            genderErrorMessage: '',

            settings: { 
                maxScrollbarLength: 60,
                wheelSpeed: .60
            }
        }
    },
    watch: {
        async isSidebarActive (val) {
            if (!val) return

            this.tenantIdErrorMessage = ''
            this.firstNameErrorMessage = ''
            this.lastNameErrorMessage = ''
            this.emailErrorMessage = ''
            this.passwordErrorMessage = ''
            this.phoneErrorMessage = ''
            this.genderErrorMessage = ''

            await this.$store.dispatch('user/fetchTenants')

            if (Object.entries(this.data).length === 0) {
                this.initValues()
                this.$validator.reset()
            } else {
                const { id, tenant, first_name, last_name, email, phone, biography, specialization, gender } = JSON.parse(JSON.stringify(this.data))

                this.id = id
                this.tenant = tenant
                this.first_name = first_name
                this.last_name = last_name
                this.email = email
                this.phone = phone
                this.biography = biography
                this.specialization = specialization
                this.gender = gender
                this.initValues()
            }
        }
    },
    computed: {
        isSidebarActiveLocal: {
            get () {
                return this.isSidebarActive
            },
            set (val) {
                if (!val) {
                    this.$emit('closeSidebar')
                }
            }
        },
        tenants () {
            return this.$store.state.user.tenants
        },
        isFormValid () {
            return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
        },
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
        initValues () {
            if (this.data.id) return

            this.id = null
            this.tenant = ''
            this.first_name = ''
            this.last_name = ''
            this.email = ''
            this.password = ''
            this.phone = ''
            this.biography = ''
            this.specialization = ''
            this.gender = 'male'
        },
        submitData () {
            this.tenantIdErrorMessage = ''
            this.firstNameErrorMessage = ''
            this.lastNameErrorMessage = ''
            this.emailErrorMessage = ''
            this.passwordErrorMessage = ''
            this.phoneErrorMessage = ''
            this.genderErrorMessage = ''

            const payload = {
                id:             this.id,
                tenant_id:      this.tenant ? this.tenant.id : '',
                first_name:     this.first_name,
                last_name:      this.last_name,
                email:          this.email,
                password:       this.password,
                phone:          this.phone,
                biography:      this.biography,
                specialization: this.specialization,
                gender:         this.gender,
            }

            let action = 'user/addUser'

            if (this.id != null)
                action = 'user/updateUser'

            this.$store.dispatch(action, payload)
            .then(() => { 
                this.$vs.loading.close() 
                this.$emit('closeSidebar')
                this.initValues()
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

                if (error.response.data.errors.tenant_id){
                    this.tenantIdErrorMessage = error.response.data.errors.tenant_id[0]
                }
                if (error.response.data.errors.first_name){
                    this.firstNameErrorMessage = error.response.data.errors.first_name[0]
                }
                if (error.response.data.errors.last_name){
                    this.lastNameErrorMessage = error.response.data.errors.last_name[0]
                }
                if (error.response.data.errors.email){
                    this.emailErrorMessage = error.response.data.errors.email[0]
                }
                if (error.response.data.errors.password){
                    this.passwordErrorMessage = error.response.data.errors.password[0]
                }
                if (error.response.data.errors.phone){
                    this.phoneErrorMessage = error.response.data.errors.phone[0]
                }
                if (error.response.data.errors.gender){
                    this.genderErrorMessage = error.response.data.errors.gender[0]
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
        z-index: 52010;
    }

    ::v-deep .vs-sidebar {
        z-index: 52010;
        width: 400px;
        max-width: 90vw;

        .img-upload {
            margin-top: 2rem;

            .con-img-upload {
                padding: 0;
            }

            .con-input-upload {
                width: 100%;
                margin: 0;
            }
        }
    }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
        overflow-y: auto;
    }
}
</style>
