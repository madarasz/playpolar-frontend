import Vue from 'vue';
import Vuex from 'vuex';

import { challenges } from './challenges'
import { users } from './users'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        challenges,
        users
    }
});