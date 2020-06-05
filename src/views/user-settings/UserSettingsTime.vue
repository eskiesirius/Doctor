<template>
    <vx-card no-shadow>
        <span class="text-md">Sunday</span>   
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.sunday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.sunday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('sunday')">Clear</vs-button>  
        </div>
        <div class="w-full" v-for="error in errorData.sunday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>


        <span class="text-md">Monday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.monday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.monday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('monday')">Clear</vs-button>   
        </div>
        <div class="w-full" v-for="error in errorData.monday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <span class="text-md">Tuesday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.tuesday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.tuesday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('tuesday')">Clear</vs-button>   
        </div>
        <div class="w-full" v-for="error in errorData.tuesday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <span class="text-md">Wednesday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.wednesday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.wednesday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('wednesday')">Clear</vs-button>
        </div>
        <div class="w-full" v-for="error in errorData.wednesday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <span class="text-md">Thursday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.thursday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.thursday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('thursday')">Clear</vs-button>   
        </div>
        <div class="w-full" v-for="error in errorData.thursday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <span class="text-md">Friday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.friday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.friday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('friday')">Clear</vs-button>   
        </div>
        <div class="w-full" v-for="error in errorData.friday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <span class="text-md">Saturday</span>        
        <div class="w-full mb-4">
            <flat-pickr :config="configdateTimePicker" v-model="time.saturday.start_time" placeholder="Start Time" />
            -
            <flat-pickr :config="configdateTimePicker" v-model="time.saturday.end_time" placeholder="End Time" />
            <vs-button class="ml-3" @click="clearTime('saturday')">Clear</vs-button>   
        </div>
        <div class="w-full" v-for="error in errorData.saturday">
            <span class="text-danger text-sm">{{error}}</span>
        </div>

        <vs-input class="w-full mb-4" v-model="time.interval" label="Interval(minutes)" />
        <span class="text-danger text-sm">{{errorData.interval}}</span>

        <!-- Save & Reset Button -->
        <div class="flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="setTime">Save Changes</vs-button>
        </div>
    </vx-card>
</template>

