<template>
  <v-app>
    <!-- Desktop view -->
    <v-row class="hidden-sm-and-down" no-gutters>
      <v-col
        class="hidden-sm-and-down"
        v-if="user != null"
        md="1"
        sm="1"
        lg="1"
      >
        <NavBar />
      </v-col>
      <v-spacer/>
      <v-col md="10" sm="10" lg="10">
        <div style="margin:10px 0px 0px 110px;padding:0px 160px 0px 0px">
        <Toolbar />
          <h1>Explore</h1>

          <v-form v-on:submit.prevent="find()">
            <v-text-field
              style="border-radius:8px;width:900px;font-size:17px;margin:14px 10px 20px 0px"
              outlined
              label="Search books by title, author name or category"
              clearable
              max-width="900px"
              color="#008140"
              v-model="search"
              append-icon="mdi-magnify"
              @click:append="find()"
            />
          </v-form>

          <p
            style="margin-bottom:-20px; font-size:19px"
            class="font-weight-bold"
          >
            New Books
          </p>
          <v-spacer />
          <v-btn
            width="40px"
            to="/shelf"
            color="#f66c1f"
            style="float:right"
            rounded
            text
            >See all</v-btn
          >

          <v-slide-group
            v-model="model"
            class="pt-3"
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
                  elevation="24"
                  hover
                  width="145px"
                  height="230px"
                  :src="book.bookcover"
                  @click="bookPage(i, book)"
                />
                <v-row>
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



          <v-row class="mt-9 hidden-sm-and-down" no-gutters>
          <v-col md=8 lg=8 sm=8>
          <v-row  no-gutters>
            <v-col  class="pr-2">
              <v-card
                color="#F3FFF1"
                flat
                to="/publications"
                height="210px"
                 width="inherit"
              >
                <v-btn fab small style="margin:30px;color:white" color="#147D03"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
                <p
                  class="black--text font-weight-bold"
                  style="font-size:21px;margin-top:-20px;padding-left:30px"
                >
                  View Publications
                </p>
                <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
                  Check out books published by you
                </p>
              </v-card>
            </v-col>
            <v-col class="pr-2">
              <v-card
                color="#FFDBBE"
                flat
                to="/gift"
                height="210px"
                width="inherit"
              >
                <v-btn fab small style="margin:30px;color:white" color="#f66c1f"
                  ><v-icon>mdi-gift</v-icon></v-btn
                >
                <p
                  class="black--text font-weight-bold"
                  style="color:black;font-size:21px;margin-top:-20px;padding-left:30px"
                >
                  My Gifts
                </p>
                <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
                  Check out books that were bought <br />
                  for you by friends
                </p>
              </v-card>
            </v-col>
          </v-row>

          <v-row style="margin-bottom:99px" class="mt-3 hidden-sm-and-down" no-gutters>
          <v-col  class="pr-2">
          <v-card
      color="#e2e3ec"
      flat
      to="/audiobooks"
      height="210px"
      width='inherit'
    >
      <v-btn fab small style="margin:30px;color:white" color="black"
        ><v-icon>mdi-headphones</v-icon></v-btn
      ><v-badge color="green" content="New" />
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        AudioBooks
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding:0px 30px 0px 30px">
        Listen to audiobooks/podcasts by your favourite authors
      </p>
    </v-card>
            </v-col>
            <v-col class="pr-2 hidden-sm-and-down">
              <v-card
                flat
                to="/chatbooks"
                width="inherit"
                height="210px"
                color="#fbbec3"
              >
                <v-btn fab small style="margin:30px;color:white" color="#f935a9"
        ><v-icon>mdi-message</v-icon></v-btn
      >
      <v-badge color="green" content="New" />
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        ChatBooks
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Read stories in their chat-like version.
      </p>
              </v-card>
            </v-col>
          </v-row>
          </v-col>
          
          <v-col md=4 lg=4 sm=4 class="pl-2">
          <v-card
      color="#CAEDFF"
      flat
      style="padding-top:35%"
      to="/wallet"
      height="82%"
      width="inherit"
    >
      <v-btn fab small style="margin:30px;color:white" color="#1773ea"
        ><v-icon>mdi-cash-multiple</v-icon></v-btn
      >
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        Wallet
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Manage your purchases and earnings
      </p>
    </v-card>
          </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Mobile view -->

    <!--Phone Toolbar for Dashboard page -->
    <v-card flat class="mt-6 md-4 hidden-md-and-up">
      <v-toolbar flat class="md-4 hidden-md-and-up" fixed-on-scroll>
        <v-toolbar-title>
          <v-avatar @click.stop="drawer = !drawer" height="40px" width="40px">
            <img :src="person.photoURL" />
          </v-avatar>

          <a
            style="color:#f66c1f;font-size:16px;text-decoration:none"
            @click.stop="drawer = !drawer"
            >Hi <b>{{ person.displayName }} </b></a
          >
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          rounded
          elevation="12"
          to="/publish"
          color="#f66c1f"
          style="font-size:15px;color:white"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>
    </v-card>
      
    <!--Phone view dashboard end -->
    <v-form v-on:submit.prevent="find()">
            <v-text-field
              style="padding:0px 20px 0px 33px;border-radius:8px;font-size:17px;margin:30px 10px -30px 0px"
              outlined
              label="Search books by title, author name or category"
              clearable
              max-width="900px"
              color="#008140"
              v-model="search"
              append-icon="mdi-magnify"
              @click:append="find()"
              class="hidden-md-and-up"
            />
          </v-form>
    <p
      style="padding-top:40px;margin-bottom:-20px;padding-left:40px; font-size:19px"
      class="font-weight-bold headline hidden-md-and-up"
    >
      New Books

      <v-btn
      width="30px"
      text
      to="/shelf"
      color="#f66c1f"
      style="float:right;font-size:14px"
      class="mr-8 hidden-md-and-up"
      rounded
      x-small
      >See all</v-btn
    >
    </p>
    
    
    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n">
        <v-skeleton-loader
          class="mb-6 mt-4 hidden-sm-and-up"
          type="image"
          v-if="loading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-slide-group
      v-model="model"
      class="pa-4 hidden-md-and-up"
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
            @click="audioPage(i, book)"
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
      class="d-flex flex-wrap"
      flat
      tile
      style="margin:0px 15px 80px 15px"
    >
    <v-card
      color="#F3FFF1"
      flat
      class="hidden-md-and-up"
      to="/publications"
      style="margin-left:10px;margin-bottom:10px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#147D03"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <p
        class="font-weight-bold black--text"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        View Publications
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Check out books published by you
      </p>
    </v-card>
    <v-card
      color="#FFDBBE"
      flat
      class="hidden-md-and-up"
      to="/gift"
      style="margin-left:10px;margin-bottom:10px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#f66c1f"
        ><v-icon>mdi-gift</v-icon></v-btn
      >
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        My Gifts
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Check out books that were bought <br />
        for you by friends
      </p>
    </v-card>

    <v-card
      color="#e2e3ec"
      flat
      class="hidden-md-and-up"
      to="/audiobooks"
      style="margin-left:10px;margin-bottom:10px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="black"
        ><v-icon>mdi-headphones</v-icon></v-btn
      ><v-badge color="green" content="New" />
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        AudioBooks
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Listen to audiobooks/podcasts by your favourite authors
      </p>
    </v-card>
    <v-card
      color="#fbbec3"
      flat
      class="hidden-md-and-up"
      to="/chatbooks"
      style="margin-left:10px;margin-bottom:10px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#f935a9"
        ><v-icon>mdi-message</v-icon></v-btn
      >
      <v-badge color="green" content="New" />
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        ChatBooks
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Read stories in their chat-like version.
      </p>
    </v-card>

    <v-card
      color="#CAEDFF"
      flat
      class="hidden-md-and-up"
      to="/wallet"
      style="margin-left:10px"
      height="200px"
      width="310px"
    >
      <v-btn fab small style="margin:30px;color:white" color="#1773ea"
        ><v-icon>mdi-cash-multiple</v-icon></v-btn
      >
      <p
        class="black--text font-weight-bold"
        style="font-size:21px;margin-top:-20px;padding-left:30px"
      >
        Wallet
      </p>
      <p style="color:black;font-size:14px;margin-top:-10px;padding-left:30px">
        Manage your purchases and earnings
      </p>
    </v-card>
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
          {{ person.displayName }}
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
          {{ person.displayName }}
        </p>
        <v-btn @click="chatbooks = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item class="mt-4">
        <v-list-item-avatar height="50px" width="50px">
          <v-img :src="person.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ person.displayName }}</v-list-item-title>
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

    <BottomMenu class="hidden-md-and-up" />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import Toolbar from '@/components/Toolbar'
