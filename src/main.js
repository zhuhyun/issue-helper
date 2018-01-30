// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import UiNuclear from '@oneitfarm/ui-nuclear'
import '@oneitfarm/ui-nuclear/dist/main.css'
import VueI18n from 'vue-i18n'
// import $ from 'jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

Vue.use(UiNuclear)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'zh': require('./lang/zh/index'),
    'en': require('./lang/en/index')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
