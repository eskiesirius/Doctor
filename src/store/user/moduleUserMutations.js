export default {
  SET_USER (state,users) {
    state.users = users
  },
  SET_TENANT (state,tenants) {
    state.tenants = tenants
  },
  ADD_USER (state,user) {
    state.users.push(user)
  },
  UPDATE_USER (state,user) {
  	const userIndex = state.users.findIndex((e) => e.id === user.id)
    Object.assign(state.users[userIndex], user)
  },
  REMOVE_USER (state, user_id) {
    const userIndex = state.users.findIndex((e) => e.id === user_id)
    state.users.splice(userIndex, 1)
  }
}