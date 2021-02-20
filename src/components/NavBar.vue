<template>
  <v-container v-if="user.data != null" class="hidden-md-and-down">
    <v-navigation-drawer
      v-model="drawer"
      color="#071602"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      absolute
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img :src="user.data.photoURL">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="margin-top:12px;color:white">
              Good day, <strong>{{ user.data.displayName }} </strong>
            </v-list-item-title>
            <v-list-item-subtitle>
            <v-btn text to="/profile" style="color:white; font-size:9px;margin-right:100px;margin-top:-12px;margin-left:-14px">Edit Profile
            </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn text class="grey--text mx--3" @click="signout">
          <v-icon style="margin-left:-14px;color:white">mdi-logout</v-icon>
        </v-btn>
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
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard",link:'/dashboard' },
        { title: "Bookshelf", icon: "mdi-bookshelf",link:'/shelf' },
        { title: "My publications", icon: "mdi-publish", link:'/publications' },
        { title: "My Library", icon: "mdi-book-open-page-variant",link:'/library' },
        { title: "My Gifts", icon: "mdi-gift", link:'/gift' },
        { title: "Audiobooks", icon: "mdi-headphones", link:'' },
        { title: "Chatbooks", icon: "mdi-message", link:'' },
        { title: "My Wallet", icon: "mdi-wallet", link:'/wallet' },
        { title: "Settings", icon: "mdi-cogs",link:'/settings' },
        { title: "Statistics", icon: "mdi-trending-up", link:'/publications' },
        { title: "Book deals", icon: "mdi-tag", link:'/publications' },
      ],
      right: false,
      permanent: true,
      miniVariant: true,
      expandOnHover: true,
      background: false,
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
      this.$router.push('/')
     })
   }
  }
 
  
}
</script>
