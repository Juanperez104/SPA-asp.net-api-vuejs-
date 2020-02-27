require('babel-polyfill');
const Vue = require('vue').default;

const VueRouter = require('vue-router').default;
Vue.use(VueRouter);

const InstantSearch = require('vue-instantsearch').default;
Vue.use(InstantSearch);

const App = require('./app.vue');
const router = require('./router');

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
