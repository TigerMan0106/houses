// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import login from "./views/login";
import VDistpicker from 'v-distpicker'

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:8089/house/'
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.component('v-distpicker', VDistpicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
