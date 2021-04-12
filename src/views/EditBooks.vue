/* eslint-disable no-undef */
<template>
  <v-app v-if="pointer == books.author">
  <v-card>
  <v-toolbar class="md-4 hidden-md-and-down ">
       <v-btn @click="goBack" class="ml-16" color="#f66c1f" style="color:white"> 
       <v-icon color="white">mdi-chevron-left</v-icon>Back
       </v-btn>
      <v-toolbar-title class="mx-14 " height="500px" style="font-size:17px">
       Edit {{ books.title }}
      </v-toolbar-title>

       <v-spacer />

      <v-btn icon>
        <v-icon class="green--text">mdi-magnify</v-icon>
      </v-btn>

        <v-btn rounded elevation="24" to="/publish" color="#f66c1f" class="white--text mr-5" style="font-size:15px;">
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
      </v-btn>

    </v-toolbar>

    <v-toolbar class="md-4 hidden-lg-and-up" color="#f66c1f">
    <v-btn @click="goBack" style="color:white" text>
       <v-icon color="white">mdi-chevron-left</v-icon>
       </v-btn>
     
      <v-spacer />

      <v-btn icon>
        <v-icon class="white--text">mdi-magnify</v-icon>
      </v-btn>

      <v-btn rounded elevation="24" to="/publish" color="white" class=" mr-5" style="font-size:15px;color:#f66c1f">
        <v-icon class="mr-1" color="#f66c1f">mdi-plus-circle-outline</v-icon>Publish
      </v-btn>
    </v-toolbar>
    </v-card>
    <NavBar/>


    <v-container>
    <v-row>
    <v-col md="5" sm="4">
       
        <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        flat
      >
       <v-img
            class="white--text align-end"
            height="250px"
            :src="books.bookcover"
            contain
          >
          </v-img>
           <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#036358"
          >
            <v-btn @click="cover=true">Edit Image</v-btn>
          </v-overlay>
        </v-fade-transition>
        </v-card>
    </template>
  </v-hover>


          </v-col>


    <v-col md="7" sm="8">
      <v-text-field
        v-model="books.title"
        solo
        readonly
        hint="Sorry, you cannot edit your book title"
      />

      <v-select
          v-model="books.filetype"
          :items="bookfile"
          label="file type"
          color="#f66c1f"
        ></v-select>

        <v-select
          v-model="books.category"
          :items="bookcategories"
          label="Book Category"
          chips
          :hint="`Current category: ${books.category}`"
          color="#f66c1f"
          class="mb-3"
        ></v-select>
        
        <v-text-field
        v-model="books.price"
        solo
        number
        hint="Enter your book price"
      />


      <v-textarea
        v-model="books.description"
        filled
        solo
        hint="Enter your book description"
      />
    
           
      <v-select
          v-model="books.language"
          :items="selectlanguage"
          label="Language"
          color="#f66c1f"
          class="mb-2"
          chips
        ></v-select>

         <v-select
         v-if="books.downloadable != null"
          v-model="books.downloadable"
          :items="choice"
          label="Do You want your book to be downloadable?"
          hint="This is advisable only for FREE Books"
          color="#f66c1f"
          chips
        ></v-select>
        <v-card style="font-size:17px;" color="#cee9fe">
       <p style="font-size:15px;padding-top:25px; margin-bottom:2px; text-align:center"> Click here to change your book file </p>
      <v-card-subtitle class="text-center">
      <input type="file" label="Upload your ebook (pdf & Epub supported)" @change="previewFile">
      </v-card-subtitle>
       <v-card-subtitle>Progress: {{ fileValue.toFixed()+"%" }}</v-card-subtitle>

        <v-progress-linear color="#f66c1f" :value="fileValue" stream striped />

        <v-btn color="#f66c1f"
               block
               tile
               class="white--text"
               :disabled="fileData==null"
               :loading="fileloading"
               @click="fileUpload"
               style="margin-bottom:39px;"
        >
          Click to Upload
        </v-btn>
        </v-card>




      <v-btn
        class="white--text"
        block
        raised 
        color="#f66c1f"
        :loading="loading"
        @click="updateProfile"
      >
        Save Changes
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="#f66c1f--text my-2"
            block
            raised
            outlined
            color="#f66c1f"
            v-on="on"
          >
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn>
        </template>

        <v-card height=250>
          <h2 class="font-weight-bold pt-6 px-5">
            Are You Sure About this?
          </h2>

          <p class="pa-4 pl-5">
            If you click yes, you will permanently delete your book <br> from our database
          </p>


          <v-card-actions class="mb-3">
            <v-spacer />
            <v-btn color="#f66c1f" outlined @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn
              :loading="loading"
              color="#f66c1f"
              class="white--text"
              @click="destroy"
            >
              Yes, Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

      <v-dialog v-model="cover" class="mx-auto" max-width="600px" persistent>
       <v-card color='#f66c1f'>
          <v-card-subtitle class="text-center mr-9">
          <p style="font-size:17px; color:white;text-align:center;padding-top:23px"> Edit your book cover</p>
          </v-card-subtitle>
          <v-card-subtitle class="text-center ml-13">
              <input type="file" @change="previewImage" accept="image/*" >
          </v-card-subtitle>
          
          
          <v-card-subtitle class="white--text">Progress: {{uploadValue.toFixed()+"%"}}</v-card-subtitle>

          <v-progress-linear :value="uploadValue" stream striped></v-progress-linear>

          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              text
              class="white--text"
              @click="cover = false">
              Cancel</v-btn>

              <v-btn color="white"
              class="#f66c1f--text"
              @click="onUpload"
              :disabled="imageData==null"
              :loading="loading">
              Upload</v-btn>
          </v-card-actions>
            </v-card>
      </v-dialog>
       <v-snackbar
       v-model="snackbar">
       <p style='font-size:14px;padding-top:-30px;padding-bottom:0px'>{{ text }} </p>
       <template v-slot:action="{ attrs }">
                        <v-btn
                          color="red"
                          text
                          v-bind="attrs"
                          @click="snackbar = false"
                           style="font-size:12px"

                        >
                          Close
                        </v-btn>
                      </template>
      </v-snackbar>
      </v-row>
    </v-container>
     <v-overlay :value="overlay" color="#f66c1f" opacity="1">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <BottomMenu />
  </v-app>
   <v-app v-else style="text-align:center">
  <v-main style="background:#f66c1f">
  <h1 class="font-weight-bold white--text" style="margin:20px;font-size:42px;padding-top:270px">Sorry, this page does not exist</h1>
  <p style="font-size:19px;color:white"> But you can still find your way back home</p>
    <v-btn x-large outlined color="white" style="margin-top:30px" to="/shelf"> Go Home</v-btn>
    <v-overlay :value="overlay" color="#f66c1f" opacity="1">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-main>
  </v-app>
