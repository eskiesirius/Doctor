export default {
  SET_TENANT (state,tenants) {
    state.tenants = tenants
  },
  ADD_TENANT (state,tenant) {
    state.tenants.push(tenant)
  },
  UPDATE_TENANT (state,tenant) {
  	const tenantIndex = state.tenants.findIndex((e) => e.id === tenant.id)
    Object.assign(state.tenants[tenantIndex], tenant)
  },
  REMOVE_TENANT (state, tenant_id) {
    const tenantIndex = state.tenants.findIndex((e) => e.id === tenant_id)
    state.tenants.splice(tenantIndex, 1)
  }
}