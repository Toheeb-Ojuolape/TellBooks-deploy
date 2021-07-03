<template>
  <v-app>
   <!-- Laptop view -->
   <v-row  class="hidden-sm-and-down" no-gutters>
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
          color="#f66c1f"
          text
          width="10px"
        >
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5 font-weight-black"
          height="500px"
          style="font-size:17px"
        >
          Publish
        </v-toolbar-title>

        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container style="margin-bottom:20px">
      <v-row>
        <v-col cols="12" md="5">
          <v-card color="#f66c1f" elevation="24" style="margin-top:70px">
            <p
              style="font-size:17px; color:white;text-align:center;padding-top:23px"
            >
              Upload Book cover
            </p>
            <v-card-subtitle class="text-center">
              <input
                type="file"
                label="Upload your book cover (png, jpg accepted)"
                accept="image/*"
                required
                @change="previewImage"
              />
            </v-card-subtitle>

            <v-card-subtitle class="white--text"
              >Progress:
              {{ uploadValue.toFixed() + "%" }} complete</v-card-subtitle
            >

            <v-progress-linear
              color="#48c857"
              :value="uploadValue"
              stream
              striped
            />

            <v-btn
              color="white"
              tile
              block
              class="black--text"
              :disabled="imageData == null"
              :loading="imgloading"
              @click="onUpload"
            >
              {{ text }}
            </v-btn>
          </v-card>
        </v-col>
        <v-col md="7">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="title"
              solo
              label="Book Title"
              :rules="titleRules"
              required
            />
            <v-select
              v-model="filetype"
              :items="bookfile"
              :rules="fileRules"
              label="file type"
              color="#f66c1f"
            ></v-select>

            <v-select
              v-model="categories"
              :items="bookcategories"
              label="Book Category"
              chips
              color="#f66c1f"
            ></v-select>

            <v-text-field
              v-model="price"
              solo
              label="Book price (in local currency)"
              required
              :rules="feeRules"
              type="number"
              hint="if your book is free, enter 0"
            />

            <v-textarea
              v-model="description"
              color="black"
              solo
              counter
              auto-grow
              label="Book Description"
              required
              :rules="descriptionRules"
            />

            <v-select
              v-model="language"
              :items="selectlanguage"
              label="Language"
              color="#f66c1f"
            ></v-select>

            <v-text-field
              v-model="coauthor"
              text
              solo
              prepend-inner-icon="mdi-account"
              label="Names of coauthors (if applicable)"
              dense
              clearable
              color="#f66c1f"
            />
            <v-select
              v-model="downloadable"
              color="#f66c1f"
              :items="choices"
              label="Do you want your book to be downloadable"
              hint="Advisable only for FREE books"
            />

            <br />

            <v-card-subtitle class="text-center">
              <p style="font-size:12px">
                Upload your eBook/Audiobook (epub, pdf, mp3 formats supported). Max file size 10MB
              </p>
              <input
                type="file"
                label="Upload your ebook (pdf & Epub supported)"
                @change="previewFile"
              />
            </v-card-subtitle>

            <v-card-subtitle
              >Progress: {{ fileValue.toFixed() + "%" }}</v-card-subtitle
            >

            <v-progress-linear
              color="#48c857"
              :value="fileValue"
              stream
              striped
            />

            <v-btn
              color="#FF5733"
              block
              class="white--text"
              :disabled="fileData == null"
              :loading="fileloading"
              @click="fileUpload"
            >
              {{ textFile }}
            </v-btn>

            <br />
            <br />
            <p>
              {{ error }}
            </p>

            <v-btn
           
              large
              block
              elevation="10"
              raised
              :loading="loading"
              color="#ff5733"
              class="px-5 white--text"
              @click="create"
              style="margin-bottom:90px;margin-top:-30px"
            >
              Publish
            </v-btn>
          </v-form>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ word }}
            <v-btn color="primary" text @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>

          <v-dialog v-model="dialog" max-width="370" max-height="500">
            <v-card class="text-center" color="#f66c1f">
              <v-icon center style="margin-top:30px" color="white" size="80px"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
              <p style="font-size:27px" class="font-weight-bold white--text text-center mt-2"
                >Book Published <br />
                Successfully!</p
              >

              <v-card-text class="text-center white--text">
                Click the button below to view your publications
              </v-card-text>

              <v-card-actions style="text-align:center">
                <v-spacer></v-spacer>

                <v-btn
                  color="white"
                  to="/publications"
                  class=" mb-6"
                  style="color:#f66c1f"
                >
                  View Publications
                </v-btn>

                <v-btn color="white" text @click="dialog = false" class="mb-6">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="failure" max-width="500">
      <v-card elevation="24" color="red" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-close-circle</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-black"
        >
        Book Not Published
        </h1>
        <p style="font-size:15px;color:white">
          {{message}}
        </p>
        <v-btn @click="failure = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="socialsignup">
        <SocialSignup />
        </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    </div>
    </v-col>
    </v-row>
    <v-main class="hidden-md-and-up">
    <v-toolbar flat>
        <v-btn @click="goBack" color="#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5 black--text font-weight-black"
          height="500px"
          style="font-size:17px"
        >
          Publish
        </v-toolbar-title>

        <v-spacer />
      </v-toolbar>
    

    <v-container style="margin-bottom:20px">
      <v-row>
        <v-col cols="12" md="5">
          <v-card color="#f66c1f" elevation="24" style="margin-top:70px">
            <p
              style="font-size:17px; color:white;text-align:center;padding-top:23px"
            >
              Upload Book cover
            </p>
            <v-card-subtitle class="text-center">
              <input
                type="file"
                label="Upload your book cover (png, jpg accepted)"
                accept="image/*"
                required
                @change="previewImage"
              />
            </v-card-subtitle>

            <v-card-subtitle class="white--text"
              >Progress:
              {{ uploadValue.toFixed() + "%" }} complete</v-card-subtitle
            >

            <v-progress-linear
              color="#48c857"
              :value="uploadValue"
              stream
              striped
            />

            <v-btn
              color="white"
              tile
              block
              class="black--text"
              :disabled="imageData == null"
              :loading="imgloading"
              @click="onUpload"
            >
              {{ text }}
            </v-btn>
          </v-card>
        </v-col>
        <v-col md="7">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="title"
              solo
              label="Book Title"
              :rules="titleRules"
              required
            />
            <v-select
              v-model="filetype"
              :items="bookfile"
              :rules="fileRules"
              label="file type"
              color="#f66c1f"
            ></v-select>

            <v-select
              v-model="categories"
              :items="bookcategories"
              label="Book Category"
              chips
              color="#f66c1f"
            ></v-select>

            <v-text-field
              v-model="price"
              solo
              label="Book price (in local currency)"
              required
              :rules="feeRules"
              type="number"
              hint="if your book is free, enter 0"
            />

            <v-textarea
              v-model="description"
              color="black"
              solo
              counter
              auto-grow
              label="Book Description"
              required
              :rules="descriptionRules"
            />

            <v-select
              v-model="language"
              :items="selectlanguage"
              label="Language"
              color="#f66c1f"
            ></v-select>

            <v-text-field
              v-model="coauthor"
              text
              solo
              prepend-inner-icon="mdi-account"
              label="Names of coauthors (if applicable)"
              dense
              clearable
              color="#f66c1f"
            />
            <v-select
              v-model="downloadable"
              color="#f66c1f"
              :items="choices"
              label="Do you want your book to be downloadable"
              hint="Advisable only for FREE books"
            />

            <br />

            <v-card-subtitle class="text-center">
              <p style="font-size:12px">
                Upload your eBook/Audiobook (epub, pdf, mp3 formats supported). Max file size 10MB
              </p>
              <input
                type="file"
                label="Upload your ebook (pdf & Epub supported)"
                @change="previewFile"
              />
            </v-card-subtitle>

            <v-card-subtitle
              >Progress: {{ fileValue.toFixed() + "%" }}</v-card-subtitle
            >

            <v-progress-linear
              color="#48c857"
              :value="fileValue"
              stream
              striped
            />

            <v-btn
              color="#FF5733"
              block
              class="white--text"
              :disabled="fileData == null"
              :loading="fileloading"
              @click="fileUpload"
            >
              {{ textFile }}
            </v-btn>

            <br />
            <br />
            <p>
              {{ error }}
            </p>

            <v-btn
           
              large
              block
              elevation="10"
              raised
              :loading="loading"
              color="#f66c1f"
              class="px-5 white--text"
              @click="create"
              style="margin-bottom:90px;margin-top:-30px"
            >
              Publish
            </v-btn>
         </v-form>
        </v-col>
      </v-row>
    </v-container>
    
    </v-main>
    <BottomMenu class="hidden-md-and-up" />
  </v-app>
