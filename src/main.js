// import Vue from 'vue';
import  Vue from  'vue/dist/vue.js';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
//
import 'element-ui/lib/theme-chalk/index.css';
import ELEMENT from 'element-ui';
//
import './moduleConfig';

import _ from 'lodash';

import echarts from 'echarts';

import 'babel-polyfill';

import days from  'dayjs';
import VueContextMenu from 'vue-contextmenu'
Vue.use(ELEMENT);
Vue.use(VueContextMenu);

Vue.config.productionTip = false;
Vue.prototype.funTool = _;
Vue.prototype.$echarts = echarts;

// 时间处理插件
Vue.prototype.$days = days;
//

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


// new Vue({
//     el: '#app',
//     router,
//     store,
//     template: '<App/>',
//     components: { App }
// });


