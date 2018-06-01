import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
import common from './ajaxrequest/common'
import ax from './ajaxrequest/ajaxPromise';
import rq from './ajaxrequest/requesthash';
import pop from './popalert/popalert';
import './assets/js/noshare';
import './assets/js/weChat_share.js';
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.use(YDUI);
Vue.config.productionTip = false;


window.$ = $;
window.ax = ax;
window.rq = rq;
window.common = common;
window.popalert = pop;
/* eslint-disable no-new */

const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;
            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }
        }
    }
};


new Vue({
  el: '#app',
  router,
  mixins: [historyStack],
  template: '<App :forward="forward"/>',
  components: { App }
})
