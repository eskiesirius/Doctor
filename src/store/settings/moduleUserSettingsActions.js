import settings from '../../http/requests/settings/index.js'

export default {
  updateProfile({ commit, state }, payload){
    return new Promise((resolve, reject) => {
      settings.updateProfile(payload).then(response => {
        commit('UPDATE_USER_INFO', response.data, {root: true})

        resolve(response)
      })
    })
  }
}
