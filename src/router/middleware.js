/* jshint esversion: 6 */
import store from '../store';
import router from './index';

export function auth (to, from, next) {
    if (store.getters['auth/checkLogin']) {
        next();
    } else {
        next(false);
        router.replace({name: 'login'});
    }
}
