// import Vue from 'vue'
import App from './App.vue'

import request from "./utils/request.js";
import "./assets/css/index.css"
import router from './router'

// import element from "./elementui/index"
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(element)

Vue.prototype.request = request
Vue.config.productionTip = false

new Vue({

  router,
  render: h => h(App)
}).$mount('#app')