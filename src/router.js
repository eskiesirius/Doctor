/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      meta: {
        authRequired: true
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard'
        },
        // =============================================================================
        // My Routes
        // =============================================================================
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/dashboard/DoctorDashboard.vue'),
          meta: {
            rule: 'doctor',
          }
        },
        {
          path: '/dashboard/admin',
          name: 'dashboard-admin',
          component: () => import('./views/dashboard/DoctorDashboard.vue'),
          meta: {
            rule: 'superAdmin',
          }
        },
        {
          path: '/tenant',
          name: 'tenant',
          component: () => import('@/views/tenant/Tenant.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Tenant', active: true }
            ],
            parent: 'tenant',
            pageTitle: 'Tenant',
            rule: 'superAdmin'
          }
        },
        {
          path: '/appointment/reserve',
          name: 'appointment-reserve',
          component: () => import('@/views/appointment/Appointment.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Appointment', active: true }
            ],
            pageTitle: 'Appointment List',
            rule: 'doctor',
            status: 'reserved'
          }
        },
        {
          path: '/appointment/pending',
          name: 'appointment-pending',
          component: () => import('@/views/appointment/Appointment.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Appointment', active: true }
            ],
            pageTitle: 'Appointment List',
            rule: 'doctor',
            status: 'pending'
          }
        },
        {
          path: '/appointment/book',
          name: 'appointment-book',
          component: () => import('@/views/appointment/Appointment.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Appointment', active: true }
            ],
            pageTitle: 'Appointment List',
            rule: 'doctor',
            status: 'booked'
          }
        },
        {
          path: '/appointment/cancel',
          name: 'appointment-cancel',
          component: () => import('@/views/appointment/Appointment.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Appointment', active: true }
            ],
            pageTitle: 'Appointment List',
            rule: 'doctor',
            status: 'cancelled'
          }
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: () => import('@/views/calendar/Calendar.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Calendar', active: true }
            ],
            parent: 'calendar',
            pageTitle: 'Calendar',
            rule: 'doctor'
          }
        },
        {
          path: '/invoice',
          name: 'invoice',
          component: () => import('@/views/invoice/InvoiceList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Invoice', active: true }
            ],
            parent: 'invoice',
            pageTitle: 'Invoice',
            rule: 'doctor'
          }
        },
        {
          path: '/invoice/:id',
          name: 'invoice-details',
          component: () => import('@/views/invoice/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Invoice', url: '/invoice' },
              { title: 'Invoice Details', active: true }
            ],
            parent: 'invoice',
            pageTitle: 'Invoice Details',
            rule: 'doctor'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/User.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User', active: true }
            ],
            parent: 'user',
            pageTitle: 'User',
            rule: 'superAdmin'
          }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'doctor'
          }
        },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/Login.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/register/Register.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/error-404',
          name: 'error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/not-authorized',
          name: 'not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'patient'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'patient'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if ((to.name == 'login' || to.name == 'register') && isLoggedIn){
    return next('/')
  }

  if (to.matched.some(m => m.meta.authRequired) && !isLoggedIn){
    router.push({ name: 'login' }).catch(err => {})
  }

  return next()
})

export default router
