<template>
  <v-app>
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
          Gifts
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

        <v-btn fab text to="/shelf">
          <v-icon class="green--text">mdi-magnify</v-icon>
        </v-btn>

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
    <v-container>
      <p
        style="font-size:17px;text-align:center;margin-top:10px;margin-bottom:0px"
      >
        Books bought for you will appear here
      </p>
      <!-- Show selected book  -->
      <v-row class="mb-6">
        <div v-if="newBook == true">
          <p class="hidden-md-and-down">
            <v-card
              flat
              style="margin-top:80px;margin-left:45px"
              class="hidden-md-and-down"
            >
              <div class="row">
                <div class="column">
                  <v-btn
                    :to="`${stayBook.filetype}/${stayBook.slug}`"
                    style="margin-top:-50px;margin-left:4px"
                    height="250"
                    width="170"
                    elevation="24"
                  >
                    <v-img :src="stayBook.bookcover" height="250" width="170" />
                  </v-btn>
                </div>
                <div class="column1">
                  <v-card
                    flat
                    color="#fbe4c4"
                    tile
                    style="margin-left:4px;padding:20px"
                  >
                    <h1
                      style="font-size:25px;padding-left:8px"
                      class="font-weight-bold"
                    >
                      {{ stayBook.title }}
                    </h1>
                    <v-rating
                      :value="stayBook.rating"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="font-size:16px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column3">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                      />
                    </div>
                    <v-btn
                      class="white--text mt-4 ml-3 mb-2"
                      :to="`${stayBook.filetype}/${stayBook.slug}`"
                      rounded
                      color="#f66c1f"
                    >
                      Continue Reading
                    </v-btn>
                  </v-card>
                </div>
              </div>
            </v-card>
          </p>
        </div>
        <div v-else>
          <p class="hidden-md-and-down" v-for="(book, i) in oneBook" :key="i">
            <v-card
              flat
              style="margin-top:80px;margin-left:45px"
              class="hidden-md-and-down"
            >
              <div class="row">
                <div class="column">
                  <v-btn
                    :to="`${book.filetype}/${book.slug}`"
                    style="margin-top:-50px;margin-left:4px"
                    height="250"
                    width="170"
                    elevation="24"
                  >
                    <v-img :src="book.bookcover" height="250" width="170" />
                  </v-btn>
                </div>
                <div class="column1">
                  <v-card
                    flat
                    color="#fbe4c4"
                    tile
                    style="margin-left:4px;padding:20px"
                  >
                    <h1
                      style="font-size:25px;padding-left:8px"
                      class="font-weight-bold"
                    >
                      {{ book.title }}
                    </h1>
                    <v-rating
                      :value="book.rating"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="font-size:16px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column3">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                      />
                    </div>
                    <v-btn
                      class="white--text mt-4 ml-3 mb-2"
                      :to="`${book.filetype}/${book.slug}`"
                      rounded
                      color="#f66c1f"
                    >
                      Continue Reading
                    </v-btn>
                  </v-card>
                </div>
              </div>
            </v-card>
          </p>
        </div>
      </v-row>
      <!-- End of Show selected book -->

      <!-- Laptop view of books in library -->
      <v-container class="hidden-md-and-down" style="margin-bottom:30px">
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="image"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="books.length != 0">
          <v-col md="12" sm="12">
            <v-row>
              <p
                style="margin-left:30px;margin-top:25px"
                v-for="(book, i) in books"
                :key="i"
              >
                <v-btn
                  @click="showProgress(i, book)"
                  height="250"
                  width="170"
                  elevation="24"
                >
                  <v-img :src="book.bookcover" height="250" width="170" />
                </v-btn>
              </p>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-layout v-if="loading == false" style="text-align:center">
            <v-main flat style="text-align:center">
              <v-icon size="150px" color="#ffd396">mdi-bookshelf</v-icon>
              <p style="font-size:16px;color:#f66c1f">
                You've not bought any books yet
              </p>
            </v-main>
          </v-layout>
        </v-row>
      </v-container>
      <!-- End of Laptop view of books in library -->

      <!-- Mobile view of books in Library -->
      <v-container
        class="hidden-md-and-up"
        style="margin-top:-20px;margin-bottom:30px"
      >
        <!-- Select one book -->
        <div v-if="newBook == true">
          <p class="hidden-lg-and-up">
            <v-card
              flat
              style="margin-top:40px;margin-left:10px"
              class="hidden-lg-and-up"
            >
              <div class="row">
                <div class="column4">
                  <v-btn
                    :to="`${stayBook.filetype}/${stayBook.slug}`"
                    style=""
                    height="190"
                    width="120"
                    elevation="24"
                  >
                    <v-img :src="stayBook.bookcover" height="190" width="120" />
                  </v-btn>
                </div>
                <div class="column5">
                  <v-card
                    flat
                    color="#fbe4c4"
                    tile
                    style="margin-left:-10px;margin-top:10px;padding:9px"
                  >
                    <h1
                      style="font-size:16px;padding-left:8px"
                      class="font-weight-bold"
                    >
                      {{ stayBook.title }}
                    </h1>
                    <v-rating
                      :value="stayBook.rating"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="font-size:14px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column6">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                      />
                    </div>
                    <v-btn
                      class="white--text mt-4 ml-3 mb-2"
                      :to="`${stayBook.filetype}/${stayBook.slug}`"
                      rounded
                      color="#f66c1f"
                      small
                    >
                      Continue Reading
                    </v-btn>
                  </v-card>
                </div>
              </div>
            </v-card>
          </p>
        </div>
        <div v-else-if="newBook == false">
          <p class="hidden-lg-and-up" v-for="(book, i) in oneBook" :key="i">
            <v-card
              flat
              style="margin-top:40px;margin-left:10px"
              class="hidden-lg-and-up"
            >
              <div class="row">
                <div class="column4">
                  <v-btn
                    :to="`${book.filetype}/${book.slug}`"
                    style=""
                    height="190"
                    width="120"
                    elevation="24"
                  >
                    <v-img :src="book.bookcover" height="190" width="120" />
                  </v-btn>
                </div>
                <div class="column5">
                  <v-card
                    flat
                    color="#fbe4c4"
                    tile
                    style="margin-left:-10px;margin-top:10px;padding:9px"
                  >
                    <h1
                      style="font-size:16px;padding-left:8px"
                      class="font-weight-bold"
                    >
                      {{ book.title }}
                    </h1>
                    <v-rating
                      :value="book.rating"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="font-size:14px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column6">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                      />
                    </div>
                    <v-btn
                      class="white--text mt-4 ml-3 mb-2"
                      :to="`${book.filetype}/${book.slug}`"
                      rounded
                      color="#f66c1f"
                      small
                    >
                      Continue Reading
                    </v-btn>
                  </v-card>
                </div>
              </div>
            </v-card>
          </p>
        </div>
        <!-- Select one book end -->
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="image"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="books.length != 0">
          <v-col md="7" sm="6" xs="6">
            <v-row>
              <p
                v-for="(book, i) in books"
                :key="i"
                style="margin-left:30px;margin-top:25px"
              >
                <v-btn
                  @click="showProgress(i, book)"
                  height="190"
                  width="120"
                  elevation="24"
                >
                  <v-img :src="book.bookcover" height="190" width="120" />
                </v-btn>
              </p>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-layout v-if="loading == false" style="text-align:center">
            <v-main flat style="text-align:center">
              <v-icon size="150px" color="#ffd396">mdi-gift</v-icon>
              <p style="font-size:16px;color:#f66c1f">
                You've not received any gifts yet
              </p>
            </v-main>
          </v-layout>
        </v-row>
      </v-container>
      <!-- End of Mobile view of books in Library -->
    </v-container>
    <BottomMenu />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import db from "../main";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import slugify from "slugify";

