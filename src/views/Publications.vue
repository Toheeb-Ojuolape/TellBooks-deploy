<template>
  <v-app>
  <v-main class="hidden-sm-and-down">
  <v-row no-gutters>
      <v-col
        class="hidden-sm-and-down"
        v-if="user != null"
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
  <v-toolbar flat class="md-4">
       <v-btn width="10px" text @click="goBack" color="#f66c1f"> 
       <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
       </v-btn>
      <v-toolbar-title class="mx-14 my-5 font-weight-black" height="500px" style="font-size:22px">
        Publications
      </v-toolbar-title>

       <v-spacer />

      <v-btn fab text to="/shelf">
        <v-icon class="green--text">mdi-magnify</v-icon>
      </v-btn>

        <v-btn rounded elevation="24" to="/publish" color="#f66c1f" class="white--text" style="font-size:15px;">
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
      </v-btn>

    </v-toolbar>
    </v-card>
    
    
    <v-container>
         <p style="font-size:17px;text-align:center;padding-top:"> Books published by you will appear here</p>

      <v-main v-if="ownBooks.length != 0">
      <v-card v-for="(book,i) in ownBooks" :key="i" flat class="mx-10 pa-6 justify-center">
        <v-row>
        <v-col 
        cols="12"
        md="2"
        sm="3"
        >
            <v-card class="elevation-12" height=140 width=100>
            <img :src="book.bookcover" height=140 width=100  />
            </v-card>
          </v-col>
          <v-col 
          md="1"
          xs="12"
          sm="12">
            <div class="caption grey--text">
              Book title
            </div>
            <div>{{ book.title }}</div>
          </v-col>
          <v-col
          md="1">
            <div class="caption grey--text">
              Book Price
            </div>
            <div>{{ book.price }}</div>
          </v-col>
          <v-col md="1">
            <div class="caption grey--text">
              Category
            </div>
            <v-chip color="red" class="white--text">{{ book.filetype }}</v-chip>
          </v-col>
          <v-col md="2">
            <div class="caption grey--text">
              Book Reads
            </div>
            <div>{{ book.readers.length }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">
              Earnings
            </div>
            <div>{{ 0.85 * book.readers.length * book.price }}</div>
          </v-col>
          <v-col cols="12" md="4"
          sm="12">
            <div class="caption grey--text">
              Actions
            </div>
            <v-btn fab :to="{name:'edit-books-page', params:{id:book.slug}}">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn fab :to="`${book.filetype}/${book.slug}`">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn fab :to="{name:'Books', params:{id:book.slug}}">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            </v-col>
          </v-row>
      </v-card>
      </v-main>
      <v-main v-else flat style="text-align:center">
      <v-icon size="150px" color="#c9f6cd">mdi-plus-circle-outline</v-icon>
      <p style="font-size:16px;color:#008140">You've not published any books yet</p>
      </v-main>
    </v-container>
    </div>
      </v-col>
      </v-row>
      </v-main>


      <!-- Mobile view -->
      <v-main class="hidden-md-and-up">
      <v-toolbar flat class="md-4" color="white">
    <v-btn @click="goBack" style="color:#f66c1f" text>
       <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
       </v-btn>

      <v-spacer />

      <v-btn text fab to="/shelf">
        <v-icon color="green">mdi-magnify</v-icon>
      </v-btn>

      <v-btn rounded elevation="24" to="/publish" color="#f66c1f" class=" mr-5" style="font-size:15px;color:white">
        <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon>Publish
      </v-btn>
    </v-toolbar>

    <v-container>
         <p style="font-size:17px;text-align:center;padding-top:"> Books published by you will appear here</p>

      <v-main v-if="ownBooks.length != 0">
      <v-card v-for="(book,i) in ownBooks" :key="i" flat class="mx-10 pa-6 justify-center">
        <v-row>
        <v-col 
        cols="12"
        md="2"
        sm="3"
        >
            <v-card class="elevation-12" height=140 width=100>
            <img :src="book.bookcover" height=140 width=100  />
            </v-card>
          </v-col>
          <v-col 
          md="1"
          xs="12"
          sm="12">
            <div class="caption grey--text">
              Book title
            </div>
            <div>{{ book.title }}</div>
          </v-col>
          <v-col
          md="1">
            <div class="caption grey--text">
              Book Price
            </div>
            <div>{{ book.price }}</div>
          </v-col>
          <v-col md="1">
            <div class="caption grey--text">
              Category
            </div>
            <v-chip color="red" class="white--text">{{ book.filetype }}</v-chip>
          </v-col>
          <v-col md="2">
            <div class="caption grey--text">
              Book Reads
            </div>
            <div>{{ book.readers.length }}</div>
          </v-col>
          <v-col>
            <div class="caption grey--text">
              Earnings
            </div>
            <div>{{ 0.85 * book.readers.length * book.price }}</div>
          </v-col>
          <v-col cols="12" md="4"
          sm="12">
            <div class="caption grey--text">
              Actions
            </div>
            <v-btn fab :to="{name:'edit-books-page', params:{id:book.slug}}">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn fab :to="`${book.filetype}/${book.slug}`">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn fab :to="{name:'Books', params:{id:book.slug}}">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            </v-col>
          </v-row>
      </v-card>
      </v-main>
      <v-main v-else flat style="text-align:center">
      <v-icon size="150px" color="#c9f6cd">mdi-plus-circle-outline</v-icon>
      <p style="font-size:16px;color:#008140">You've not published any books yet</p>
      </v-main>
    </v-container>
      
      </v-main>
    <BottomMenu/>
  </v-app>
</template>


<script>
import firebase from 'firebase/app'
import NavBar from '@/components/NavBar'
import BottomMenu from '@/components/BottomMenu'
import slugify from 'slugify'
import { mapGetters } from 'vuex'


export default {
  components: {
    NavBar,
    BottomMenu
  },
  data: () => ({
      person:"",
      earnings:0,
      filetype:'Epub',
      epub:true,
      pdf:false,
      epubColor: '#008140',
      pdfColor: '#c9f6cd',
      overlay:true,
      author:null,

  }),

   computed:{
   ...mapGetters({
     books:"books",
     user:"user",
     loading:"loading"
   }),

   authorName() {
      return slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });
    },

       ownBooks(){
         return this.books.filter(book => book.author == this.authorName)
       }
   },


   beforeCreate(){
     this.$store.dispatch('bindBooks')
   },

    created () {
       window.scrollTo(0,0);   
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
          this.currency = book.currency
          this.titles = book.title
          this.reads = book.readers.length
          this.readers += book.readers.length
          this.earnings += (0.9 * (book.price * book.readers.length))/10
          this.loadingStat = false
        });
      })
    },


 

      methods:{
        goBack(){
            this.$router.go(-1)
        },
    },
    
}

</script>