// import store from "../store"
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    NavBar,
    BottomMenu,
    Toolbar
  },
  data() {
    return {
      slide: "",
      search: "",
      cycle: true,
      drawer: null,
      model: null,
      audiobooks: false,
      chatbooks: false,
      showSearch: false,
      scrollInvoked: 0,
      person:"",
      IDs: [],
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
        { title: "Bookshelf", icon: "mdi-bookshelf", link: "/shelf" },
        {
          title: "My Library",
          icon: "mdi-book-open-page-variant",
          link: "/library",
        },
        {
          title: "My publications",
          icon: "mdi-plus",
          link: "/publications",
        },
        { title: "My Wallet", icon: "mdi-wallet", link: "/wallet" },
        { title: "Statistics", icon: "mdi-trending-up", link: "/statistics" },
        { title: "Gifts", icon: "mdi-gift", link: "/gift" },
      ],
      colors: [
        "#0066f5",
        "#48c857",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1",
      ],
      slides: [
        {
          quote:
            '"Books and all forms of writing are terror to those who wish to suppress the truth"',
          by: "- Wole Soyinka",
          link: "/shelf",
        },
        {
          quote:
            '"What works for me is that I read widely and stay focused on my writing."',
          by: "- Sefi Atta",
          link: "/shelf",
        },
        {
          quote:
            '"Stories, like food, lose their flavor if cooked in a hurry." ',
          by: "- Ngũgĩ wa Thiong’o",
          link: "/shelf",
        },
        {
          quote: '"If you do not like my story,write your own"',
          by: "- Chinua Achebe",
          link: "/shelf",
        },
        {
          quote: '"To choose to write is to reject silence."',
          by: "- Chimamandah Adichie",
          link: "/shelf",
        },
      ],
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      books: "books",
      loading: "loading",
      user:"user"
    }),

    limitBooks() {
      return this.books.slice(0, 5);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      if (!this.person) this.$router.push("/login");
    });
  },

  beforeCreate(){
    this.$store.dispatch("bindBooks");
  },

  created() {
    window.scrollTo(0,0);
  },
  methods: {
    find() {
      this.$router.push(`/search?key=${this.search}`);
    },

    bookPage(i, book) {
      this.bookID = this.IDs[i];
      if (book.filetype == "Audio") {
        this.$router.push({
          name: "Audio",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      } else if (book.filetype == "Chatbooks") {
        this.$router.push({
          name: "Chat",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      } else {
        this.$router.push({
          name: "Books",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      }
    },
    signout() {
     firebase.auth().signOut().then(result => {
       localStorage.removeItem('vuex')
       console.log(result)
       this.user=''
       localStorage.removeItem('vuex')
      this.$router.push('/')
     })
   }
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
</style>
