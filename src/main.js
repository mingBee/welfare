import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';

Vue.config.productionTip = false

// import { Toast } from 'vant'
// Vue.use(Toast) 
window.document.addEventListener('deviceready', function (){
  Vue.prototype.$cordPlugin = window.c_plugins.merchantBridge;
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})


