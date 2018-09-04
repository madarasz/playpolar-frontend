import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/main.css'


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: router,
    //mounted: function () {
    //    this.routeItems = RouteList.slice(0, -1);
    //}
    render: h => h(App),
});
