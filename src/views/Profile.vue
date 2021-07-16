<template>
  <v-app>
    <v-dialog persistent v-model="socialsignup" v-if="userData == undefined">
        <SocialSignup />
        </v-dialog>
   <v-row no-gutters>
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
      <v-main class="md-4 hidden-sm-and-down">
      <v-card flat>
      <v-toolbar flat  class="md-4 hidden-sm-and-down ">
        <v-btn
          @click="goBack"
          width="10px"
          color="#f66c1f"
          text
        >
          <v-icon color="f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          flat
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
    </v-card>

        <div class="hidden-sm-and-down mt-3" style="text-align:center">
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
                    :src="person.photoURL"
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
          <p style="padding-top:20px;padding-bottom:0px;margin-bottom:6px;font-size:17px;text-align:center">
            Your Tell! Books username is
            <router-link
              :to="`/author/${userData.displayName}`"
              style="text-decoration:none;color:#f66c1f"
              >{{ userData.displayName }}</router-link
            >
          </p>
          <ColorModePicker />
          
           <div style="margin:5px auto 150px auto;max-width:500px">
              <v-list>
                <v-list-item-group>
                  <v-list-item @click="profileUpdate = !profileUpdate" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-account-edit</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                       Edit My Profile
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item to="/reset-password" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                        Security Settings
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item @click="CustomerSupport =! CustomerSupport" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-headset</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                       Customer Support
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item @click="inviteFriends = !inviteFriends" class="transborders">
                <v-list-item-icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="font-size:16px">
                    Invite your friends
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>

                  <v-list-item @click="logOut()" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                        Logout
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </div>







       <v-dialog fullscreen v-model="profileUpdate">
      <v-sheet
        height="900px"
        style="padding:15px 80px 80px 80px"
      >
      <v-btn width="40px" icon @click="profileUpdate = !profileUpdate" large fab><v-icon>mdi-close</v-icon></v-btn>
          <v-form>
          <v-row>
          <v-col>
           <label>Username</label>
          <v-text-field
            v-model="userData.displayName"
            solo
            label="Username"
            class="body-2"
            color="#f66c1f"
            readonly
            hint="Sorry, you can't change your username"
             style="border-radius:8px"
          />
          </v-col>
          <v-col>
          <label>Currency</label>
          <v-text-field
            v-model="userData.currency"
            class="body-2"
            color="#f66c1f"
            label="currency"
            readonly
            hint="Sorry, you cannot change your currency"
            solo
             style="border-radius:8px"
          />
          </v-col>
          </v-row>
          <v-row class="mt-0">
          <v-col>
          <v-text-field
            v-model="person.email"
            label="Email"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px"
          />
          </v-col>
          <v-col>
           <v-text-field
            v-model="userData.fullname"
            label="Full name"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px"
          />
          </v-col>
          </v-row>
         
          <v-row class="mt-0">
          <v-col>
           <v-text-field
            v-model="userData.tell"
            class="body-2"
            color="#f66c1f"
            label="Link to your Tell! account (if you have one)"
            outlined
             style="border-radius:8px"
          />
          
          </v-col>
          <v-col>
           <v-text-field
            v-model="userData.phonenumber"
            class="body-2"
            color="#f66c1f"
            label="Phone Number. Please include country code"
            hint="This will enable your readers to message you on WhatsApp"
            outlined
             style="border-radius:8px"
          />
          </v-col>

          
          </v-row>

          <v-textarea
            v-model="userData.bio"
            label="Bio"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px"
          />
          <v-btn
            class="white--text mb-0"
            width="300px"
            elevation="12"
            color="#f66c1f"
            :loading="loading"
            @click="updateProfile"
            block
            large
            style="border-radius:8px"
          >
            Save
          </v-btn>
          </v-form>
          </v-sheet>
          </v-dialog>


       <!--- Dialog -->
          <v-dialog style="border-radius:12px" max-width="400" max-height="500" v-model="inviteFriends">
           <div style="padding:0px 16px 0px 0px" class="d-flex justify-end" >
        <v-btn
          fab
          depressed
          style="margin-left:85%;text-align:end;margin-bottom:10px"
          small
          right
          color="white"
          @click="inviteFriends = !inviteFriends"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
        </div>
           <inviteFriends />
          </v-dialog>
         
          <v-dialog style="border-radius:12px" max-width="400" max-height="600" v-model="CustomerSupport">
           <div style="padding:0px 16px 0px 0px" class="d-flex justify-end" >
        <v-btn
          fab
          depressed
          style="margin-left:85%;text-align:end;margin-bottom:10px"
          small
          right
          color="white"
          @click="CustomerSupport = !CustomerSupport"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
        </div>
           <CustomerSupport />
          </v-dialog>






       
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
    </v-main>
        </div>
        </v-col>
        </v-row>
        <!--Phone view -->

        
        <v-main class="hidden-md-and-up">
        <div class="mb-3">
        <v-btn @click="goBack" style="float:left;color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class=" mr-5"
          style="font-size:15px;color:white;float:right"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
        </div>
        <br/>
        <div class="mt-5" style="padding:0px 22px 0px 22px;text-align:center">
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
                    :src="person.photoURL"
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
          <p style="padding-top:20px;padding-bottom:0px;margin-bottom:6px;font-size:17px;text-align:center">
            Your Tell! Books username is
            <router-link
              :to="`/author/${userData.displayName}`"
              style="text-decoration:none;color:#f66c1f"
              >{{ userData.displayName }}</router-link
            >
          </p>
          <ColorModePicker />
          
           <div style="margin:5px auto 150px auto;max-width:500px">
              <v-list>
                <v-list-item-group>
                  <v-list-item @click="profileUpdateMobile = !profileUpdateMobile" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-account-edit</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                       Edit My Profile
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item to="/reset-password" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                        Security Settings
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item @click="CustomerSupport =! CustomerSupport" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-headset</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                       Customer Support
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item to="/statistics" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-trending-up</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                      Statistics
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item @click="inviteFriends = !inviteFriends" class="transborders">
                <v-list-item-icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="font-size:16px">
                    Invite your friends
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>

                  <v-list-item @click="logOut()" class="transborders">
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size:16px">
                        Logout
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-chevron-right
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </div>

             

        <v-dialog fullscreen v-model="profileUpdateMobile">
        <v-sheet
        
        style="padding:15px 20px 80px 20px;border-radius:30px 30px 0px 0px"
      >
      <v-btn width="40px" icon @click="profileUpdateMobile = !profileUpdateMobile" large fab><v-icon>mdi-close</v-icon></v-btn>
          <v-form>
          <v-row style="margin-bottom:-26px">
          <v-col>
           <label>Username</label>
          <v-text-field
            v-model="userData.displayName"
            solo
            label="Username"
            class="body-2"
            color="#f66c1f"
            readonly
            hint="Sorry, you can't change your username"
             style="border-radius:8px"
          />
          </v-col>
          <v-col>
          <label>Currency</label>
          <v-text-field
            v-model="userData.currency"
            class="body-2"
            color="#f66c1f"
            label="currency"
            readonly
            hint="Sorry, you cannot change your currency"
            solo
             style="border-radius:8px"
          />
          </v-col>
          </v-row>
          <v-row class="mt-0" style="margin-bottom:-20px">
          <v-col>
          <v-text-field
            v-model="person.email"
            label="Email"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px"
          />
          </v-col>
          <v-col>
           <v-text-field
            v-model="userData.fullname"
            label="Full name"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px;"
          />
          </v-col>
          </v-row>
         
           <v-text-field
            v-model="userData.tell"
            class="body-2"
            color="#f66c1f"
            label="Link to your Tell! account (if you have one)"
            outlined
             style="border-radius:8px;margin-bottom:-10px"
          />
          
           <v-text-field
            v-model="userData.phonenumber"
            class="body-2"
            color="#f66c1f"
            label="Phone Number. Please include country code"
            hint="This will enable your readers to message you on WhatsApp"
            outlined
             style="border-radius:8px;margin-bottom:-10px"
          />
       

          
         

          <v-textarea
            v-model="userData.bio"
            label="Bio"
            class="body-2"
            color="#f66c1f"
            outlined
             style="border-radius:8px"
          />
          <v-btn
            class="white--text mb-5"
            width="300px"
            elevation="12"
            color="#f66c1f"
            :loading="loading"
            @click="updateProfile"
            block
            large
            style="border-radius:8px"
          >
            Save
          </v-btn>
          </v-form>
        </v-sheet>
        </v-dialog>
        </v-main>
    <BottomMenu class="hidden-md-and-up"/>
  </v-app>
