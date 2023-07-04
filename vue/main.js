var Home = {
    template: '<h1>Welcome to the Home page!</h1>'
  };
  
  var Dashboard = {
    template: '<h1>Welcome to the Dashboard page!</h1>'
  };
  
  var router = new VueRouter({
    routes: [
      { path: '/', component: Home },
      { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
    ]
  });
  
  router.beforeEach(function (to, from, next) {
    var requiresAuth = to.matched.some(function (record) {
      return record.meta.requiresAuth;
    });
  
    var currentUser = firebase.auth().currentUser;
  
    if (requiresAuth && !currentUser) {
      next('/');
    } else {
      next();
    }
  });
  
  new Vue({
    el: '#app',
    router: router
  });