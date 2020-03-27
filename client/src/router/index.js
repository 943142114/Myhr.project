import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index"
import login from "../views/login";
import register from "../views/register"
import NotFound from "../views/404"
import Home from "../views/Home"
import infoshow from "../views/infoshow";
import FundList from "../views/FundList";
import BasicList from "../views/BasicList";
import SeniorList from "../views/SeniorList";
import CompanyAccountSet from "../views/CompanyAccountSet";
import Peomon from "../views/Peomon";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: '/index',
        component: index,
        children:[
            {
                path:'',
                component:Home
            },
            {
                path:'/home',
                name:'home',
                component:Home
            },{
                path:'/infoshow',
                name:'infoshow',
                component:infoshow
            },{
                path:'/FundList',
                name:'FundList',
                component:FundList
            },{
                path:'/BasicList',
                name:'BasicList',
                component:BasicList
            },{
                path:'/SeniorList',
                name:'SeniorList',
                component:SeniorList
            },{
                path:'/CompanyAccountSet',
                name:'CompanyAccountSet',
                component:CompanyAccountSet
            },{
                path:'/Peomon',
                name:'Peomon',
                component:Peomon
            }
        ]
    },
    {
        path: '/register',
        name: '/register',
        component: register
    }, {
        path: '*',
        name: '/404',
        component: NotFound
    },
    {
        path: '/login',
        name: '/login',
        component: login
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {
    const islogin = localStorage.eletoken ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        islogin ? next() : next('/login')
    }
})




export default router
