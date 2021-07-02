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
      <v-col md="10" sm="10" lg="10">
        <div style="margin:10px 0px 0px 110px;padding:0px 160px 0px 0px">
          <v-card flat>
            <v-toolbar flat class="md-4 hidden-sm-and-down ">
              <v-btn @click="goBack" color="#f66c1f" text width="10px">
                <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
              </v-btn>
              <v-toolbar-title
                class="mx-14 my-5 font-weight-black"
                height="500px"
                style="font-size:22px"
              >
                Statistics
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
                <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish
                Book
              </v-btn>
            </v-toolbar>
          </v-card>
          <v-container>
            <v-main>
              <div class="scrollmenu">
                <div class="carousel">
                  <v-card
                    to="/publications"
                    height="150px"
                    color="#147D03"
                    flat
                    width="250px"
                    style="text-align:left;border-radius:20px;padding:16px"
                  >
                    <div style="float:left;width:30%;margin-top:12%">
                      <v-btn class="pulsingButton" fab color="white"
                        ><v-icon color="#147D03">mdi-book</v-icon></v-btn
                      >
                    </div>
                    <div style="float:left;width:70%">
                      <p
                        class="pt-2 white--text"
                        style="padding-bottom:0px;margin-bottom:-10px"
                      >
                        Books published
                      </p>
                      <v-progress-circular
                        class="mt-4"
                        indeterminate
                        v-if="loading"
                        color="white"
                      ></v-progress-circular>
                      <div
                        v-if="!loading"
                        class="font-weight-bold white--text"
                        style="font-size:60px"
                      >
                        {{ ownBooks.length }}
                      </div>
                    </div>
                  </v-card>
                </div>
                <div class="carousel">
                  <v-card
                    to="/publications"
                    height="150px"
                    color="#f66c1f"
                    flat
                    width="250px"
                    style="text-align:left;border-radius:20px;padding:16px"
                  >
                    <div style="float:left;width:30%;margin-top:12%">
                      <v-btn fab color="white"
                        ><v-icon color="#f66c1f">mdi-eye</v-icon></v-btn
                      >
                    </div>
                    <div style="float:left;width:70%">
                      <p
                        class="pt-2 white--text"
                        style="padding-bottom:0px;margin-bottom:-10px"
                      >
                        Total Reads
                      </p>
                      <v-progress-circular
                        indeterminate
                        class="mt-4"
                        v-if="loadingStat"
                        color="white"
                      ></v-progress-circular>
                      <div
                        v-if="!loadingStat"
                        class="font-weight-bold white--text"
                        style="font-size:60px"
                      >
                        {{ readers }}
                      </div>
                    </div>
                  </v-card>
                </div>
                <div class="carousel">
                  <v-card
                    to="/wallet"
                    flat
                    height="160px"
                    color="#1877f2"
                    width="350px"
                    style="text-align:left;border-radius:20px;padding:16px"
                  >
                    <div style="float:left;width:25%;margin-top:9%">
                      <v-btn fab color="white"
                        ><v-icon color="#1877f2"
                          >mdi-cash-multiple</v-icon
                        ></v-btn
                      >
                    </div>
                    <div style="float:left;width:75%">
                      <p
                        class="pt-2 white--text"
                        style="padding-bottom:0px;margin-bottom:-10px"
                      >
                        Total Earnings
                      </p>
                      <v-progress-circular
                        indeterminate
                        class="mt-4"
                        v-if="loadingStat"
                        color="white"
                      ></v-progress-circular>
                      <div
                        v-if="!loadingStat"
                        class="font-weight-bold white--text pt-5 mr-5 mb-3"
                        style="font-size:30px"
                      >
                        {{ currency }}{{ earnings }}
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
              <p style="font-weight:600;padding-top:30px;text-align:center">
                Statistics
              </p>
              <p v-if="ownBooks.length == 0" style="text-align:center">
                Nothing to see here, yet
              </p>
              <div
                style="text-align:center"
                v-for="(data, i) in ownBooks"
                :key="i"
              >
                <div style="font-size:19px" v-if="data.title.length > 16">
                  {{ data.title.slice(0, 16) }}...
                </div>
                <div style="font-size:19px" v-else>{{ data.title }}</div>
                <v-btn
                  :to="`/books/${data.slug}`"
                  style="font-size:18px"
                  class="mb-5 mt-2 mr-3"
                  color="#f66c1f"
                  width="90"
                  height="90"
                  outlined
                  fab
                >
                  <v-icon color="#f66c1f" class="mr-1"> mdi-eye</v-icon
                  >{{ data.readers.length }}
                </v-btn>
                <v-btn
                  :to="`/books/${data.slug}`"
                  style="font-size:18px"
                  class="mb-5 mt-2"
                  color="#f66c1f"
                  width="90"
                  height="90"
                  outlined
                  fab
                >
                  <v-icon color="#f5a623"> mdi-star</v-icon
                  >{{ parseInt(data.rating) }}/5
                </v-btn>
              </div>
            </v-main>
          </v-container>
        </div>
      </v-col>
    </v-row>
    <v-main class="hidden-md-and-up">
      <v-card flat>
        <v-toolbar flat class="md-4 hidden-sm-and-down ">
          <v-btn @click="goBack" color="#f66c1f" text width="10px">
            <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
          </v-btn>
          <v-toolbar-title
            class="mx-14 my-5 font-weight-black"
            height="500px"
            style="font-size:22px"
          >
            Statistics
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
            <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
          </v-btn>
        </v-toolbar>

        <v-toolbar flat class="md-4 hidden-md-and-up" color="white">
          <v-btn @click="goBack" style="color:#f66c1f" text>
            <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
          </v-btn>

          <v-spacer />

          <v-btn text fab to="/shelf">
            <v-icon color="green">mdi-magnify</v-icon>
          </v-btn>

          <v-btn
            rounded
            elevation="20"
            to="/publish"
            color="#f66c1f"
            class="white--text"
            style="font-size:15px;"
          >
            <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish
          </v-btn>
        </v-toolbar>
      </v-card>
      <v-container>
        <v-main>
          <div class="scrollmenu">
            <div class="carousel">
              <v-card
                to="/publications"
                height="150px"
                color="#147D03"
                flat
                width="250px"
                style="text-align:left;border-radius:20px;padding:16px"
              >
                <div style="float:left;width:30%;margin-top:12%">
                  <v-btn class="pulsingButton" fab color="white"
                    ><v-icon color="#147D03">mdi-book</v-icon></v-btn
                  >
                </div>
                <div style="float:left;width:70%">
                  <p
                    class="pt-2 white--text"
                    style="padding-bottom:0px;margin-bottom:-10px"
                  >
                    Books published
                  </p>
                  <v-progress-circular
                    class="mt-4"
                    indeterminate
                    v-if="loading"
                    color="white"
                  ></v-progress-circular>
                  <div
                    v-if="!loading"
                    class="font-weight-bold white--text"
                    style="font-size:60px"
                  >
                    {{ ownBooks.length }}
                  </div>
                </div>
              </v-card>
            </div>
            <div class="carousel">
              <v-card
                to="/publications"
                height="150px"
                color="#f66c1f"
                flat
                width="250px"
                style="text-align:left;border-radius:20px;padding:16px"
              >
                <div style="float:left;width:30%;margin-top:12%">
                  <v-btn fab color="white"
                    ><v-icon color="#f66c1f">mdi-eye</v-icon></v-btn
                  >
                </div>
                <div style="float:left;width:70%">
                  <p
                    class="pt-2 white--text"
                    style="padding-bottom:0px;margin-bottom:-10px"
                  >
                    Total Reads
                  </p>
                  <v-progress-circular
                    indeterminate
                    class="mt-4"
                    v-if="loadingStat"
                    color="white"
                  ></v-progress-circular>
                  <div
                    v-if="!loadingStat"
                    class="font-weight-bold white--text"
                    style="font-size:60px"
                  >
                    {{ readers }}
                  </div>
                </div>
              </v-card>
            </div>
            <div class="carousel">
              <v-card
                to="/wallet"
                flat
                height="160px"
                color="#1877f2"
                width="350px"
                style="text-align:left;border-radius:20px;padding:16px"
              >
                <div style="float:left;width:25%;margin-top:9%">
                  <v-btn fab color="white"
                    ><v-icon color="#1877f2">mdi-cash-multiple</v-icon></v-btn
                  >
                </div>
                <div style="float:left;width:75%">
                  <p
                    class="pt-2 white--text"
                    style="padding-bottom:0px;margin-bottom:-10px"
                  >
                    Total Earnings
                  </p>
                  <v-progress-circular
                    indeterminate
                    class="mt-4"
                    v-if="loadingStat"
                    color="white"
                  ></v-progress-circular>
                  <div
                    v-if="!loadingStat"
                    class="font-weight-bold white--text pt-5 mr-5 mb-3"
                    style="font-size:30px"
                  >
                    {{ currency }}{{ earnings }}
                  </div>
                </div>
              </v-card>
            </div>
          </div>
          <p style="font-weight:600;padding-top:30px;text-align:center">
            Statistics
          </p>
          <p v-if="ownBooks.length == 0" style="text-align:center">
            Nothing to see here, yet
          </p>
          <div style="text-align:center" v-for="(data, i) in ownBooks" :key="i">
            <div style="font-size:19px" v-if="data.title.length > 16">
              {{ data.title.slice(0, 16) }}...
            </div>
            <div style="font-size:19px" v-else>{{ data.title }}</div>
            <v-btn
              :to="`/books/${data.slug}`"
              style="font-size:18px"
              class="mb-5 mt-2 mr-3"
              color="#f66c1f"
              width="90"
              height="90"
              outlined
              fab
            >
              <v-icon color="#f66c1f" class="mr-1"> mdi-eye</v-icon
              >{{ data.readers.length }}
            </v-btn>
            <v-btn
              :to="`/books/${data.slug}`"
              style="font-size:18px"
              class="mb-5 mt-2"
              color="#f66c1f"
              width="90"
              height="90"
              outlined
              fab
            >
              <v-icon color="#f5a623"> mdi-star</v-icon
              >{{ parseInt(data.rating) }}/5
            </v-btn>
          </div>
        </v-main>
      </v-container>
    </v-main>
    <BottomMenu class="hidden-md-and-up" />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import slugify from "slugify";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    BottomMenu,
  },
  data: () => ({
    earnings: 0,
    author: null,
    myBooks: [],
    pointer: "",
    currency: "",
    person: "",
    price: "",
    readers: 0,
    fill: true,
    loadingStat: true,
    reads: [],
    title: [],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 2,
    padding: 8,
    radius: 10,
  }),

  computed: {
    ...mapGetters({
      books: "books",
      loading: "loading",
      user: "user",
    }),

    authorName() {
      return slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });
    },

    ownBooks() {
      return this.books.filter((book) => book.author == this.authorName);
    },
  },

  created() {
    this.$store.dispatch("bindBooks");

    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        this.person = user;
        this.pointer = slugify(this.person.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
        });
        this.myBooks = Array.from(
          this.books.filter((book) => book.author == this.pointer)
        );
        this.myBooks.forEach((book) => {
          this.currency = book.currency;
          this.titles = book.title;
          this.reads = book.readers.length;
          this.readers += book.readers.length;
          this.earnings += (8.5 * (book.price * book.readers.length)) / 10;
          this.loadingStat = false;
        });
      });
    }, 3000);
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}

div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
  height: 250px;
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
</style>
