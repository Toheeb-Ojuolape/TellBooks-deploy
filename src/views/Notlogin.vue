<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row class="text-center" justify="center">
          <v-col cols="12" sm="6" md="8">
              <v-row>
                <v-img
                  cols="12"
                  md="7"
                  sm="12"
                src="https://res.cloudinary.com/tell/image/upload/v1601593280/Untitled_design_61_gw30fd.png"
                style="padding-left:-400px;padding-right:59px; margin-top:0px; margin-bottom:-130px; height:540px"
                 cover
                 width="50%"
                 class="hidden-md-and-down"
  >

                  <v-card-text class="mt-16">
                      <v-btn
                        rounded
                        color="#f66c1f"
                        class="white--text"
                        to="/signup"
                        style="font-size:14px;margin-top:100px"
                      >
                        Sign Up
                      </v-btn>
                  </v-card-text>
                </v-img>

                <v-col md="5" class="text-center mx-5">
                  <p
                    class="font-weight-black  text-center my-6" 
                    style="font-size:23px"
                  >
                    Login
                  </p>
                  <p class="font-bold my-2 text-center black--text" style="font-size:16px;margin-top:-37px">
                    Read Books & Chill ✌🏼
                  </p>
                
                  <section id="firebaseui-auth-container" />
                  <p style="font-size:14px">OR</p>
               
                  <v-form class="ma-4">
                    <v-text-field
                      v-model="email"
                      outlined
                      single-line
                      label="Enter your email address"
                      name="email"
                      prepend-inner-icon="mdi-email"
                      type="text"
                      color="#2D860F"
                      style="margin-top:-10px"
                    />
                    <v-text-field
                      v-model="password"
                      outlined 
                      single-line
                      color='#2D860F'
                      prepend-inner-icon="mdi-lock"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      name="password"
                      label="Enter your password"
                      style="margin-top:-15px"
                      @click:append="show = !show"
                    />
                    <v-btn
                      block
                      color="#25700C"
                      class="white--text"
                      elevation="24"
                      @click="pressed"
                      style="font-size:16px; margin-top:-6px"
                      :loading="loading"
                    >
                      Sign In
                    </v-btn>
                    <v-snackbar
                      v-model="snackbar"
                    >
                  <p style='font-size:14px;padding-top:-30px;padding-bottom:0px'>{{ feedback }} </p>

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
                  </v-form>
                  <v-btn text to="/forgotpassword" style="font-size:12px">
                    Forgot Password?
                  </v-btn>
                  <p text style="font-size:15px; margin-top:10px" to="/login" > 
                  Don't have an account? <router-link to="/signup" style="color:#f66c1f;text-decoration:none"> Signup</router-link>
                 </p>
                </v-col>
              </v-row>
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

export default {
     name: 'Login',
  data() {
    return {
      loading: false,
      name:"",
      email: "",
      password: "",
      feedback:null,
      snackbar: false,
      errors:"",
      color: '',
      mode: '',
      timeout: 3000,
        y: 'top',
      show: false,
       rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }
  },
 mounted() {
  let ui = firebaseui.auth.AuthUI.getInstance()
if (!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth())
}
        var uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: "/socialsignup",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID]
        }
        ui.start("#firebaseui-auth-container", uiConfig)



  },

  methods: {
          pressed(){
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
            if (this.email && this.password) {
               firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{

                this.$router.go(-1)

                     }).catch(error => {
                       console.log(error)
                    this.feedback= error
                    this.text = error.message
                    this.snackbar = true
              })
                
              this.feedback=null

            } else {
              this.feedback = "Please fill in both fields"
              this.snackbar = true
            }
             
         
              
         }
  },
  }

</script>

<style scope>

</style>
