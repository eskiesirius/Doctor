<template>
  <div id="simple-calendar-app">
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="simpleCalendarEvents"
        :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
        eventBorderHeight="0px"
        eventContentHeight="1.65rem"
        class="theme-default"
        @click-event="openAppointment"
        >

        <div slot="header" class="mb-4">

          <div class="vx-row no-gutter">

            <!-- Month Name -->
            <div class="vx-col w-1/3 items-center sm:flex hidden">
            </div>

            <!-- Current Month -->
            <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
              <div class="flex items-center">
                <feather-icon
                  :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                  @click="updateMonth(-1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />

                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                <feather-icon
                  :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                  @click="updateMonth(1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />
              </div>
            </div>

            <div class="vx-col sm:w-1/3 w-full flex justify-center">
              <template v-for="(view, index) in calendarViewTypes">
                <vs-button
                  v-if="calendarView === view.val"
                  :key="String(view.val) + 'filled'"
                  type="filled"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
                <vs-button
                  v-else
                  :key="String(view.val) + 'border'"
                  type="border"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
              </template>
            </div>
          </div>
        </div>
      </calendar-view>
    </div>
    <vs-popup class="holamundo" title="Appointment" :active.sync="popupActive">
      <p>
        {{title}}
        <br />
        <br />
        Patient Details
        <br />
        Email: {{email}}
        <br />
        Phone: {{phone}}
      </p>
    </vs-popup>
  </div>
</template>

<script>
import moduleAppointment from '@/store/appointment/moduleAppointment.js'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'

export default {
    components: {
        CalendarView,
        CalendarViewHeader,
        Datepicker
    },
    data () {
        return {
            showDate: new Date(),
            appointments: [],
            title: '',
            phone: '',
            email: '',

            langHe: he,
            langEn: en,

            calendarView: 'month',

            popupActive: false,


            calendarViewTypes: [
            {
                label: 'Month',
                val: 'month'
            },
            {
                label: 'Week',
                val: 'week'
            },
            {
                label: 'Year',
                val: 'year'
            }
            ]
        }
    },
    computed: {
        simpleCalendarEvents () {
            return this.$store.state.appointment.appointments
        },
        windowWidth () {
            return this.$store.state.windowWidth
        }
    },
    methods: {
        updateMonth (val) {
            this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
        },
        openAppointment(appointment) {
            console.log(appointment)
            this.title = appointment.title
            this.phone = appointment.originalEvent.phone
            this.email = appointment.originalEvent.email
            this.popupActive = true
        }
    },
    created () {
        this.$store.registerModule('appointment', moduleAppointment)
    },
    mounted () {
        this.$store.dispatch('appointment/fetchAppointments','booked')
    },
    beforeDestroy () {
        this.$store.unregisterModule('appointment')
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
