<template>
  <v-app>
  <v-main>
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
      <v-spacer/>
      <v-col md="10" sm="10" lg="10">
       <div style="margin:10px 0px 0px 110px;padding:0px 160px 0px 0px">
    <v-card flat>
      <v-toolbar flat>
        <v-btn
          @click="goBack"
          width="10%"
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
          Library
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class="white--text"
          style="font-size:15px;"
        >
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Publish Book
        </v-btn>
      </v-toolbar>
    </v-card>
      <p
        style="font-size:17px;text-align:center;margin-top:20px;margin-bottom:0px"
      >
        Your purchased books will appear here:
      </p>

           
           <v-text-field
              style="border-radius:8px;width:650px;font-size:17px;margin:30px 60px 20px 20px"
              outlined
              label="Search your library by title, author name or category"
              max-width="800px"
              color="#008140"
              v-model="search"
              append-icon="mdi-magnify"
              
            />
         
      <!-- Show selected book  -->
      <v-row id="show" class="mb-6">
        <div v-if="newBook == true">
          <p>
            <v-card
              flat
              style="margin-top:80px;margin-left:45px"
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
                      class="black--text font-weight-bold"
                    >
                      {{ stayBook.title }}
                    </h1>
                    <v-rating
                      :value="parseFloat(stayBook.rating)"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="color:black;font-size:16px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column3">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                        style="width:52%"
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
          <p  v-for="(book, i) in oneBook" :key="i">
            <v-card
              flat
              style="margin-top:80px;margin-left:45px"
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
                      class="black--text font-weight-bold"
                    >
                      {{ book.title }}
                    </h1>
                    <v-rating
                      :value="parseFloat(book.rating)"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="color:black;font-size:16px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column3">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                        style="width:52%"
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
      <v-container style="margin-bottom:30px">
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
                v-for="(book, i) in filteredBooks"
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

              <v-btn rounded color="#f66c1f" to="/shelf"> Buy Books</v-btn>
            </v-main>
          </v-layout>
        </v-row>
      </v-container>
      </div>
      </v-col>
      </v-row>
      </v-main>
      <!-- End of Laptop view of books in library -->

      <!-- Mobile view of books in Library -->
      <v-main class="hidden-md-and-up">
      <v-toolbar style="margin-top:-30px" flat>
        <v-btn @click="goBack" style="color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />

        <v-btn
          rounded
          elevation="10"
          to="/publish"
          color="#f66c1f"
          class=" mr-5"
          style="font-size:15px;color:white"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>

      <v-container
        style="padding:0px 10px 0px 10px;margin-top:-20px;margin-bottom:30px"
      >

      <v-text-field
              style="border-radius:8px;width:90%;font-size:17px;margin:40px 0px 0px 20px"
              outlined
              label="Search your library by title, author name or category"
              color="#008140"
              v-model="search"
              append-icon="mdi-magnify"
              
            />
        <!-- Select one book -->
        <div class="ml-4" v-if="newBook == true">
          <p>
            <v-card
              flat
              style="margin-top:40px;margin-left:10px"
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
                      class="black--text font-weight-bold"
                      v-if="stayBook.title.length > 15"
                    >
                      {{ String(stayBook.title).slice(0,15) }}...
                    </h1>
                    <h1 
                      v-else
                      style="font-size:16px;padding-left:8px"
                      class="black--text font-weight-bold"
                    >
                      {{ stayBook.title }}
                    </h1>
                    <v-rating
                      :value="parseFloat(stayBook.rating)"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="color:black;font-size:14px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column6">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                        style='width:90%'
                        
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
        <div class="ml-4" v-else-if="newBook == false">
          <p v-for="(book, i) in oneBook" :key="i">
            <v-card
              flat
              style="margin-top:40px;margin-left:10px"
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
                     v-if="book.title.length > 15"
                      style="font-size:16px;padding-left:8px"
                      class="black--text font-weight-bold"
                    >
                      {{ String(book.title).slice(0,15) }}....
                    </h1>
                    <h1
                      v-else
                      style="font-size:16px;padding-left:8px"
                      class="black--text font-weight-bold"
                    >
                      {{ book.title }}
                    </h1>
                    <v-rating
                      :value="parseFloat(book.rating)"
                      readonly
                      color="#f5a623"
                      size="10"
                    ></v-rating>
                    <p
                      style="color:black;font-size:14px;padding-left:10px; margin-bottom:1px"
                    >
                      Read {{ bookProgress }}%
                    </p>
                    <div class="column6">
                      <v-progress-linear
                        striped
                        v-model="bookProgress"
                        color="#008140"
                        style='width:90%'
                       
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
          <v-col v-for="n in 2" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4"
              type="image"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>

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
          <v-col md="7" sm="12" xs="12">
            <v-row>
              <p
                v-for="(book, i) in filteredBooks"
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
              <v-icon size="150px" color="#ffd396">mdi-bookshelf</v-icon>
              <p style="font-size:16px;color:#f66c1f">
                You've not bought any books yet
              </p>

              <v-btn rounded color="#f66c1f" to="/shelf"> Buy Books</v-btn>
            </v-main>
          </v-layout>
        </v-row>
      </v-container>
      </v-main>
      <!-- End of Mobile view of books in Library -->
    <BottomMenu class="hidden-md-and-up"/>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import db from "../main";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import { unslugify } from "unslugify"

export default {
  components: {
    NavBar,
    BottomMenu
  },
  data: () => ({
    person: "",
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
    newBook: false,
    search:""
  }),


  computed:{
    filteredBooks(){
      const searchBooks = this.search.toLowerCase().trim();
      if (!searchBooks) return this.books;

      return this.books.filter(
        book => (book.title.toLowerCase().indexOf(searchBooks)) > -1  ||
        (unslugify(book.author)).toLowerCase().indexOf(searchBooks) > -1);
    }
    },

  created() {
    window.scrollTo(0,0);
    firebase.auth().onAuthStateChanged(user => {
      this.person = user;

      db.collection("books")
        .where("readers", "array-contains", this.person.uid)
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
      let retrievedData = localStorage.getItem("currentRead");
      let readingProgress = JSON.parse(retrievedData);
      this.stayBook = this.books[parseFloat(readingProgress[0])];
      this.newBook =  true
      this.bookProgress = parseFloat(readingProgress[1]);
    },

    showProgress(i, book) {
      this.bookid = this.id[i];
      this.newBook = false;
      let retrievedData = localStorage.getItem(book.slug);
      this.oneBook = this.filteredBooks.slice(i, i + 1);
      window.scrollTo(0,0);
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
      localStorage.setItem("currentRead", JSON.stringify(saved));
    },

    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.person = user;
      if (!this.person) this.$router.push("/login");
    });
  },

  updated(){
    window.scrollTo(0,0);
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
  width: 66%;
  margin-top: -30px;
}
.column3 {
  width: 500px;
  margin-left: 10px;
}

.column4 {
  width: 115px;
  margin-right:14px
}

.column5 {
  width: 54%;
  max-width:90%
}

.column6 {
  width: 150px;
  margin-left: 10px;
}
</style>
