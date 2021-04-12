<template>
  <v-app id="inspire">
    <v-card>
      <v-toolbar class="md-4 hidden-md-and-down ">
        <v-btn
          @click="goBack"
          class="ml-16"
          color="#FF4E07"
          style="color:white"
        >
          <v-icon color="white">mdi-chevron-left</v-icon>Back
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

      <v-toolbar class="md-4 hidden-lg-and-up" color="#f66c1f">
        <v-btn @click="goBack" style="color:white" text>
          <v-icon color="white">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5 white--text font-weight-black"
          height="500px"
          style="font-size:17px"
        >
          Publish
        </v-toolbar-title>

        <v-spacer />
      </v-toolbar>
    </v-card>
   <NavBar />
    <v-container style="margin-bottom:20px">
      <v-row>
        <v-col cols="12" md="5">
          <v-card color="#FF5733" elevation="24" style="margin-top:70px">
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
                Upload your eBook (epub, pdf, mp3 formats supported). Max file size 10MB
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
              :disabled="disabled"
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
              <v-card-text class="headline white--text text-center mt-2"
                >Book Published <br />
                Successfully!</v-card-text
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
        </v-col>
      </v-row>
    </v-container>
    <BottomMenu />
  </v-app>
</template>

<script>
import "firebase/firestore";
import firebase from "firebase/app";
import slugify from "slugify";
import BottomMenu from "@/components/BottomMenu";
import db from "../main";
import NavBar from '@/components/NavBar'

export default {
  components: {
    BottomMenu,
    NavBar,
  },
  data() {
    return {
      dialog: false,
      files: [],
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
      title: null,
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

      users: this.$route.params.id,

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
      user: "",
      userData: "",
      pointer: "",
      disabled:true,

    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (!this.user) this.$router.push("/login");
    });
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.pointer = slugify(this.user.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      });

      db.collection("users")
        .doc(this.pointer)
        .get()
        .then(doc => {
          this.userData = doc.data();
        });
    });
  },
  methods: {
    create() {
      this.loading = true;
      (this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      })),
        (this.author = slugify(this.user.displayName, {
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
                photoURL: this.user.photoURL,
                email: this.user.email,
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