</template>



<script>
import db from '../main'
import firebase from 'firebase/app'
import BottomMenu from '@/components/BottomMenu'
import NavBar from '@/components/NavBar'
import slugify from 'slugify'

export default {
  components: {
  NavBar,
  BottomMenu
  },
    data(){
     return{
       books:[],
       user:"",
       dialog: false,
       cover:false,
       imageData: null,
       picture: null,
       uploadValue: 0,
       loading: false,
       snackbar:false,
       text:"",
       newcategory:"",
       overlay:true,
       bookfile:['Epub', 'Pdf'],
       choice:['Yes','No'],
       filetype:"",
       bookcategories:['Adventure','Anthology','Business & Finance','Children book','Comics','Fiction','History','Health','Humour','Non-fiction','Poetry','Romance','Self-help','Others'],
       categories:"",
       selectlanguage:['English','Hausa','Igbo','Swahili','Yoruba'],
       fileValue:0,
       fileloading:false,
       fileData:null,
       file:"",
       fileUploaded:false,
       pointer:"",

     }
    },

  
    created(){
      firebase.auth().onAuthStateChanged(user => {
    this.user = user
    this.pointer = slugify(this.user.displayName, { 
                 replacement:"-",
                 remove:/[$*_+~.()'"!:@]/g,
                 lower:true
               })
  })

      let ref=db.collection('books').where('slug','==',this.$route.params.id)
      ref.get().then(snapshot => {
          snapshot.forEach(doc =>{
              this.books=doc.data(),
              this.books.id=doc.id
              this.overlay=false
          })
      })


    },


methods:{
        previewImage(event) {
        this.uploadValue=0;
        this.picture=null;
        this.imageData = event.target.files[0];
      },

      onUpload(){
        this.picture=null
        this.loading = true

        const uploadImage = new Promise((resolve, reject) => {
          const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
          storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{
            console.log(error.message)
            reject()
            },
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.picture = url;
              resolve()
            })
          })
        })
        uploadImage.then(() => {
          db.collection('books')
          .doc(this.$route.params.id)
          .update({
            bookcover: this.picture
          })
              .then(() => {
                this.loading = false
                this.text = "Book cover updated successfully"
                this.snackbar = true
                location.reload();
              }).catch(() => {
                // An error happened.
                console.log('book not updated')
              
          }).catch(err => {
              this.loading = false
              console.log(err.message)

              this.text = "Error updating book cover"
              this.snackbar = true
          })
        }).catch((err) => {
          this.loading = false
          console.log(err.message)

          this.text = "Error updating book cover"
          this.snackbar = true
        })

      },


