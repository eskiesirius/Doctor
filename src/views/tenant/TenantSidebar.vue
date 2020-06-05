<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} TENANT</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

            <div class="p-6">
                <!-- Code -->
                <vs-input label="Code" v-model="code" class="mt-5 w-full" name="item-name" v-validate="'required'" />
                <span class="text-danger text-sm">{{ codeErrorMessage }}</span>

                <!-- Clinic Name -->
                <vs-input label="Clinic Name" v-model="clinic_name" class="mt-5 w-full" name="item-name" v-validate="'required'" />
                <span class="text-danger text-sm">{{ clinicNameErrorMessage }}</span>

                <!-- Clinic Address -->
                <vs-input label="Clinic Address" v-model="clinic_address" class="mt-5 w-full" name="item-name" v-validate="'required'" />
                <span class="text-danger text-sm">{{ clinicAddressErrorMessage }}</span>

                <!-- Phone -->
                <vs-input label="Phone" v-model="phone" class="mt-5 w-full" name="item-name" v-validate="'required'" />
                <span class="text-danger text-sm">{{ phoneErrorMessage }}</span>


                <!-- Income -->
                <vs-input
                label="Income"
                v-model="income"
                class="mt-5 w-full"
                v-validate="{ required: true, regex: /\d+(\.\d+)?$/ }"
                name="item-price" />
                <span class="text-danger text-sm">{{ incomeErrorMessage }}</span>
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
        VuePerfectScrollbar
    },
    data () {
        return {
            id: null,
            code: '',
            clinic_name: '',
            clinic_address: '',
            phone: '',
            income: 0,

            codeErrorMessage: '',
            clinicNameErrorMessage: '',
            clinicAddressErrorMessage: '',
            phoneErrorMessage: '',
            incomeErrorMessage: '',

            settings: { 
                maxScrollbarLength: 60,
                wheelSpeed: .60
            }
        }
    },
    watch: {
        isSidebarActive (val) {
            if (!val) return

            this.codeErrorMessage = ''
            this.clinicNameErrorMessage = ''
            this.clinicAddressErrorMessage = ''
            this.phoneErrorMessage = ''
            this.incomeErrorMessage = ''
            
            if (Object.entries(this.data).length === 0) {
                this.initValues()
                this.$validator.reset()
            } else {
                const { clinic_name, id, clinic_address, code, phone, income } = JSON.parse(JSON.stringify(this.data))
                this.id = id
                this.code = code
                this.clinic_name = clinic_name
                this.clinic_address = clinic_address
                this.phone = phone
                this.income = income
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
        isFormValid () {
            return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
        },
        scrollbarTag () { return this.$store.getters.scrollbarTag }
    },
    methods: {
        initValues () {
            if (this.data.id) return
            this.id = null
            this.code = ''
            this.clinic_name = ''
            this.clinic_address = ''
            this.phone = ''
            this.income = 0
        },
        submitData () {
            this.codeErrorMessage = ''
            this.clinicNameErrorMessage = ''
            this.clinicAddressErrorMessage = ''
            this.phoneErrorMessage = ''
            this.incomeErrorMessage = ''

            const payload = {
                id:             this.id,
                code:           this.code,
                clinic_name:    this.clinic_name,
                clinic_address: this.clinic_address,
                phone:          this.phone,
                income:         this.income,
            }

            let action = 'tenant/addTenant'

            if (this.id != null)
                action = 'tenant/updateTenant'

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

                if (error.response.data.errors.code){
                    this.codeErrorMessage = error.response.data.errors.code[0]
                }

                if (error.response.data.errors.clinic_name){
                    this.clinicNameErrorMessage = error.response.data.errors.clinic_name[0]
                }

                if (error.response.data.errors.clinic_address){
                    this.clinicAddressErrorMessage = error.response.data.errors.clinic_address[0]
                }

                if (error.response.data.errors.phone){
                    this.phoneErrorMessage = error.response.data.errors.phone[0]
                }

                if (error.response.data.errors.income){
                    this.incomeErrorMessage = error.response.data.errors.income[0]
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
