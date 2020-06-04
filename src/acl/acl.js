import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'Patient'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.roles) initialRole = userInfo.roles[0].name

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    superAdmin  : new AclRule('Super Admin').generate(),
    doctor 			: new AclRule('Doctor').or('Super Admin').generate(),
    patient			: new AclRule('Doctor').or('Super Admin').or('Patient').generate(),
  }
})
