import Vue from 'vue';
import Vuex from 'vuex';

import { challenges } from './challenges'
import { users } from './users'
import { devices } from './devices'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        challenges,
        users,
        devices
    }
});