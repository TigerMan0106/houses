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
import tenantMessage from "../components/tenant/tenantMessage";
import landlordMessage from "../components/landlord/landlordMessage";
import tenantMy from "../components/tenant/tenantMy";
import tenantHouse from "../components/tenant/tenantHouse";
import tenantApply from "../components/tenant/tenantApply";
import tenantRent from "../components/tenant/tenantRent";
import tenantRepair from "../components/tenant/tenantRepair";
import landlordMy from "../components/landlord/landlordMy";
import landlordHouse from "../components/landlord/landlordHouse";
import landlordApply from "../components/landlord/landlordApply";
import landlordRent from "../components/landlord/landlordRent";
import landlordRepair from "../components/landlord/landlordRepair";
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
      children: [
        {
          path: '/tenantMessage',
          component: tenantMessage
        },
        {
          path: '/tenantMy',
          component: tenantMy
        },
        {
          path:'/tenantHouse',
          component: tenantHouse
        },
        {
          path:'/tenantApply',
          component: tenantApply
        },
        {
          path: '/tenantRent',
          component: tenantRent
        },
        {
          path: '/tenantRepair',
          component: tenantRepair
        }
      ]
    },
    {
      path: '/landlordMain',
      name: 'landlordMain',
      component: landlordMain,
      children:[
        {
          path: '/landlordMessage',
          component: landlordMessage
        },
        {
          path: '/landlordMy',
          component: landlordMy
        },
        {
          path:'/landlordHouse',
          component: landlordHouse
        },
        {
          path:'/landlordApply',
          component: landlordApply
        },
        {
          path:'/landlordRent',
          component: landlordRent
        },
        {
          path: '/landlordRepair',
          component: landlordRepair
        }
      ]
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