export default {
  components: {
    NavBar,

    BottomMenu
  },
  data: () => ({
    user: "",
    books: [],
    earnings: 0,
    pdf: false,
    epubColor: "#f66c1f",
    pdfColor: "#FFD396",
    filetype: "Epub",
    overlay: true,
    id: [],
    loading: true,
    readingProgress: "",
    page: 0,
    pageCount: 0,
    bookProgress: 0,
    slug: [],
    progress: false,
    oneBook: [],
    stayBook: [],
    newBook: false
  }),

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;

      this.beneficiary = slugify(this.user.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      });

      db.collection("books")
        .where("readers", "array-contains", this.beneficiary)
        .onSnapshot(querySnapshot => {
          this.books = [];
          querySnapshot.forEach(doc => {
            this.books.push(doc.data());
          });
          this.loading = false;
          this.singleBook();
        });
    });
  },

  methods: {
    singleBook() {
      let retrievedData = localStorage.getItem("currentGiftRead");
      let readingProgress = JSON.parse(retrievedData);
      this.stayBook = this.books[parseFloat(readingProgress[0])];
      this.newBook = true;
      this.bookProgress = parseFloat(readingProgress[1]);
    },

    showProgress(i, book) {
      this.bookid = this.id[i];
      this.newBook = false;
      let retrievedData = localStorage.getItem(book.slug);
      this.oneBook = this.books.slice(i, i + 1);
      let readingProgress = JSON.parse(retrievedData);
      if (localStorage.getItem(book.slug) != null) {
        this.page = parseFloat(readingProgress[1]);
        this.pageCount = parseFloat(readingProgress[2]);
        this.percentage = (this.page / this.pageCount) * 100;
        this.bookProgress = Math.round(this.percentage);
      } else {
        this.bookProgress = 0;
      }
      let saved = [i, this.bookProgress];
      localStorage.setItem("currentGiftRead", JSON.stringify(saved));
    },

    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (!this.user) this.$router.push("/login");
    });
  }
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.column {
  float: left;
  width: 170px;
  margin-top: -10px;
}

.column1 {
  float: left;
  width: 810px;
  margin-top: -30px;
}
.column3 {
  width: 500px;
  margin-left: 10px;
}

.column4 {
  width: 40%;
}

.column5 {
  width: 60%;
}

.column6 {
  width: 150px;
  margin-left: 10px;
}
</style>
