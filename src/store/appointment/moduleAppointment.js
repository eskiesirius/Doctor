/*=========================================================================================
  File Name: moduleCalendar.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleAppointmentState.js'
import mutations from './moduleAppointmentMutations.js'
import actions from './moduleAppointmentActions.js'
import getters from './moduleAppointmentGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
