import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import login from '../views/login'
import managerMain from "../views/managerMain";
import managerHouse from "../components/manager/managerHouse";
import managerUser from "../components/manager/managerUser";
import register from "../views/register";
import tenantMain from "../views/tenantMain";
import landlordMain from "../views/landlordMain";
import managerMessage from "../components/manager/managerMessage";
import managerApply from "../components/manager/managerApply";
import managerRent from "../components/manager/managerRent";
import managerRepair from "../components/manager/managerRepair";
import managerMy from "../components/manager/managerMy";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hi',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/tenantMain',
      name: 'tenantMain',
      component: tenantMain,
      children: []
    },
    {
      path: '/landlordMain',
      name: 'landlordMain',
      component: landlordMain,
      children:[]
    },
    {
      path: '/managerMain',
      name:'managerMain',
      component: managerMain,
      children:[
        {
          path:'/managerMy',
          component:managerMy
        },
        {
          path:'/managerRent',
          component:managerRent
        },
        {
          path:'/managerRepair',
          component:managerRepair
        },
        {
          path:'/managerApply',
          component:managerApply
        },
        {
          path:'/managerHouse',
          component:managerHouse
        },
        {
          path: '/managerUser',
          component: managerUser
        },
        {
          path:'/managerMessage',
          component:managerMessage
        }
      ]
    }
  ]
})
