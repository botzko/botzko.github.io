// main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router-template.js'; // Import the router configuration from the external file

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
