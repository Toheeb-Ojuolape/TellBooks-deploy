<template>
  <v-app id="inspire">
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
          Profile
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
    <v-container style="margin-bottom:30px">
      <v-row>
        <v-col md="5" sm="4">
        <div style="text-align:center">
          <v-avatar
            height="150"
            width="150"
            @click="cover = true"
          >
            <v-hover round fab @click="cover = true">
              <template v-slot:default="{ hover }">
                <v-card flat round fab>
                  <v-img
                    class="white--text align-end"
                    height="250px"
                    :src="user.photoURL"
                    contain
                    fab
                    round
                  >
                  </v-img>
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-icon @click="cover = true">mdi-camera</v-icon>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-avatar>
          <v-btn
            fab
            small
            style="margin-top:70px;margin-left:-30px"
            color="#f66c1f"
            @click="cover = true"
            ><v-icon style="color:white">mdi-pen</v-icon></v-btn
          >
          <p style="padding-top:20px;font-size:17px;text-align:center">
            Your Tell! Books username is
            <router-link
              :to="`/author/${userData.displayName}`"
              style="text-decoration:none;color:#f66c1f"
              >{{ userData.displayName }}</router-link
            >
          </p>
          </div>
        </v-col>

        <v-col md="7" sm="8">
          <v-text-field
            v-model="userData.displayName"
            solo
            label="Username"
            class="body-2"
            color="#f66c1f"
            readonly
            hint="Sorry, you can't change your username"
          />

          <v-text-field
            v-model="user.email"
            label="Email"
            class="body-2"
            color="#f66c1f"
          />

          <v-text-field
            v-model="userData.currency"
            class="body-2"
            color="#f66c1f"
            label="currency"
            readonly
            hint="Sorry, you cannot change your currency"
          />

          <v-text-field
            v-model="userData.tell"
            class="body-2"
            color="#f66c1f"
            label="Link to your Tell! account (if you have one)"
          />

          <v-text-field
            v-model="userData.fullname"
            label="Full name"
            class="body-2"
            color="#f66c1f"
          />

          <v-text-field
            v-model="userData.phonenumber"
            class="body-2"
            color="#f66c1f"
            label="Phone Number. Please include country code"
            hint="This will enable your readers to message you on WhatsApp"
          />

          <v-textarea
            v-model="userData.bio"
            label="Bio"
            class="body-2"
            color="#f66c1f"
          />
          <v-btn
            class="white--text"
            width="300px"
            elevation="24"
            color="#f66c1f"
            :loading="loading"
            @click="updateProfile"
          >
            Save
          </v-btn>
        </v-col>

        <v-dialog v-model="cover" class="mx-auto" max-width="600px" persistent>
          <v-card color="#f66c1f">
            <v-card-subtitle class="text-center mr-9">
              <p
                style="font-size:18px; color:white;text-align:center;padding-top:23px"
              >
                Edit your profile picture
              </p>
            </v-card-subtitle>
            <v-card-subtitle class="text-center ml-13">
              <input type="file" accept="image/*" @change="previewImage" />
            </v-card-subtitle>

            <v-card-subtitle class="white--text"
              >Progress: {{ uploadValue.toFixed() + "%" }}</v-card-subtitle
            >

            <v-progress-linear
              :value="uploadValue"
              color="#48c857"
              stream
              striped
            ></v-progress-linear>

            <v-card-actions>
              <v-spacer />
              <v-btn text class="white--text" @click="cover = false">
                Cancel
              </v-btn>

              <v-btn
                color="white"
                class="blue--text"
                :loading="imgloading"
                :disabled="imageData == null"
                @click="onUpload"
              >
                Upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="#f66c1f" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
        <v-overlay :value="overlay" color="#f66c1f">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-row>
    </v-container>
    <BottomMenu />
  </v-app>
</template>

<script>
// import { mapGetters } from "vuex"
import firebase from "firebase";
import db from "../main";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import slugify from "slugify";

export default {
  components: {
    NavBar,
    BottomMenu
  },
  data() {
    return {
      uid: null,
      user: "",
      cover: false,
      dialog: false,
      imageData: null,
      userData: [],
      slug: "",
      picture: "",
      imgloading: false,
      uploadValue: 0,
      snackbar: false,
      text: "",
      timeout: 3000,
      loading: false,
      fullname: "",
      overlay: true
    };
  },
  //  computed: {
  //     ...mapGetters({
  //         // map `this.user` to `this.$store.getters.users
  //         user: "user"
  //     })
  //   },

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (!this.user) this.$router.push("/login");
    });
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      this.slug = slugify(this.user.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true
      });

      let ref = db.collection("users");
      ref
        .doc(this.slug)
        .get()
        .then(doc => {
          this.userData = doc.data();
          this.overlay = false;
        });
    });
  },

  methods: {
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
        db.collection("users")
          .doc(this.slug)
          .update({
            photoURL: this.picture
          })
          .then(() => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
              photoURL: this.picture
            });
            this.text = "Profile picture updated!";
            this.snackbar = true;
            location.reload();
          });
      });
    },

    updateProfile() {
      this.loading = true;
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;

        this.slug = slugify(this.user.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true
        });

        let ref = db.collection("users").doc(this.slug);
        ref
          .update({
            fullname: this.userData.fullname,
            phonenumber: this.userData.phonenumber,
            bio: this.userData.bio,
            tell: this.userData.tell
          })
          .then(() => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
              phoneNumber: this.userData.phonenumber
            });
          })
          .then(() => {
            this.loading = false;
            this.text = "Account updated successfully";
            this.snackbar = true;
          })
          .catch(error => {
            // An error happened.
            console.log(error);
            this.loading = false;
            this.text = "Error updating account details. Try again later";
            this.snackbar = true;
          });
      });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
