import Vue from 'vue'
import App from './App.vue'
// Vue Router
import Router from 'vue-router'
import RouteList from './route-list.js'
Vue.use(Router);
// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);
// own CSS
import './assets/main.css'

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: new Router({routes: RouteList}),
    render: h => h(App)
});
