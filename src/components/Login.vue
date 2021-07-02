<template>
    <v-card style="border-radius:12px" class="text-center pa-5">
            <p class="font-weight-black" style="color:#f66c1f;font-size:22px;padding:0px;margin:0px">
              Login
            </p>
            <p
              class="font-bold black--text"
              style="color:#f66c1f;font-size:16px;margin-bottom:12px"
            >
              Read Books & Chill ✌🏼
            </p>

            <v-form>

            <v-alert v-model="snackbar" type="error">
               {{ feedback}}
            </v-alert>

              <v-text-field
                v-model="email"
                outlined
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="text"
                color="#f66c1f"
                style="border-radius:8px;margin-bottom:-15px"
              />
              <v-text-field
                v-model="password"
                outlined
                color="#f66c1f"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Password"
                style="height:82px;border-radius:8px;margin-bottom:0px"
                @click:append="show = !show"
              />
              <p style="margin-top:0px;padding-top:0px;text-align:end" to="/forgotpassword">
               <router-link
                  to="/forgotpassword"
                  style="color:#f66c1f;text-decoration:none;font-size:14px"
                >
                  Forgot Password?
                  </router-link>
              </p>
              
              <v-btn
                block
                color="white"
                class="animate__animated animate__fadeInUp"
                elevation="8"
                x-large
                @click="pressed"
                style="color:#f66c1f;border-radius:8px;font-size:14px; margin-top:-6px"
                :loading="loading"
              >
                Log in
              </v-btn>
            </v-form>
            <div class="or">
              <h2 class="orText">OR</h2>
              <div class="line"></div>
            </div>

            <section id="firebaseui-auth-container" />

            <p text style="text-align:center;font-size:14px; margin-top:10px" to="/login">
              Don't have an account?
              <v-btn
               text
               @click="signupPop()"
                style="color:#f66c1f;text-decoration:none"
                 width="10px"
              >
                Signup</v-btn
              >
            </p> 
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      name: "",
      email: "",
      password: "",
      feedback: null,
      snackbar: false,
      errors: "",
      color: "",
      mode: "",
      timeout: 3000,
      y: "top",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
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

    // firebase.auth().onAuthStateChanged((user) => {
    //   this.user = user;
    //   if (this.user) this.$router.push("/dashboard");
    // });
  },

  methods: {
    signupPop(){
       this.$emit('signupPop')
    },
    pressed() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            location.reload()
          })
          .catch((error) => {
            console.log(error);
            this.feedback = error;
            this.text = error.message;
            this.snackbar = true;
          })
      } else {
        this.feedback = "Please fill in both fields";
        this.snackbar = true;
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
  background: black;
}

.orText {
  position: relative;
  top: 10px;
  color: black;
  font-size: 13px;
  background: white;
  display: inline-block;
  padding: 0 20px;
  border-radius: 30px;
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
