// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iview from 'iview'


import 'iview/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from './fetch'

import App from './App'
import router from './router'
import { formatDate } from './untils/until.js'
Vue.config.productionTip = false

import ECharts from 'vue-echarts/components/ECharts.vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor'

import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)


Vue.component('chart', ECharts);
Vue.use(iview)
Vue.use(VueQuillEditor)
Vue.prototype.$axios = axios
Vue.prototype.$formatDate = formatDate
router.beforeEach((to, from, next) => {
    iview.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iview.LoadingBar.finish();
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
