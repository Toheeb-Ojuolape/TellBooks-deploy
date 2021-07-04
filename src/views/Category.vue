<template>
  <v-app>
  <v-row class="hidden-sm-and-down" no-gutters>
      <v-col
        class="hidden-sm-and-down"
        v-if="person != null"
        md="1"
        sm="1"
        lg="1"
      >
        <NavBar />
      </v-col>
      <v-spacer />
      <v-col :md="md" :sm="sm" :lg="lg">
        <div style="margin:10px 40px 0px 0px;padding:0px 10px 0px 100px">
    <v-card flat>
      <v-toolbar flat class="md-4 hidden-md-and-down ">
        <v-btn
          @click="goBack"
          color="#f66c1f"
          text
        >
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5 font-weight-black"
          height="500px"
          style="font-size:22px"
        >
          Category: {{ categoryName }}
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
    <v-main>
    <!-- laptop view -->
      <v-container class="hidden-md-and-down">
        <v-card
          width="1500px"
          height="300px"
          color="#f66c1f"
          class="mt-9 text-center"
          flat
        >
          <v-img style="padding-top:40px" width="1500px" height="350px">
            <v-text-field
              rounded
              v-model="search"
              elevation="24"
              color="#f66c1f"
              label="Search by book title"
              solo
              prepend-inner-icon="mdi-magnify"
              style="padding-top:150px;padding-left:70px;padding:100px"
            />
          </v-img>
        </v-card>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="card"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="card"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12" sm="12" xs="12">
            <v-row>
              <p
                style="margin-left:30px;margin-top:25px"
                v-for="(b, i) in categoryBooks"
                :key="i"
              >
                <v-card elevation="24" height="250" width="170">
                  <v-img
                    :src="b.bookcover"
                    height="250"
                    width="170"
                    @click="bookPage(i, b)"
                  />
                  <v-rating
                    color="#f5a623"
                    size="9"
                    readonly
                    :value="parseFloat(b.rating)"
                    class="margin-bottom:10px"
                  ></v-rating>
                </v-card>
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      </v-main>
      </div>
      </v-col>
      </v-row>
      <!-- Mobile view -->
      <v-main class="hidden-md-and-up">
      <v-toolbar flat class="md-4" color="white">
        <v-btn @click="goBack" style="color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

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
      <v-container style="margin-bottom:30px">
        <v-card
          width="1500px"
          height="250px"
          color="#f66c1f"
          class="mt-9 text-center"
          flat
        >
          <v-img style="padding-top:40px" width="1500px" height="250px">
            <v-layout flat style="margin-top:40px" transparent>
              <v-text-field
                rounded
                v-model="search"
                elevation="24"
                color="#f66c1f"
                label="Search by book title"
                solo
                prepend-inner-icon="mdi-magnify"
                style="padding-top:100px;padding-bottom:50px;padding:25px"
              />
            </v-layout>
          </v-img>
        </v-card>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4 "
              type="image,article"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4 "
              type="image,article"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="7" sm="6" xs="6">
            <v-row>
              <p
                cols="12"
                md="3"
                sm="3"
                xs="3"
                lg="3"
                style="margin-left:30px;margin-top:25px;margin-bottom:20px"
                v-for="(b, i) in categoryBooks"
                :key="i"
              >
                <v-card elevation="24" height="190" width="120">
                  <v-img
                    :src="b.bookcover"
                    height="190"
                    width="120"
                    @click="bookPage(i, b)"
                  />
                  <v-rating
                    color="#f5a623"
                    size="9"
                    readonly
                    :value="parseFloat(b.rating)"
                    class="margin-bottom:10px"
                  ></v-rating>
                </v-card>
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <BottomMenu />
  </v-app>
</template>

<script>
// import db from "../main";
import BottomMenu from "@/components/BottomMenu";
import NavBar from "@/components/NavBar";
import firebase from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  components: {
    BottomMenu,
    NavBar
  },
  data() {
    return {
      categoryName: this.$route.params.id,
      IDs: [],
      search: "",
      model: null,
      md:12,
      sm:12,
      lg:12,
      person:""
    };
  },

  computed: {
    ...mapGetters({
      books:"books",
      loading:"loading",
      user:'user'

    }),


    categoryBooks(){
      const searchBooks = this.search.toLowerCase().trim();
      const categoryBooks = this.books.filter(book => book.category == this.categoryName)
      if (!searchBooks) return categoryBooks;

      return categoryBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1 );
    },

  },

  beforeCreate(){
   this.$store.dispatch('bindBooks')
  },

  created() {
   window.scrollTo(0,0);
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      if(user !=null){
        this.sm=10
        this.md=10
        this.lg=10
      }
    });
  },

    methods: {
     bookPage(i, b) {
      this.bookID = this.IDs[i];
      if (b.filetype == "Audio") {
        this.$router.push({
          name: "Audio",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      } else if (b.filetype == "Chatbooks") {
        this.$router.push({
          name: "Chat",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      } else {
        this.$router.push({
          name: "Books",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      }
    },

    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