</template>

<script>
import "firebase/firestore";
import firebase from "firebase/app";
import slugify from "slugify";
import BottomMenu from "@/components/BottomMenu";
import db from "../main";
import NavBar from '@/components/NavBar'
import SocialSignup from '@/components/SocialSignup'
import { mapGetters } from 'vuex'

export default {
  components: {
    BottomMenu,
    NavBar,
    SocialSignup
  },
  data() {
    return {
      dialog: false,
      files: [],
      message:"",
      falure:false,
      choices: ["Yes", "No"],
      filetype: "",
      bookfile: ["Epub", "Pdf", "Audio"],
      categories: "",
      downloadable: "",
      language: "",
      text: "Click To Upload",
      textFile: "Click to Upload",
      selectlanguage: ["English", "Hausa", "Igbo", "Swahili", "Yoruba"],
      bookcategories: [
        "adventure",
        "anthology",
        "business",
        "finance",
        "children",
        "comics",
        "fiction",
        "history",
        "health",
        "humour",
        "non-fiction",
        "poetry",
        "romance",
        "self-help",
        "others"
      ],
      image: [],
      error: "",
      slug: null,
      author: null,
      title: '',
      price: null,
      readers: [],
      description: null,
      coauthor: null,
      photoURL: null,
      snackbar: false,
      word: "",
      timeout: 2500,

      loading: false,

      valid: true,
      lazy: false,
      menu: true,

      titleRules: [v => !!v || "Title is required"],
      fileRules: [v => !!v || "File type is required"],
      descriptionRules: [
        v => !!v || "Description is required",
        v => (v && v.length <= 300) || "Description must be max. 300 characters"
      ],
      feeRules: [v => !!v || "Price is required"],
      imgloading: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
      fileValue: 0,
      imageUploaded: false,
      fileloading: false,
      fileData: null,
      file: null,
      fileUploaded: false,
      person: "",
      userData: "",
      pointer: "",
      disabled:true,
      socialsignup:false,
      failure:false,

    };
  },


  computed:{
    ...mapGetters({
      user:"user"
    })
  },

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.person = user;
      if (!this.person) this.$router.push("/login");
    });
  },

  created() {
    
      this.pointer = slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      });

      db.collection("users")
        .doc(this.pointer)
        .get()
        .then(doc => {
          this.userData = doc.data();
        }).then(() =>{
          if(this.userData == null){
            this.socialsignup = true
          }
        })
    
  },
  methods: {
    create() {
      if(this.filetype == ""){
       this.failure = true
       this.message = "You need to choose your book file type"
       console.log(this.message)
      } else if(this.title == null){
        this.failure = true
        this.message ="Sorry, Book title is required"
      }
       else if(this.imageData == null){
        this.failure = true
        this.message ="You need to upload your book cover."
      }

      else if(this.description == null){
        this.failure = true
        this.message ="Book description is required"
      }
      else if(this.categories == null){
        this.failure = true
        this.message ="Please select a category for your book"
      }else{
      this.loading = true;
      (this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      })),
        (this.author = slugify(this.user.data.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true
        }));

      db.collection("books")
        .doc(this.slug)
        .get()
        .then(docRef => {
          if (docRef.exists) {
            this.word = "This book title is already used.";
            this.snackbar = true;
            this.loading = false;
          } else {
            db.collection("books")
              .doc(this.slug)
              .set({
                title: this.title,
                price: this.price,
                description: this.description,
                author: this.author,
                photoURL: this.user.data.photoURL,
                email: this.user.data.email,
                readers: [],
                currency: this.userData.currency,
                rating: "",
                bookcover: this.picture,
                book: this.file,
                coauthor:this.coauthor,
                category: this.categories,
                language: this.language,
                filetype: this.filetype,
                slug: this.slug,
                downloadable: this.downloadable,
                timestamp: firebase.firestore.Timestamp.now()
              })
              .then(() => {
                this.loading = false;
                this.dialog = true;
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
                this.word =
                  "We encountered an error while trying to publish your book. Please try again";
                this.snackbar = true;
                this.loading = false;
              });
          }
        });
        }
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      this.imgloading = true;

      var uploadImage = new Promise((resolve, reject) => {
        var storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          snapshot => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          () => {
            reject();
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.picture = url;
              resolve();
            });
          }
        );
      });

      uploadImage.then(() => {
        this.imageUploaded = true;
        this.imgloading = false;
        this.text = "Upload Complete!";
      });
    },
    previewFile(event) {
      this.fileValue = 0;
      this.file = null;
      this.fileData = event.target.files[0];
    },

    fileUpload() {
      this.file = null;
      this.fileloading = true;

      var uploadFile = new Promise((resolve, reject) => {
        var storageRef = firebase
          .storage()
          .ref(`${this.fileData.name}`)
          .put(this.fileData);
        storageRef.on(
          `state_changed`,
          snapshot => {
            this.fileValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          () => {
            reject();
          },
          () => {
            this.fileValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.file = url;
              resolve();
            });
          }
        );
        this.fileUploaded = true;
      });

      uploadFile.then(() => {
        this.fileloading = false;
        this.textFile = "Upload Complete!";
        this.disabled = false
      });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
