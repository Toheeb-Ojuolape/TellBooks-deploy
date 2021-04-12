<template>
  <v-app>
    <!-- Desktop view -->
    <v-card>
      <v-toolbar class="md-4 hidden-md-and-down ">
        <v-btn
          @click="goBack"
          class="ml-16"
          color="#f66c1f"
          style="color:white"
        >
          <v-icon color="white">mdi-chevron-left</v-icon>Back
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

      <v-toolbar class="md-4 hidden-lg-and-up" color="white">
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
    </v-card>
    <NavBar />
    <v-main>
    <!-- laptop view -->
      <v-container class="hidden-md-and-down">
        <v-card
          width="1500px"
          height="300px"
          color="#f66c1f"
          class="mt-9 text-center"
          elevation="24"
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
      <!-- Mobile view -->
      <v-container class="hidden-lg-and-up" style="margin-bottom:30px">
        <v-card
          width="1500px"
          height="250px"
          color="#f66c1f"
          class="mt-9 text-center"
          elevation="24"
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
              class="mb-6 mt-4 hidden-lg-and-up"
              type="image,article"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4 hidden-lg-and-up"
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
    };
  },

  computed: {
    ...mapGetters({
      books:"books",
      loading:"loading"

    }),


    categoryBooks(){
      const searchBooks = this.search.toLowerCase().trim();
      const categoryBooks = this.books.filter(book => book.category == this.categoryName)
      if (!searchBooks) return categoryBooks;

      return categoryBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1 );
    },

  },

  created() {
   window.scrollTo(0,0);
    this.$store.dispatch('bindBooks')
  },

    methods: {
      
    bookPage(i, b) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Books",
        params: { id: b.slug, book: b, bookID: this.bookID }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
