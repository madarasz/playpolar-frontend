import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// own CSS
import './assets/main.css'

Vue.use(Vuetify)


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: router,
    //mounted: function () {
    //    this.routeItems = RouteList.slice(0, -1);
    //}
    render: h => h(App),
});
