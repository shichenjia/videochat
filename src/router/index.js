import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/register.vue'
import Login from '../components/login.vue'
import Chat from '../components/chat.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/register'
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/chat',
      name: 'chat',
      component:Chat
    }
  ]
})
