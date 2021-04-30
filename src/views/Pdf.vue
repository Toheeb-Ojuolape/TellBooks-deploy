<template>
  <v-app v-if="book != null">
    <v-overlay v-if="book != null" :value="overlay" opacity="1">
      <v-progress-circular
        :rotate="360"
        :size="190"
        :width="20"
        :value="value"
        style="text-align:center;font-size:19px;color:#f66c1f;margin-left:30px"
      >
        {{ value }}%
      </v-progress-circular>
      <p style="font-size:21px; padding-top:10px;text-align:center">
        Loading your ebook...<br/>
        <span style="font-size:9px">Pdf files usually take a while to load. Abeg No vex..</span>
      </p>
    </v-overlay>

    <v-overlay v-if="book != null" :value="loadingProgress" opacity="1">
      <v-progress-circular
        :size="150"
        :width="10"
        indeterminate
        style="text-align:center;font-size:19px;color:#f66c1f;margin-left:30px"
      ></v-progress-circular>
      <p style="font-size:21px; padding-top:10px;text-align:center">
        Loading Reading Progress
      </p>
    </v-overlay>

    <v-dialog v-model="dialog" max-width="500">
      <v-card elevation="24" color="black" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-book-open</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-black"
        >
          Instructions
        </h1>
        <p style="font-size:15px;color:white">
          Hi. Swipe RIGHT to move to the next page. Swipe LEFT to move to the previous
          page. Swipe Up/Down to see reading menu.
        </p>
        <v-btn @click="startReading()" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>

    <v-main
    v-for="(book,i) in singleBook" :key="i"
      v-touch="{
        left: () => page++,
        right: () => page--,
        up: () => (ifShow = !ifShow),
        down: () => (ifShow = !ifShow)
      }"

    >
      <v-card color="grey lighten-4" tile class="title-bar" v-if="ifShow">
        <v-toolbar dense>
          <v-btn style="margin-left:-11px" icon @click="goBack()"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-spacer></v-spacer>

          <v-btn icon :color="color" @click="bookmark()">
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>

          <v-menu transition="slide-y-transition" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>
                  <v-btn text :to="item.link">
                    <v-icon color="#f66c1f" style="margin:5px">{{
                      item.icon
                    }}</v-icon
                    >{{ item.title }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-card>
      <div @click="ifShow = !ifShow">
      <pdf
        :src="book.book"
        :page="page"
        :rotate="rotate"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"/>
        </div>
    </v-main>
    <v-dialog v-model="goTo" max-width="370" max-height="500" persistent>
      <v-card class="text-center" color="#f66c1f">
        <v-card-text class="text-center white--text pt-8">
          Kindly enter page number below
        </v-card-text>
        <div
          class="white--text"
          style="font-size:11px;margin-top:-18px;margin-bottom:21px"
        >
          You're currently on page: {{ currentPage }} of {{ pageCount }}
        </div>
        <v-text-field
          v-model="page"
          color="white"
          class="white--text px-5"
          label="Enter page number"
        />
        <v-card-actions style="text-align:center">
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            outlined
            @click="goTo = false"
            class="white--text mb-3"
          >
            Close
          </v-btn>

          <v-btn
            color="white"
            @click="goPage()"
            class="orange--text mb-3 px-3 mx-3"
            :loading="loading"
          >
            Go To page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      @click="goTo = true"
      tile
      class="white--text"
      style="margin-top:0px;margin-bottom:10px"
      color="black"
      >{{ currentPage }} / {{ pageCount }}</v-btn
    >

    <v-card color="grey lighten-4" tile class="footer-bar hidden-md-and-down">
      <v-toolbar color="black" dense>
      <v-btn color="white" text @click="prev()"><v-icon class="white-text">mdi-chevron-left</v-icon>Previous</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="next()">Next<v-icon color="white">mdi-chevron-right</v-icon></v-btn>
      </v-toolbar>
    </v-card>

    <v-slider
      v-model="page"
      color="#fa9746"
      thumb-label
      min="1"
      :max="pageCount"
    ></v-slider>

    <v-container v-if="ifShow" style="margin-top:10px">
      <v-bottom-navigation grow color="orange" fixed>
        <v-btn @click="rotate -= 90" small>
          <span>Turn Left</span>
          <v-icon>mdi-rotate-left</v-icon>
        </v-btn>

        <v-btn @click="rotate += 90" small>
          <span>Turn Right</span>
          <v-icon>mdi-rotate-right</v-icon>
        </v-btn>

        <v-btn @click="goTo = true" small>
          <span>Go To</span>
          <v-icon>mdi-gesture-double-tap</v-icon>
        </v-btn>

        <v-switch
          v-model="switch1"
          color="orange darken-3"
          @click="off"
        ></v-switch>
      </v-bottom-navigation>
    </v-container>
    <v-snackbar v-model="offline" top :multi-line="multiLine">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="offline = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
  <v-app v-else style="text-align:center">
    <v-main style="background:#f66c1f">
      <h1
        class="font-weight-bold white--text"
        style="margin:20px;font-size:42px;padding-top:270px"
      >
        Sorry, this page does not exist
      </h1>
      <p style="font-size:19px;color:white">
        But you can still find your way back home
      </p>
      <v-btn
        x-large
        elevation="24"
        style="margin-top:30px;font-size:20px;color:#f66c1f"
        to="/shelf"
      >
        Go Home</v-btn
      >
    </v-main>
  </v-app>
</template>

<script>
import pdf from "vue-pdf";
import db from "../main";
import { mapGetters } from "vuex";
import slugify from "slugify"

export default {
  components: {
    pdf
  },
  data() {
    return {
      book: "",
      switch1: false,
      reading: false,
      color: "#262a41",
      dialog:false,
      read: "",
      readers: [],
      items: [
        {
          title: "Gift Book",
          link: "/books/" + this.$route.params.id,
          icon: "mdi-gift"
        },
        {
          title: "Rate Book",
          link: "/books/" + this.$route.params.id,
          icon: "mdi-star"
        },
        { title: "Go to Library", link: "/library", icon: "mdi-bookshelf" }
      ],
      page: 1,
      rotate: 0,
      ifShow: false,
      overlay: true,
      currentPage: 0,
      pageCount: 0,
      goTo: false,
      loading: false,
      offline: false,
      multiLine: true,
      value: 0,
      bookName: this.$route.params.id,
      message: "",
      loadingProgress: false
    };
  },

  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      books:"books"
    }),
   
   singleBook(){
     return this.books.filter(book => book.slug == this.bookName)
   },
   readerName(){
      return slugify(this.user.data.displayName, {
               replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
      })
    }

  },

  created() {
    this.$store.dispatch('bindBooks')
    this.renderBook();
  },

  methods: {

    startReading(){
        this.dialog = false 
        this.page = this.page +1
    },
    renderBook() {
      let ref = db.collection("books").doc(this.$route.params.id);
      let retrievedData = localStorage.getItem(this.bookName);
      let readingProgress = JSON.parse(retrievedData);
      if (localStorage.getItem(this.bookName) != null) {
        this.read = readingProgress[0];
        this.page = parseFloat(readingProgress[1]);
        this.pageCount = parseFloat(readingProgress[2])
        this.overlay = false;
        this.loadingProgress = true;
        setTimeout(() => (this.loadingProgress = false), 16000);
      } else {
        ref
          .get()
          .then(books => {
            this.book = books.data();
            this.read = books.data().book;
          })
          .then(() => {
            if (this.book.readers.includes(this.user.data.displayName)) {
              this.overlay = true;
              setTimeout(() => (this.overlay = false,this.dialog= true), 16000);
            } else if (this.book.readers.includes(this.user.data.uid)) {
              this.overlay = true;
              setTimeout(() => (this.overlay = false,this.dialog= true), 16000);
            } else if (this.book.author == this.readerName) {
              this.overlay = true;
              setTimeout(() => (this.overlay = false,this.dialog= true), 16000);
            } else {
              this.overlay = false;
              this.$router.push({
                name: "Err",
                params: { id: this.book.slug }
              });
            }
          });
      }
    },

    bookmark() {
      this.color = "#fa9746";
    },

    toggleTitleAndFootbar() {
      this.ifShow = !this.ifShow;
    },

    goBack() {
      this.$router.go(-1);
              let saved = [this.read, this.page, this.pageCount];
              localStorage.setItem(this.bookName, JSON.stringify(saved));
    },

    goPage(){
      this.goTo= false
    },

    prev(){
      this.page = this.page-1
      window.scrollTo(0,0);
    },
     next(){
      this.page = this.page+1
      window.scrollTo(0,0);
    },

    savePage() {
      window.addEventListener(
        "beforeunload",
        () => {
              let saved = [this.read, this.page, this.pageCount];
              localStorage.setItem(this.bookName, JSON.stringify(saved));
        },
        false
      );
    },

    off() {
      if (this.switch1 != false) {
        this.offline = true;
        this.message =
          "Offline mode activated. You can now switch off your data";
      } else {
        this.offline = true;
        this.message = "Offline mode deactivated.";
      }
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 5;
    }, 1000);
    this.savePage();
  },

  beforeDestroy() {
              let saved = [this.read, this.page, this.pageCount];
              localStorage.setItem(this.bookName, JSON.stringify(saved));
  }
};
</script>

<style scoped>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
.v-btn {
  text-transform: none !important;
}
</style>
