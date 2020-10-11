import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.mixin({
  computed: {
    StoreContacts() {
      return store.state.contacts;
    },
    user () {
      return store.state.user;
    }
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
