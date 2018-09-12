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
// VueX store
import 'es6-promise/auto'
import Vuex from 'vuex'
import { store } from './store'
Vue.use(Vuex);
// own CSS
import './assets/main.css'

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: new Router({routes: RouteList}),
    store,
    render: h => h(App)
});
