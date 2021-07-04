<template>
  <v-app>
    <v-main style="background:#fbe4c4">
      <v-toolbar color="#fbe4c4" flat class="md-4 hidden-md-and-down ">
        <v-btn
          text
          @click="goBack"
           width="10px"
          color="#f66c1f"
        >
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5 font-weight-bold"
          height="500px"
          style="font-size:22px"
        >
          Audio Books
        </v-toolbar-title>

        <v-spacer />

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
      <v-toolbar color="#fbe4c4" flat class="hidden-lg-and-up">
        <v-btn @click="goBack" style="color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />
      </v-toolbar>

      <v-form @submit.prevent="find()">
        <v-text-field
          v-model="search"
          rounded
          elevation="24"
          color="#f66c1f"
          label="Search by audiobook title, author or category"
          solo
          prepend-inner-icon="mdi-magnify"
          style="padding-top:100px;max-width:80%;margin:auto auto 60px auto"
        />
      </v-form>
      <v-card
        flat
        width="100%"
        style="border-radius:50px 50px 0px 0;padding-top:70px;padding-bottom:80px"
      >
        <p
          style="margin-bottom:10px;padding-left:10px;font-size:19px"
          class="font-weight-bold ml-3"
        >
          BestSellers
        </p>

        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
          </v-col>
        </v-row>
        <p
          v-if="loading"
          style="padding-top:40px;margin-bottom:10px;padding-left:10px;font-size:19px"
          class="font-weight-bold ml-3"
        >
          New Audiobooks
        </p>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="image,article"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <div class="scrollmenu">
          <div class="carousel" v-for="(book, i) in filteredAudio" :key="i">
            <v-card
              height="220px"
              width="300px"
              elevation="18"
              style="border-radius:20px;padding:40px;padding-top:40px"
            >
              <v-row>
                <div style="float:left;width:50%">
                <v-card elevation="20" height="130px" width="90px">
                  <img :src="book.bookcover" height="130px" width="90px" />
                  </v-card>
                </div>
                <div style="text-align:start;float:left;width:50%">
                  <div
                    v-if="book.title.length < 20"
                    style="text-align:start;font-size:18px"
                    class="font-weight-bold"
                  >
                    {{ book.title }}
                  </div>
                  <div
                    v-else
                    style="text-align:start;font-size:18px"
                    class="font-weight-bold"
                  >
                    {{ book.title.slice(0, 20) }}...
                  </div>
                  <router-link
                    style="color:#f66c1f;text-decoration:none;text-align:start;font-size:16px;"
                    color="#f66c1f"
                    :to="`/author/${book.author}`"
                  >
                    {{ book.author }}
                  </router-link>
                  <div style="margin-right:19px;width:1px">
                    <v-rating
                      readonly
                      dense
                      :value="parseFloat(book.rating)"
                      width="1px"
                      color="#f6b911"
                      size="14"
                    />
                  </div>
                  <p style="text-align:start;font-size:14px">{{String(book.description).slice(0,30)}}...</p>
                  <v-btn
                    :to="`/audio/${book.slug}`"
                    style="float:right;margin-bottom:20px"
                    small
                    fab
                    class="pulsingButton"
                    color="black"
                  >
                    <v-icon color="white">mdi-play</v-icon></v-btn
                  >
                </div>
              </v-row>
            </v-card>
          </div>
        </div>
        <div class="mb-10">
          <p
            style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
            class="font-weight-bold ml-3"
          >
            New Audio Books
          </p>
          <v-btn
            to="/category/audio"
            class="px-3 mb-2 mr-3"
            style="text-decoration:none;font-size:10px;padding:5px;float:right;color:white;margin-top:17px"
            color="black"
            rounded
            x-small
            >see all</v-btn
          >
        </div>
        <v-spacer />
        <v-slide-group
          v-model="model"
          class="mt-2 ml-2"
          active-class="success"
          show-arrows
          color="white"
          style="margin-left:-10px"
        >
          <v-slide-item
            v-for="(book, i) in filteredAudio"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? undefined : 'white'"
              class="ma-4"
              height="190"
              width="120"
              elevation="7"
              @click="toggle"
            >
              <v-img
                elevation="24"
                hover
                width="120px"
                height="190px"
                :src="book.bookcover"
                @click="bookPage(i, book)"
              />
              <v-rating
                color="#f5a623"
                size="9"
                readonly
                :value="parseFloat(book.rating)"
                class="margin-bottom:20px"
              ></v-rating>

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
        <v-btn
          large
          fixed
          absolute
          bottom
          right
          style="margin-bottom:100px"
          fab
          color="black"
          class="pulsingButton"
          to="/publish"
          ><v-icon color="white">mdi-plus</v-icon></v-btn
        >
      </v-card>
    </v-main>
    <BottomMenu />
  </v-app>
</template>

<script>
import BottomMenu from "@/components/BottomMenu";
import { mapGetters } from "vuex";

export default {
  components: {
    BottomMenu,
  },
  data: () => ({
    IDs: [],
    model: null,
    earnings: 0,
    search: "",
    id: [],
    slug: [],
  }),

  computed: {
    ...mapGetters({
      books: "books",
      loading: "loading",
      user:"user"
    }),

    filteredAudio() {
      return this.books.filter((book) => book.filetype == "Audio");
    },
  },

  beforeCreate(){
    this.$store.dispatch("bindBooks");
  },

  created() {
    window.scrollTo(0, 0);
  },

  methods: {
    find() {
      this.$router.push(`/search?key=${this.search}`);
    },

    bookPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Audio",
        params: { id: book.slug, book: book, bookID: this.bookID },
      });
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}

div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
  height: 300px;
}

.carousel {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}

.pulsingButton {
  box-shadow: 0 0 0 0 rgba(68, 67, 67, 0.7);
  background-color: black;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 300ms ease-in-out;
}

/* Comment-out to have the button continue to pulse on mouseover */

a.pulsingButton:hover {
  -webkit-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  animation: none;
  color: #ffffff;
}

/* Animation */

@-webkit-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-moz-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-ms-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}
</style>
