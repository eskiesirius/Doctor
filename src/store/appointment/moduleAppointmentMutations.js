/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_APPOINTMENT (state,appointments) {
    state.appointments = appointments
  },
  REMOVE_APPOINTMENT (state, appointment_id) {
    const appointmentIndex = state.appointments.findIndex((e) => e.id === appointment_id)
    state.appointments.splice(appointmentIndex, 1)
  }
}
