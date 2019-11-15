import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import apolloProvider from './plugins/vue-apollobase'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
