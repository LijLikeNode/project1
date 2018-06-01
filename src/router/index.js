import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{txt:'医保通加保'}
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.txt) {
    document.title = to.meta.txt;
    // if(from.meta.txt&&from.meta.txt!='产品介绍'&&to.meta.txt=='产品介绍'){
    //   window.location.reload();
    // }
  }
  next();
});
// listener.back(router);
export default router;