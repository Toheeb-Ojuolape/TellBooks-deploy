<template>
  <v-app>
    <v-card>
  <v-toolbar class="md-4 hidden-md-and-down ">
       <v-btn @click="goBack" class="ml-16" color="#f66c1f" style="color:white"> 
       <v-icon color="white">mdi-chevron-left</v-icon>Back
       </v-btn>
      <v-toolbar-title class="mx-14 my-5 font-weight-black" height="500px" style="font-size:22px">
        Publications
      </v-toolbar-title>

       <v-spacer />

      <v-btn fab text to="/shelf">
        <v-icon class="green--text">mdi-magnify</v-icon>
      </v-btn>

        <v-btn rounded elevation="24" to="/publish" color="#f66c1f" class="white--text mr-5" style="font-size:15px;">
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
      </v-btn>

    </v-toolbar>

    <v-toolbar class="md-4 hidden-lg-and-up" color="white">
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
    </v-card>
    <NavBar />
    <v-container>
         <p style="font-size:17px;text-align:center"> Books published by you will appear here</p>
        <v-row class="mb-6">
                <v-col sm="6" class="pl-7">
                    <v-btn :loading="loading" elevation=12 class="white--text" block :color="epubColor" raised large @click="showEpub">
                        Epub
                    </v-btn>
                </v-col>
                <v-col sm="6" class="pr-7" >
                    <v-btn :loading="loading" elevation=12 class="white--text" light block :color="pdfColor" @click="showPdf" raised large>
                        Pdf
                    </v-btn>
                </v-col>
            </v-row>

  
      <v-layout v-if="books.length != 0">
      <v-card v-for="book in books" :key="book.slug" flat class="mx-10 pa-6 justify-center">
        <v-layout v-if="book.filetype===filetype" style="font-size:16px" row wrap :class="`pa-3 book ${book.status}`">
        <v-flex xs12 md2>
            <div class="caption grey--text">
              Book
            </div>
            <img :src="book.bookcover" height=70 width=50 />
          </v-flex>
          <v-flex xs12 md2>
            <div class="caption grey--text">
              Book title
            </div>
            <div>{{ book.title }}</div>
          </v-flex>
          <v-flex xs6 sm6 md2>
            <div class="caption grey--text">
              Book Price
            </div>
            <div>{{ book.price }}</div>
          </v-flex>
          <v-flex xs6 sm6 md2>
            <div class="caption grey--text">
              Book Category
            </div>
            <div>{{ book.filetype }}</div>
          </v-flex>
          <v-flex xs6 sm6 md2>
            <div class="caption grey--text">
              Book Downloads
            </div>
            <div>{{ book.readers.length }}</div>
          </v-flex>
          <v-flex xs6 sm6 md2>
            <div class="caption grey--text">
              Book Earnings
            </div>
            <div>{{ 0.85 * book.readers.length * book.price }}</div>
          </v-flex>
          <v-flex xs12  md4>
            <div class="caption grey--text">
              Actions
            </div>
            <v-btn fab :to="{name:'edit-books-page', params:{id:book.id}}">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn v-if="filetype=='Epub'" fab :to="{name:'epub-reader-page', params:{id:book.id}}">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn v-else fab :to="{name:'pdf-reader-page', params:{id:book.id}}">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn fab :to="{name:'Books', params:{id:book.id}}">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      </v-layout>
       <v-layout v-else style="text-align:center">
      <v-main flat style="text-align:center">
      <v-icon size="150px" color="#c9f6cd">mdi-plus-circle-outline</v-icon>
      <p style="font-size:16px;color:#008140">You've not published any books yet</p>
      </v-main>
      </v-layout>
    </v-container>
    <BottomMenu/>
  </v-app>
</template>


<script>
import firebase from 'firebase/app'
import db from '../main'
import NavBar from '@/components/NavBar'
import BottomMenu from '@/components/BottomMenu'
import slugify from 'slugify'


export default {
  components: {
    NavBar,
    BottomMenu
  },
  data: () => ({
      user:"",
      books:[],
      earnings:0,
      filetype:'Epub',
      epub:true,
      pdf:false,
      epubColor: '#008140',
      pdfColor: '#c9f6cd',
      overlay:true,
      author:null,
      loading:true,

  }),

  mounted() {
  firebase.auth().onAuthStateChanged(user => {
    this.user = user
    if(!this.user)
    this.$router.push('/login')
  })

},

    created () {
      firebase.auth().onAuthStateChanged(user => {
    this.user=user
     this.author = slugify(this.user.displayName, {
                 replacement:"-",
                 remove:/[$*_+~.()'"!:@]/g,
                 lower:true
               })
              

   db.collection("books")
            .where("author", "==",this.author)
            .onSnapshot((snapshot) =>{
             snapshot.docChanges().forEach(change => {
             if(change.type == "added") {
             this.books.push({
              ...change.doc.data(),
                id:change.doc.id
         })
                this.loading=false
                this.earning += (8.5 * (change.doc.data().price * change.doc.data().readers.length))/10

       }
     })
            })
     
 })

         
    },


 

      methods:{
      showEpub() {
            this.epubColor = '#008140'
            this.pdfColor = '#c9f6cd'
            this.epub = true
            this.pdf = false
            this.filetype='Epub'
        },
        showPdf() {
            this.epubColor = '#c9f6cd'
            this.pdfColor = '#008140'
            this.epub = false
            this.pdf = true
            this.filetype = 'Pdf'
        },
        goBack(){
            this.$router.go(-1)
        },
    },
    
}

</script>

<style scope>
.project.published{
    border-left:4px solid #3cd1c2
}

</style>