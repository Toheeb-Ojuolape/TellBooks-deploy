<template>
   <v-card style="border-radius:12px" class="text-center pa-4">
        <p
          style="color:#f66c1f;font-size:19px;margin-top:2px"
          class="font-weight-bold"
          color="#f66c1f"
        >
          Create An Account
        </p>
        
             <v-alert v-model="snackbar" type="error">
               {{ error }}
            </v-alert>
           
        <v-form v-on:submit.prevent="pressed()">
        <v-row>
        <v-col>
          <v-text-field
            v-model="displayName"
            outlined
            label="First Name"
            type="text"
            color="#f66c1f"
            style="border-radius:8px;margin-bottom:-15px"
          />
          </v-col>
          <v-col>
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            type="text"
            color="#f66c1f"
            style="border-radius:8px;margin-bottom:-15px"
          />
          </v-col>
          </v-row>
          <v-select
            v-model="country"
            outlined
            :items="currency"
            :item-text="'country'"
            :item-value="'code'"
            label="Select Country"
            color="#f66c1f"
            style="border-radius:8px;margin-bottom:-15px"
          ></v-select>
          <v-text-field
            v-model="password"
            outlined
            color="#f66c1f"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
            style="border-radius:8px;margin-bottom:-16px"
          />

          <v-btn
            block
            color="#F66C1F"
            class="animate__animated animate__fadeInUp white--text"
            elevation="6"
            @click="pressed"
            x-large
            style="border-radius:8px;font-size:14px; margin-top:-9px"
            :loading="loading"
          >
            Sign Up
          </v-btn>
          <div class="or">
            <h2 class="orText">OR</h2>
            <div class="line"></div>
          </div>
          
                
                <section style="width:100%" width="100%" id="firebaseui-auth-container" />
                
        </v-form>
        <p class="text-center" style="font-size:14px;margin-bottom:0px;padding-bottom:0px" to="/login">
          Already have an account?
          <v-btn width="10px" text @click="loginPop()" style="color:#f66c1f;text-decoration:none">
            Login</v-btn
          >
        </p>
    </v-card>
</template>

<script>
import slugify from "slugify";
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "firebase/firestore";
import db from "../main";

export default {
  name: "Signup",
  data() {
    return {
      loading: false,
      email: "",
      displayName: "",
      password: "",
      error: null,
      country: "",
      currency: [
        { country: "Nigeria", code: "NGN" },
        { country: "America", code: "USD" },
        { country: "Benin", code: "CFA" },
        { country: "Burkina Faso", code: "CFA" },
        { country: "Burundi", code: "BIF" },
        { country: "Cameroon", code: "CFA" },
        { country: "Canada", code: "CAD" },
        { country: "Congo", code: "CDF" },
        { country: "Cape Verde", code: "CVE" },
        { country: "Dubai", code: "AED" },
        { country: "Europe", code: "Euro" },
        { country: "England", code: "GBP" },
        { country: "Gambia", code: "GMD" },
        { country: "Ghana", code: "GHS" },
        { country: "Guinea", code: "GNF" },
        { country: "Guinea Bissau", code: "CFA" },
        { country: "Ivory Coast", code: "CFA" },
        { country: "Kenya", code: "KES" },
        { country: "Liberia", code: "LRD" },
        { country: "Malawi", code: "MWK" },
        { country: "Mali", code: "CFA" },
        { country: "Malaysia", code: "MYR" },
        { country: "Mozambique", code: "MZN" },
        { country: "Niger", code: "CFA" },
        { country: "Rwanda", code: "RWF" },
        { country: "Sierra Leone", code: "SLL" },
        { country: "Sao Tome", code: "STD" },
        { country: "Saudi Arabia", code: "SAR" },
        { country: "Senegal", code: "CFA" },
        { country: "South Africa", code: "ZAR" },
        { country: "Togo", code: "CFA" },
        { country: "Uganda", code: "UGX" },
        { country: "United States of America", code: "USD" },
        { country: "Zambia", code: "ZMW" },
        { country: "Zimbabwe", code: "ZWD" },
      ],

      snackbar: false,
      timeout: 3000,
      y: "top",
      show: false,
      slug: "",
      rules: {
        required: (value) => !!value || "Required.",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  // Signing in with social media accounts
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/socialsignup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
    };

    ui.start("#firebaseui-auth-container", uiConfig);

    //this is signup route-guard
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.user = user;
    //   if (this.user) this.$router.push("/dashboard");
    // });
  },
  //signing with social media ends

  ////////
  //signing up with email and password and automatically creating user profile slug
  methods: {
    closeSignup(){
      this.$emit('closeSignup')
    },
  
    loginPop(){
        this.$emit('loginPop')
    },


    pressed() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 3500);

      if (this.displayName && this.email && this.password) {
        this.slug = slugify(this.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.error = "This username is already used.";
            this.snackbar = true;
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .catch((error) => {
                this.error = error.message;
                this.snackbar = true;
              })
              .then((data) => {
                data.user
                  .updateProfile({
                    displayName: this.displayName,
                    photoURL:
                      "https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2",
                  })
                  .then(() => {
                    ref
                      .set({
                        displayName: this.slug,
                        email: this.email,
                        earnings: "",
                        withdrawals: [],
                        books: [],
                        fullname: this.displayName,
                        phonenumber: "",
                        photoURL:
                          "https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2",
                        bio: "I'm about to publish a tellbooks best seller",
                        currency: this.country,
                        tell: "",
                      })
                      .then(() => {
                        this.$router.push("/dashboard");
                      });
                  });
              });
          }
        });
      } else {
        this.error = "You need to enter your details";
        this.snackbar = true
        setTimeout(() =>{
          this.snackbar = false
        },2000)
      }
    },
  },
};
</script>

<style scoped>


.or {
  text-align: center;
}

.line {
  height: 1px;
  background:black;
}

.orText {
  position: relative;
  top: 10px;
  color:black;
  font-size:13px;
  background:white;
  display: inline-block;
  padding: 0 20px;
  border-radius:30px
}

.floating {   
    animation-name: floating; 
    animation-duration: 3s; 
    animation-iteration-count: infinite; 
    animation-timing-function: ease-in-out; 
    margin-left: 30px; 
    margin-top: 5px; 
    color: white;
} 
  
@keyframes floating { 
    0% { transform: translate(0,  0px); } 
    50%  { transform: translate(0, 15px); } 
    100%   { transform: translate(0, -0px); }     
} 

</style>
