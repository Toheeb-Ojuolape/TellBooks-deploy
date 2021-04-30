import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'
import Vuex from 'vuex'
import  db  from '@/main'
// import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)


// const vuexLocal = new VuexPersistence({
//   strictMode: true, 
//   storage: window.localStorage,
//   reducer: (state) => state.books,
//   filter: (mutation) => mutation.type == 'SET_BOOKS'
// })

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
      usertype : null
    },
    books:[],
    reviews:[],
    users:[],
    loading:true,
  },
  getters: {
    user(state){
      return state.user
    },
    auth(state){
      return state.user
    },
    books: (state) => {
      return state.books;
    },
    reviews:(state) => {
      return state.reviews
    },
    users:(state) => {
      return state.users
    },
    loading:(state) =>{
      return state.loading
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_BOOKS(state,status){
      state.books = status
    },
    SET_LOADING_STATUS(state,status){
      state.loading = status
    },
    ...vuexfireMutations,
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    bindBooks: firestoreAction(context => {
      context.commit('SET_LOADING_STATUS',true)
      context.bindFirestoreRef('books',  db.collection("books")
      .orderBy("timestamp","desc")).then(() =>{
      context.commit('SET_LOADING_STATUS',false)
       
      })
    }),
    bindUsers: firestoreAction(context => {
      context.bindFirestoreRef('users',  db.collection("users"))
    })
  },
  // plugins: [vuexLocal.plugin]
})
