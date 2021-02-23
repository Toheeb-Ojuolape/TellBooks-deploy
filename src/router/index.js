import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import EPub from '@/views/EPub'
import Home from '@/views/Home'
import App from '@/views/App'
import Pdf from '@/views/Pdf'
import User from '@/views/User'
import Signup from '@/views/Signup'
import NotLogged from '@/views/NotLogged'
import Notlogin from '@/views/Notlogin'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import ForgotPassword from '@/views/ForgotPassword'
import ResetPassword from '@/views/ResetPassword'
import Google from '@/views/Google'
import SocialSignup from '@/views/SocialSignup'
import Library from '@/views/Library'
import Gift from '@/views/Gift'
import Profile from '@/views/Profile'
import Shelf from '@/views/Shelf'
import Category from '@/views/Category'
import Publish from '@/views/Publish'
import Wallet from '@/views/Wallet'
import Settings from '@/views/Settings'
import Publications from '@/views/Publications'
import EditBooks from '@/views/EditBooks'
import Books from '@/views/Books'
import Err from '@/views/Err'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/epub/:id',
    name: 'epub-reader-page',
    component: EPub
  },
  {
    path: '/pdf/:id',
    name: 'pdf-reader-page',
    component: Pdf
  },
  {
    path: '/author/:id',
    name: 'User',
    component: User
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/notlogged',
    name: 'NotLogged',
    component: NotLogged
  },
  {
    path: '/notloggedin',
    name: 'Notlogin',
    component: Notlogin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/googlesignup',
    name: 'Google',
    component: Google
  },

  {
    path: '/socialsignup',
    name: 'SocialSignup',
    component: SocialSignup
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/shelf',
    name: 'Shelf',
    component: Shelf
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/gift',
    name: 'Gift',
    component: Gift
  },

  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish
  },
  {
    path: '/publications',
    name: 'Publications',
    component: Publications
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/edit-books/:id',
    name: 'edit-books-page',
    component: EditBooks
  },
  {
    path: '/books/:id',
    name: 'Books',
    component: Books
  },
  {
    path: '/404/:id',
    name: 'Err',
    component: Err
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
