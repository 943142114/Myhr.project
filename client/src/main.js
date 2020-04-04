import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io';




Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:5000'
}));
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
