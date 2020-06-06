/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard',
        name: 'dashboard',
        slug: 'dashboard',
        i18n: 'Main'
      },
      {
        url: '/dashboard/admin',
        name: 'Admin',
        slug: 'dashboard-admin',
        i18n: 'Admin'
      },
    ]
  },
  {
    header: 'Menu',
    icon: 'PackageIcon',
    i18n: 'Menu',
    items: [
      {
        url: '/tenant',
        name: 'Tenant',
        slug: 'tenant',
        icon: 'HomeIcon',
        i18n: 'Tenant'
      },
      {
        url: null,
        name: 'Appointment',
        icon: 'CalendarIcon',
        i18n: 'Appointment',
        submenu: [
          {
            url: '/appointment/reserve',
            slug: 'appointment-reserve',
            name: 'Reserved',
            i18n: 'Reserved',
          },
          {
            url: '/appointment/pending',
            slug: 'appointment-pending',
            name: 'Pending',
            i18n: 'Pending',
          },
          {
            url: '/appointment/book',
            slug: 'appointment-book',
            name: 'Booked',
            i18n: 'Booked',
          },
          {
            url: '/appointment/cancel',
            slug: 'appointment-cancel',
            name: 'Cancelled',
            i18n: 'Cancelled',
          }
        ]
      },
      {
        url: '/calendar',
        name: 'Calendar',
        slug: 'calendar',
        icon: 'CalendarIcon',
        i18n: 'Calendar'
      },
      {
        url: '/invoice',
        slug: 'invoice',
        name: 'Invoice',
        icon: 'InfoIcon',
        i18n: 'Invoice'
      },
      {
        url: '/user',
        slug: 'user',
        name: 'User Management',
        icon: 'UsersIcon',
        i18n: 'User Management'
      },
      {
        url: '/settings',
        slug: 'settings',
        name: 'User Settings',
        icon: 'SettingsIcon',
        i18n: 'User Settings'
      },
    ]
  },
]

