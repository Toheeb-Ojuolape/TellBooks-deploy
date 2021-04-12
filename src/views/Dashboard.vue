<template>
  <v-app>
    <!-- Desktop view -->
    <v-card>
      <v-toolbar class="md-4 hidden-md-and-down ">
        <v-toolbar-title
          class="ml-14 my-5 font-weight-bold"
          height="500px"
          style="font-size:22px"
        >
          Dashboard
        </v-toolbar-title>

        <v-spacer />

        <v-btn fab text to="/shelf">
          <v-icon class="green--text">mdi-magnify</v-icon>
        </v-btn>

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class="white--text mr-5"
          style="font-size:15px;"
        >
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Publish Book
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card>
      <v-toolbar class="md-4 hidden-lg-and-up" color="white" fixed-on-scroll>
        <v-toolbar-title>
          <v-avatar @click.stop="drawer = !drawer" height="40px" width="40px">
            <img :src="user.photoURL" />
          </v-avatar>

          <a
            style="font-size:16px;text-decoration:none;color:black"
            @click.stop="drawer = !drawer"
            >Hi <b>{{ user.displayName }} </b></a
          >
        </v-toolbar-title>

        <v-spacer />


        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class=" mr-5"
          style="font-size:15px;color:white"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>
    </v-card>
    <NavBar />
    <v-card
      flat
      elevation="24"
      max-width="444"
      class="mx-auto mt-6 hidden-md-and-down"
      style="text-align:center"
    >
      <v-carousel
        :cycle="true"
        interval="4000"
        :show-arrows="true"
        :show-arrows-on-hover="true"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="340"
        :to="slide.link"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :to="slide.link">
          <v-sheet :color="colors[i]" height="100%" tile :to="slide.link">
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              :to="slide.link"
            >
              <p
                class="font-weight-bold body-2"
                style="font-size:18px;text-align:center;padding-top:90px;padding-bottom:10px;padding-left:40px;padding-right:30px"
              >
                {{ slide.quote }}
              </p>
              <p
                style="font-size:14px;padding-top:-40px;padding-bottom:30px;text-align:center"
              >
                {{ slide.by }}
              </p>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-btn
        style="margin-top:10px;margin-bottom:10px"
        class="white--text"
        color="#f66c1f"
        to="/shelf"
      >
        Go To Bookshelf <v-icon>mdi-chevron-right</v-icon></v-btn
      >
    </v-card>

    <v-row
      class="mt-9 hidden-md-and-down"
      no-gutters
      style="margin-left:70px;margin-right:60px"
    >
      <v-col md="4" class="pr-2">
        <v-card
          to="/publications"
          width="inherit"
          elevation="15"
          height="120"
          color="#c9f6cd"
        >
          <br />
          <div class="text-center">
            <br />
            <v-icon class="pt-2" color="#3CB414">mdi-upload</v-icon>
            <div class="caption text-center" style="color:#3CB414">
              My Publications
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="4" class="pr-2">
        <v-card elevation="15" to="/library" height="120px" color="#f66c1f">
          <br />
          <div class="text-center">
            <br />
            <v-icon class="pt-2" color="white">mdi-bookshelf</v-icon>
            <div class="caption text-center" style="color:white">
              My Library
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card elevation="15" to="/profile" height="120px" color="#c9f6cd">
          <br />
          <div class="text-center">
            <br />
            <v-icon class="pt-2" color="#3CB414">mdi-account</v-icon>
            <div class="caption text-center" style="color:#3CB414">
              Account Details
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      class="mt-3 hidden-md-and-down"
      style="margin-left:70px;margin-right:60px;margin-bottom:40px"
      no-gutters
    >
      <v-col md="4" class="pr-2">
        <v-card
          to="/settings"
          width="inherit"
          elevation="15"
          height="120"
          color="#f66c1f"
        >
          <br />
          <div class="text-center">
            <v-icon class="pt-4 white--text">mdi-cogs</v-icon>
            <div class="caption text-center white--text">
              Settings
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="4" class="pr-2">
        <v-card elevation="15" to="/gift" height="120px" color="#c9f6cd">
          <br />
          <div class="text-center">
            <v-icon class="pt-4" color="#3CB414">mdi-gift</v-icon>
            <div class="caption text-center" style="color:#3CB414">
              Gifts
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card elevation="15" to="/wallet" height="120px" color="#f66c1f">
          <br />
          <div class="text-center">
            <br />
            <v-icon class="pt-2 white--text">mdi-credit-card-outline</v-icon>
            <div class="caption text-center white--text">
              My Wallet
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- Mobile view -->

    <p
      style="padding-top:40px;margin-bottom:-20px;padding-left:40px; font-size:19px"
      class="font-weight-bold headline hidden-lg-and-up"
    >
      New Books
    </p>
    <hr
      style="margin-top:20px;color:black;margin-left:40px;margin-bottom:-20px;width:17%"
      class="hidden-lg-and-up"
    />
    <v-spacer />
    <v-btn
      width="70px"
      to="/shelf"
      color="#f66c1f"
      style="margin-left:250px;"
      class="white--text hidden-lg-and-up"
      rounded
      x-small
      >See all</v-btn
    >
    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n">
        <v-skeleton-loader
          class="mb-6 mt-4 hidden-lg-and-up"
          type="image"
          v-if="loading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-slide-group
      v-model="model"
      class="pa-4 hidden-lg-and-up"
      active-class="success"
      show-arrows
      color="white"
    >
      <v-slide-item
        v-for="(book, i) in limitBooks"
        :key="i"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? undefined : 'white'"
          class="ma-4"
          height="230"
          width="145"
          elevation="5"
          @click="toggle"
        >
          <v-img
            v-if="book.filetype == 'Audio'"
            elevation="24"
            hover
            width="145px"
            height="230px"
            :src="book.bookcover"
            @click="audioPage(i,book)"
          />
          <v-img
           v-if="book.filetype == 'Chatbook'"
            elevation="24"
            hover
            width="145px"
            height="230px"
            :src="book.bookcover"
            @click="chatPage(i, book)"
          />
           <v-img
           v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
            elevation="24"
            hover
            width="145px"
            height="230px"
            :src="book.bookcover"
            @click="bookPage(i, book)"
          />
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-card
      color="#F3FFF1"
      flat
      class="mx-8 hidden-lg-and-up"
      to="/publications"
      style="margin-left:40px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#147D03"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <p
        class="font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        View Publications
      </p>
      <p style="font-size:14px;margin-top:-10px;padding-left:30px">
        Check out books published by you
      </p>
    </v-card>
    <v-card
      color="#FFDBBE"
      flat
      class="mx-8 hidden-lg-and-up"
      to="/gift"
      style="margin-left:40px;margin-top:20px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#f66c1f"
        ><v-icon>mdi-gift</v-icon></v-btn
      >
      <p
        class="font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        My Gifts
      </p>
      <p style="font-size:14px;margin-top:-10px;padding-left:30px">
        Check out books that were bought <br />
        for you by friends
      </p>
    </v-card>
    <v-card
      color="#e2e3ec"
      flat
      class="mx-8 hidden-lg-and-up"
      to="/audiobooks"
      style="margin-left:40px;margin-top:20px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="black"
        ><v-icon>mdi-headphones</v-icon></v-btn
      >
      <p
        class="font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        AudioBooks
      </p>
      <p style="font-size:14px;margin-top:-10px;padding-left:30px">
        Listen to audiobooks/podcasts by your favourite authors
      </p>
    </v-card>
    <v-card
      color="#fbbec3"
      flat
      class="mx-8 hidden-lg-and-up"
      to="/chatbooks"
      style="margin-left:40px;margin-top:20px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#f935a9"
        ><v-icon>mdi-message</v-icon></v-btn
      >
      <p
        class="font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        ChatBooks
      </p>
      <p style="font-size:14px;margin-top:-10px;padding-left:30px">
        Read stories in their chat-like version.
      </p>
    </v-card>

    <v-card
      color="#CAEDFF"
      flat
      class="mx-8 hidden-lg-and-up"
      to="/wallet"
      style="margin-left:40px;margin-top:20px;margin-bottom:60px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#1773ea"
        ><v-icon>mdi-cash-multiple</v-icon></v-btn
      >
      <p
        class="font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        Wallet
      </p>
      <p style="font-size:14px;margin-top:-10px;padding-left:30px">
        Manage your purchases and earnings
      </p>
    </v-card>

    <v-dialog v-model="audiobooks" max-width="500">
      <v-card elevation="24" color="black" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-headphones</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-bold"
        >
          Coming soon!
        </h1>
        <p style="font-size:15px;color:white">
          Audiobooks will be available on Tell! Books soon,
          {{ user.displayName }}
        </p>
        <v-btn @click="audiobooks = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="chatbooks" max-width="500">
      <v-card elevation="24" color="#FF69B4" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-message</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-bold"
        >
          Coming soon!
        </h1>
        <p style="font-size:15px;color:white">
          Chatbooks will be available on Tell! Books soon,
          {{ user.displayName }}
        </p>
        <v-btn @click="chatbooks = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item class="mt-4">
        <v-list-item-avatar height="50px" width="50px">
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          <v-list-item-subtitle
            ><v-btn
              to="/profile"
              x-small
              color="#ff7052"
              class="white--text"
              rounded
              >Edit Profile</v-btn
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon color="#f66c1f">{{ item.icon }} </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <BottomMenu />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
// import store from "../store"
import {mapGetters} from "vuex"
export default {
  name: "Dashboard",
  components: {
    NavBar,
    BottomMenu,
  },
  data() {
    return {
      user: "",
      slide: "",
      cycle: true,
      drawer: null,
      model: null,
      audiobooks: false,
      chatbooks: false,
      IDs: [],
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
        { title: "Bookshelf", icon: "mdi-bookshelf", link: "/shelf" },
        {
          title: "My Library",
          icon: "mdi-book-open-page-variant",
          link: "/library"
        },
        {
          title: "My publications",
          icon: "mdi-publish",
          link: "/publications"
        },
        { title: "My Wallet", icon: "mdi-wallet", link: "/wallet" },
        { title: "Settings", icon: "mdi-cogs", link: "/settings" },
        { title: "Statistics", icon: "mdi-trending-up", link: "/statistics" },
        { title: "Book deals", icon: "mdi-tag", link: "/publications" },
        { title: "Gifts", icon: "mdi-gift", link: "/gift" }
      ],
      colors: [
        "#0066f5",
        "#48c857",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1"
      ],
      slides: [
        {
          quote:
            '"Books and all forms of writing are terror to those who wish to suppress the truth"',
          by: "- Wole Soyinka",
          link: "/shelf"
        },
        {
          quote:
            '"What works for me is that I read widely and stay focused on my writing."',
          by: "- Sefi Atta",
          link: "/shelf"
        },
        {
          quote:
            '"Stories, like food, lose their flavor if cooked in a hurry." ',
          by: "- Ngũgĩ wa Thiong’o",
          link: "/shelf"
        },
        {
          quote: '"If you do not like my story,write your own"',
          by: "- Chinua Achebe",
          link: "/shelf"
        },
        {
          quote: '"To choose to write is to reject silence."',
          by: "- Chimamandah Adichie",
          link: "/shelf"
        }
      ]
    };
  },
  computed:{
    
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      books: "books",
      loading:"loading"
    }),


    limitBooks(){

      return this.books.slice(0,5)
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (!this.user) this.$router.push("/login");
    });

  },

  created(){
    this.$store.dispatch('bindBooks')
  },
  methods: {

    chatPage(i,book) {
     this.bookID = this.IDs[i];
      this.$router.push({
        name: "Chat",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    },
    
    bookPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Books",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    },
    audioPage(i,book) {
     this.bookID = this.IDs[i];
      this.$router.push({
        name: "Audio",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    }
  }
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}

</style>
