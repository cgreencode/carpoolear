import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import auth from './modules/auth';
import cordova from './modules/cordova';
import trips from './modules/trips';
import device from './modules/device';
import myTrips from './modules/my-trips';
import conversations from './modules/conversations';
import cars from './modules/car';
import friends from './modules/friends';
import passenger from './modules/passenger';
import notifications from './modules/notifications';
import rates from './modules/rates';
Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    state: {
        appVersion: 1
    },
    modules: {
        auth,
        cordova,
        trips,
        device,
        myTrips,
        conversations,
        cars,
        friends,
        passenger,
        notifications,
        rates
    }
});
