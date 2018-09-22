import Vue from 'vue';
import Vuex from 'vuex';

import { challenges } from './challenges'
import { users } from './users'
import { devices } from './devices'
import { milestones } from './milestones'
import { orders } from './orders'
import { prizes } from './prizes'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        challenges,
        users,
        devices,
        milestones,
        orders,
        prizes
    }
});