</template>

<script>
// import { mapGetters } from "vuex"
import firebase from "firebase";
import db from "../main";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import slugify from "slugify";
import InviteFriends from '@/components/InviteFriends'
import CustomerSupport from '@/components/CustomerSupport'
import ColorModePicker from "@/components/ColorModePicker";
import SocialSignup from '@/components/SocialSignup'

export default {
  components: {
    NavBar,
    BottomMenu,
    InviteFriends,
    CustomerSupport,
    ColorModePicker,
    SocialSignup
  },
  data() {
    return {
      uid: null,
      person: "",
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
      overlay: false,
      inviteFriends:false,
      CustomerSupport:false,
      profileUpdate:false,
      profileUpdateMobile:false,
      socialsignup:true,
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
      this.person = user;
      if (!this.person) this.$router.push("/login");
    });
  },
  beforeCreate() {
    window.scrollTo(0,0);
    firebase.auth().onAuthStateChanged(user => {
      this.person = user;
      this.slug = slugify(this.person.displayName, {
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
          console.log(this.userData)
          }).then(()=>{
            if(this.userData == undefined){
              console.log(this.userData)
              this.socialsignup = true
            }
          })
          
      
    })
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

        this.slug = slugify(this.person.displayName, {
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
    },
    logOut() {
     sessionStorage.removeItem('vuex')
     firebase.auth().signOut().then(result => {
       console.log(result)
       this.user=''
      this.$router.push('/')
     })
   }
  }
};
</script>


<style scoped>
.transborders {
  border: solid 0.1em #eef1f1;
  border-radius: 8px;
  height: 69px;
  margin-bottom: 9px;
}
</style>
