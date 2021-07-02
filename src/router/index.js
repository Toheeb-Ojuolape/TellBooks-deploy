import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import EPub from '@/views/EPub'
import Home from '@/views/Home'
import App from '@/views/App'
import Pdf from '@/views/Pdf'
import User from '@/views/User'
import Signup from '../views/Auth/Signup.vue'
import NotLogged from '../views/Auth/NotLogged'
import Notlogin from '../views/Auth/Notlogin'
import Login from '../views/Auth/Login'
import Dashboard from '@/views/Dashboard'
import ForgotPassword from '../views/Auth/ForgotPassword'
import ResetPassword from '../views/Auth/ResetPassword'
import Google from '../views/Auth/Google'
import SocialSignup from '../views/Auth/SocialSignup'
import Library from '../views/Library'
import Gift from '@/views/Gift'
import Profile from '@/views/Profile'
import Shelf from '@/views/Shelf'
import Search from '@/views/Search'
import Category from '@/views/Category'
import Publish from '@/views/Publish'
import Wallet from '@/views/Wallet'
import Settings from '@/views/Settings'
import Publications from '@/views/Publications'
import Statistics from '@/views/Statistics'
import EditBooks from '@/views/EditBooks'
import Audiobooks from "@/views/Audiobooks"
import Chatbooks from "@/views/Chatbooks"
import Books from '@/views/Books'
import Audio from '@/views/Audio'
import Chat from '@/views/Chat'
import Err from '@/views/Err'
import Error from '@/views/Error'

Vue.use(VueRouter)
Vue.use(VueMeta)

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
    path: '/search',
    name: 'Search',
    component: Search
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
    path: '/audiobooks',
    name: 'Audiobooks',
    component: Audiobooks
  },
  {
    path: '/chatbooks',
    name: 'Chatbooks',
    component: Chatbooks
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
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
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
    path: '/audio/:id',
    name: 'Audio',
    component: Audio
  },
  {
    path: '/chatbooks/:id',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/404/:id',
    name: 'Err',
    component: Err
  },
  {
    path: '/:id',
    name: 'Error',
    component: Error
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
