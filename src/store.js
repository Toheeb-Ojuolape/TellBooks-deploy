import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'
import Vuex from 'vuex'
import  db  from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
      usertype : null
    },
    books:[]
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
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
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
      context.bindFirestoreRef('books',  db.collection("books")
      .orderBy("timestamp","desc").limit(5))
    })
  }
})
