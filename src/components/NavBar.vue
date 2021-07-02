<template>
  <v-container v-if="user.data != null" class="hidden-sm-and-down">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :right="right"
      permanent
      absolute
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img :src="user.data.photoURL">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="margin-top:12px">
              Good day, <strong>{{ user.data.displayName }} </strong>
            </v-list-item-title>
            <v-list-item-subtitle>
            <v-btn color="#f66c1f" class="white--text pa-2" rounded small to="/profile" style="height:10px;font-size:9px">Edit Profile
            </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon color="#f66c1f">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signout">
        <v-list-item-icon>
        <v-icon color="#f66c1f">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
        <v-list-item-title>Log out</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'



export default {
  name: 'NavBar',
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard",link:'/dashboard' },
        { title: "Bookshelf", icon: "mdi-bookshelf",link:'/shelf' },
        { title: "My publications", icon: "mdi-publish", link:'/publications' },
        { title: "My Library", icon: "mdi-book-open-page-variant",link:'/library' },
        { title: "My Gifts", icon: "mdi-gift", link:'/gift' },
        { title: "Audiobooks", icon: "mdi-headphones", link:'/audiobooks' },
        { title: "Chatbooks", icon: "mdi-message", link:'/chatbooks' },
        { title: "My Wallet", icon: "mdi-wallet", link:'/wallet' },
        { title: "Statistics", icon: "mdi-trending-up", link:'/statistics' },
      ],
      right: false,
      background: false,
      miniVariant:false
    }
   
  },

   computed: {
        ...mapGetters({
            // map `this.user` to `this.$store.getters.users
            user: "user"
        })        
    },

  methods: {
   signout() {
     firebase.auth().signOut().then(result => {
       console.log(result)
       this.user=''
       localStorage.removeItem('vuex')
      this.$router.push('/')
     })
   }
  }
 
  
}
</script>
