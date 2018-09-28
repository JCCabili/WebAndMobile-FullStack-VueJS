// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import dbCon from 'dbCon'
// var VueFire = require('vuefire')
// var firebase = require('firebase')

// explicit installation required in module environments
// Feather JS
// Vue.use(VueFire)
// var firebaseApp = firebase.initializeApp({
//   apiKey: 'AIzaSyDIX2_wWhfaABgs1cUh2fN5cJoFn4DoJNY',
//   authDomain: 'day2-e2328.firebaseapp.com',
//   databaseURL: 'https://day2-e2328.firebaseio.com',
//   projectId: 'day2-e2328',
//   storageBucket: 'day2-e2328.appspot.com',
//   messagingSenderId: '387825597306'
// })
// var dbCon = firebaseApp.database()

Vue.prototype.$dbCon = dbCon

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: All,
  directives: All
})

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})
