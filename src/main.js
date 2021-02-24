
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMeta from 'vue-meta'
import vuetify from './plugins/vuetify'
import Flutterwave from 'vue-flutterwave'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script'
import firebase from "firebase/app"
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false
Vue.use(VueMeta);
Vue.use(vuetify);
Vue.use(Flutterwave, { publicKey: 'FLWPUBK-f92a354d64f5b330062fe7928f4321f6-X' });
Vue.use(LoadScript);

const firebaseConfig = {
  apiKey: "AIzaSyB_J3tpEk-HaVB5vy57bfIKlL9QeScYVNU",
  authDomain: "tellbookstore.firebaseapp.com",
  databaseURL: "https://tellbookstore.firebaseio.com",
  projectId: "tellbookstore",
  storageBucket: "tellbookstore.appspot.com",
  messagingSenderId: "811081774579",
  appId: "1:811081774579:web:f6b9d56c73693c7b2b0e86",
  measurementId: "G-0LD60PJ532"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics()

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

export default firebaseApp.firestore()



new Vue({
  router,
  vuetify,
  store,
  VueMeta,
  render: h => h(App)
}).$mount('#app')
