/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from '../../http/requests/auth/jwt/index.js'


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default {
  loginAttempt ({ dispatch }, payload) {

    // // New payload for login action
    // const newPayload = {
    //   userDetails: payload.userDetails,
    //   notify: payload.notify,
    //   closeAnimation: payload.closeAnimation
    // }

    // // If remember_me is enabled change firebase Persistence
    // if (!payload.checkbox_remember_me) {

    //   // Change firebase Persistence
    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

    //   // If success try to login
    //     .then(function () {
    //       dispatch('login', newPayload)
    //     })

    //   // If error notify
    //     .catch(function (err) {

    //       // Close animation if passed as payload
    //       if (payload.closeAnimation) payload.closeAnimation()

    //       payload.notify({
    //         time: 2500,
    //         title: 'Error',
    //         text: err.message,
    //         iconPack: 'feather',
    //         icon: 'icon-alert-circle',
    //         color: 'danger'
    //       })
    //     })
    // } else {
    //   // Try to login
    //   dispatch('login', newPayload)
    // }
  },
  login ({ commit, state, dispatch }, payload) {

    // // If user is already logged in notify and exit
    // if (state.isUserLoggedIn()) {
    //   // Close animation if passed as payload
    //   if (payload.closeAnimation) payload.closeAnimation()

    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   })

    //   return false
    // }

    // // Try to sigin
    // firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)

    //   .then((result) => {

    //     // Set FLAG username update required for updating username
    //     let isUsernameUpdateRequired = false

    //     // if username is provided and updateUsername FLAG is true
    //     // set local username update FLAG to true
    //     // try to update username
    //     if (payload.updateUsername && payload.userDetails.displayName) {

    //       isUsernameUpdateRequired = true

    //       dispatch('updateUsername', {
    //         user: result.user,
    //         username: payload.userDetails.displayName,
    //         notify: payload.notify,
    //         isReloadRequired: true
    //       })
    //     }

    //     // Close animation if passed as payload
    //     if (payload.closeAnimation) payload.closeAnimation()

    //     // if username update is not required
    //     // just reload the page to get fresh data
    //     // set new user data in localstorage
    //     if (!isUsernameUpdateRequired) {
    //       router.push(router.currentRoute.query.to || '/')
    //       commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //     }
    //   }, (err) => {

    //     // Close animation if passed as payload
    //     if (payload.closeAnimation) payload.closeAnimation()

    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Google Login
  loginWithGoogle ({commit, state}, payload) {
    // if (state.isUserLoggedIn()) {
    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   })
    //   return false
    // }
    // const provider = new firebase.auth.GoogleAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     router.push(router.currentRoute.query.to || '/')
    //     commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //   }).catch((err) => {
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Facebook Login
  loginWithFacebook ({commit, state}, payload) {
    // if (state.isUserLoggedIn()) {
    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   })
    //   return false
    // }
    // const provider = new firebase.auth.FacebookAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     router.push(router.currentRoute.query.to || '/')
    //     commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //   }).catch((err) => {
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Twitter Login
  loginWithTwitter ({commit, state}, payload) {
    // if (state.isUserLoggedIn()) {
    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   })
    //   return false
    // }
    // const provider = new firebase.auth.TwitterAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     router.push(router.currentRoute.query.to || '/')
    //     commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //   }).catch((err) => {
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },

  // Github Login
  loginWithGithub ({commit, state}, payload) {
    // if (state.isUserLoggedIn()) {
    //   payload.notify({
    //     title: 'Login Attempt',
    //     text: 'You are already logged in!',
    //     iconPack: 'feather',
    //     icon: 'icon-alert-circle',
    //     color: 'warning'
    //   })
    //   return false
    // }
    // const provider = new firebase.auth.GithubAuthProvider()

    // firebase.auth().signInWithPopup(provider)
    //   .then((result) => {
    //     router.push(router.currentRoute.query.to || '/')
    //     commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
    //   }).catch((err) => {
    //     payload.notify({
    //       time: 2500,
    //       title: 'Error',
    //       text: err.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },
  registerUser ({dispatch}, payload) {

    // // create user using firebase
    // firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
    //   .then(() => {
    //     payload.notify({
    //       title: 'Account Created',
    //       text: 'You are successfully registered!',
    //       iconPack: 'feather',
    //       icon: 'icon-check',
    //       color: 'success'
    //     })

    //     const newPayload = {
    //       userDetails: payload.userDetails,
    //       notify: payload.notify,
    //       updateUsername: true
    //     }
    //     dispatch('login', newPayload)
    //   }, (error) => {
    //     payload.notify({
    //       title: 'Error',
    //       text: error.message,
    //       iconPack: 'feather',
    //       icon: 'icon-alert-circle',
    //       color: 'danger'
    //     })
    //   })
  },
  updateUsername ({ commit }, payload) {
    payload.user.updateProfile({
      displayName: payload.displayName
    }).then(() => {

      // If username update is success
      // update in localstorage
      const newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName = payload.displayName
      commit('UPDATE_USER_INFO', newUserData, {root: true})

      // If reload is required to get fresh data after update
      // Reload current page
      if (payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })
  },


  // JWT
  loginJWT ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
          jwt.getUserInfo().then(response => {

            // Navigate User to homepage
            router.push('/').catch(err => {})

            // Set isLoggedIn
            localStorage.setItem('isLoggedIn', true)

            // Update user details
            commit('UPDATE_USER_INFO', response.data, {root: true})

            resolve(response)
          })
        })
        .catch(error => { reject(error) })
    })
  },
  getUserInfo({ commit }){
    return new Promise((resolve, reject) => {
      jwt.getUserInfo().then(response => {
        // Update user details
        commit('UPDATE_USER_INFO', response.data, {root: true})

        resolve(response)
      }).catch(error => { reject(error) })
    })
  },
  registerUserJWT ({ commit }, payload) {

    const { name, email, password, password_confirmation, role } = payload.userDetails

    return new Promise((resolve, reject) => {

      jwt.registerUser(name, email, password, password_confirmation, role)
        .then(response => {
          // Redirect User
          router.push({ name: 'login' }).catch(err => {})

          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },
  logout({ commit }){
    return new Promise((resolve, reject) => {
      jwt.logout()
        .then(response => {
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('userInfo')

          router.push({ name: 'login'}).catch(() => {})

          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  },
  forgotPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt.forgotPassword(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => { reject(error) })
    })
  }
}