updateProfile() {
            this.loading=true
            db.collection('books')
                .doc(this.$route.params.id)
                .update({
                    title: this.books.title,
                    description: this.books.description,
                    price:this.books.price,
                    filetype:this.books.filetype,
                    category:this.books.category,
                    language:this.books.language,
                    downloadable:this.books.downloadable
                })
                    .then(() => {
                        this.text = "Book updated successfully"
                        this.snackbar = true
                        this.loading = false
                    }).catch((error) => {
                        // An error happened.
                        console.log(error)
                    })
                    
                .catch(err => {
                    this.overlay = !this.overlay

                    console.log(err.message)

                    this.text = "Error updating book details"
                    this.snackbar = true
                })
},

previewFile(event) {
        this.fileValue=0
        this.file=null
        this.fileData = event.target.files[0]
      },

      fileUpload(){
        this.file=null
        this.fileloading = true

        var uploadFile = new Promise((resolve, reject) => {
          var storageRef=firebase.storage().ref(`${this.fileData.name}`).put(this.fileData)
          storageRef.on(`state_changed`,snapshot=>{
            this.fileValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          }, () =>{
            reject()
            },
                ()=>{this.fileValue=100
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.file = url
                resolve()
                })
            })
           })

        uploadFile.then(() => {
           db.collection('books')
          .doc(this.$route.params.id)
          .update({
            book: this.file
          })
              .then(() => {
                this.fileloading = false
                this.text = "Book file updated successfully"
                this.snackbar = true
                location.reload();
              }).catch((err) => {
                // An error happened.
                console.log('book not updated')
                this.text = err.message
              this.snackbar = true
              
          }).catch(err => {
              this.fileloading = false
              console.log(err.message)
              this.text = "Error updating book file"
              this.snackbar = true
          })
        }).catch(() => {
          this.fileloading = false
          console.log()

          this.text = "Error updating book file"
          this.snackbar = true
        })


      },



destroy(){
  this.loading=true
  db.collection('books').doc(this.$route.params.id).delete()
  .then()
  this.loading=false
  this.$router.push('/publications')
},
goBack(){
            this.$router.go(-1)
        },
        },




}
</script>


