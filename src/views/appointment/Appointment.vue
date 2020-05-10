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
    <vs-popup v-if="activeUserInfo.role == 'patient'" classContent="popup-example" title="Show Appointment" :active.sync="showAppointment">
        {{title}}
        <br />
        <br />
        <vs-button @click="chat" color="primary" type="filled">Contact this doctor</vs-button>
    </vs-popup>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/appointment/moduleAppointment.js'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'

import moment from 'moment'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  data () {
    return {
      showDate: new Date(),
      id: 0,
      title: '',
      appointmentDate: '',
      showAppointment: false,
      user: [],

      langHe: he,
      langEn: en,

      calendarView: 'month',

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
      return this.$store.state.calendar.events
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    updateMonth (val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
    },
    openAppointment (event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.user = e.doctor;
      const appointmentDate = moment(e.appointmentDate)
      
      this.title = e.title + ' ' + appointmentDate.format('MMM DD, YYYY')
      this.appointmentDate = e.appointmentDate

      this.showAppointment = true
    },
    chat() {
        this.showAppointment = false
        this.$router.push({name: 'chat', params: this.user})
        .catch(() => {})
    }
  },
  created () {
    this.$store.registerModule('calendar', moduleCalendar)
    this.$store.dispatch('calendar/fetchEvents')
    this.$store.dispatch('calendar/fetchEventLabels')
  },
  beforeDestroy () {
    this.$store.unregisterModule('calendar')
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
