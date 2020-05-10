import settings from '../../http/requests/settings/index.js'

export default {
  updateProfile({ commit, state }, payload){
    return new Promise((resolve, reject) => {
      settings.updateProfile(payload).then(response => {
        commit('UPDATE_USER_INFO', response.data, {root: true})

        resolve(response)
      })
    })
  },
  toggleItemInFavoriteList ({ commit }, item) {
    commit('TOGGLE_ITEM_IN_FAVORITE_LIST', item)
  },
}
