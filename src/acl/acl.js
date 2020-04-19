import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'admin'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.role) initialRole = userInfo.role

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    admin  : new AclRule('admin').generate(),
    doctor : new AclRule('doctor').or('admin').generate(),
    regular: new AclRule('doctor').or('admin').or('patient').generate(),
  }
})