<script>
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        components: {
            flatPickr
        },
        data () {
            return {
                configdateTimePicker: {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'G:i K'
                },
                time: {
                    sunday: {
                        start_time: '',
                        end_time: '',
                    },
                    monday: {
                        start_time: '',
                        end_time: '',
                    },
                    tuesday: {
                        start_time: '',
                        end_time: '',
                    },
                    wednesday: {
                        start_time: '',
                        end_time: '',
                    },
                    thursday: {
                        start_time: '',
                        end_time: '',
                    },
                    friday: {
                        start_time: '',
                        end_time: '',
                    },
                    saturday: {
                        start_time: '',
                        end_time: '',
                    },
                    interval: 0,
                },
                errorData: {
                    sunday: {
                        start_time: '',
                        end_time: '',
                    },
                    monday: {
                        start_time: '',
                        end_time: '',
                    },
                    tuesday: {
                        start_time: '',
                        end_time: '',
                    },
                    wednesday: {
                        start_time: '',
                        end_time: '',
                    },
                    thursday: {
                        start_time: '',
                        end_time: '',
                    },
                    friday: {
                        start_time: '',
                        end_time: '',
                    },
                    saturday: {
                        start_time: '',
                        end_time: '',
                    },
                    interval: '',
                },
                table: []
            }
        },
        computed: {
            activeUserInfo () {
                return this.$store.state.AppActiveUser
            },
        },
        methods: {
            async setTime() {
                this.clearErrorMessage()

                this.$store.dispatch('user_settings/setTime',this.time).then(() => {
                    this.$vs.notify({
                        color: 'success',
                        title: 'Time Schedule Updated',
                        text: 'Time schedule was successfully updated'
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

                    if (error.response.data.errors['sunday.start_time']){
                        this.errorData.sunday.start_time = error.response.data.errors['sunday.start_time'][0]
                    }
                    if (error.response.data.errors['sunday.end_time']){
                        this.errorData.sunday.end_time = error.response.data.errors['sunday.end_time'][0]
                    }

                    if (error.response.data.errors['monday.start_time']){
                        this.errorData.monday.start_time = error.response.data.errors['monday.start_time'][0]
                    }
                    if (error.response.data.errors['monday.end_time']){
                        this.errorData.monday.end_time = error.response.data.errors['monday.end_time'][0]
                    }

                    if (error.response.data.errors['tuesday.start_time']){
                        this.errorData.tuesday.start_time = error.response.data.errors['tuesday.start_time'][0]
                    }
                    if (error.response.data.errors['tuesday.end_time']){
                        this.errorData.tuesday.end_time = error.response.data.errors['tuesday.end_time'][0]
                    }

                    if (error.response.data.errors['wednesday.start_time']){
                        this.errorData.wednesday.start_time = error.response.data.errors['wednesday.start_time'][0]
                    }
                    if (error.response.data.errors['wednesday.end_time']){
                        this.errorData.wednesday.end_time = error.response.data.errors['wednesday.end_time'][0]
                    }

                    if (error.response.data.errors['thursday.start_time']){
                        this.errorData.thursday.start_time = error.response.data.errors['thursday.start_time'][0]
                    }
                    if (error.response.data.errors['thursday.end_time']){
                        this.errorData.thursday.end_time = error.response.data.errors['thursday.end_time'][0]
                    }

                    if (error.response.data.errors['friday.start_time']){
                        this.errorData.friday.start_time = error.response.data.errors['friday.start_time'][0]
                    }
                    if (error.response.data.errors['friday.end_time']){
                        this.errorData.friday.end_time = error.response.data.errors['friday.end_time'][0]
                    }

                    if (error.response.data.errors['saturday.start_time']){
                        this.errorData.saturday.start_time = error.response.data.errors['saturday.start_time'][0]
                    }
                    if (error.response.data.errors['saturday.end_time']){
                        this.errorData.saturday.end_time = error.response.data.errors['saturday.end_time'][0]
                    }

                    if (error.response.data.errors['interval']){
                        this.errorData.interval = error.response.data.errors['interval'][0]
                    }

                })
            },
            clearTime(day) {
                this.time[day].start_time = ''
                this.time[day].end_time = ''
            },
            clearErrorMessage() {
                this.errorData.sunday.start_time = ''
                this.errorData.sunday.end_time = ''
                this.errorData.monday.start_time = ''
                this.errorData.monday.end_time = ''
                this.errorData.tuesday.start_time = ''
                this.errorData.tuesday.end_time = ''
                this.errorData.wednesday.start_time = ''
                this.errorData.wednesday.end_time = ''
                this.errorData.thursday.start_time = ''
                this.errorData.thursday.end_time = ''
                this.errorData.friday.start_time = ''
                this.errorData.friday.end_time = ''
                this.errorData.saturday.start_time = ''
                this.errorData.saturday.end_time = ''
                this.errorData.interval = ''
            }
        },
        async mounted(){
            await this.$store.dispatch('user_settings/getTime')
            const timeTable = this.$store.state.user_settings.timeTable

            this.time.sunday.start_time = timeTable.sunday != null ? timeTable.sunday.start_time : ''
            this.time.sunday.end_time = timeTable.sunday != null ? timeTable.sunday.end_time : ''

            this.time.monday.start_time = timeTable.monday != null ? timeTable.monday.start_time : ''
            this.time.monday.end_time = timeTable.monday != null ? timeTable.monday.end_time : ''

            this.time.tuesday.start_time = timeTable.tuesday != null ? timeTable.tuesday.start_time : ''
            this.time.tuesday.end_time = timeTable.tuesday != null ? timeTable.tuesday.end_time : ''

            this.time.wednesday.start_time = timeTable.wednesday != null ? timeTable.wednesday.start_time : ''
            this.time.wednesday.end_time = timeTable.wednesday != null ? timeTable.wednesday.end_time : ''

            this.time.thursday.start_time = timeTable.thursday != null ? timeTable.thursday.start_time : ''
            this.time.thursday.end_time = timeTable.thursday != null ? timeTable.thursday.end_time : ''

            this.time.friday.start_time = timeTable.friday != null ? timeTable.friday.start_time : ''
            this.time.friday.end_time = timeTable.friday != null ? timeTable.friday.end_time : ''

            this.time.saturday.start_time = timeTable.saturday != null ? timeTable.saturday.start_time : ''
            this.time.saturday.end_time = timeTable.saturday != null ? timeTable.saturday.end_time : ''

            this.time.interval = timeTable.interval
        },
    }
</script>
