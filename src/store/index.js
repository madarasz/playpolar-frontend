import Vue from 'vue';
import Vuex from 'vuex';

import { challenges } from './challenges'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        challenges
    }
});