<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
      
        <v-row class="text-center" justify="center">
          <v-col cols="12" sm="6" md="8">
              <v-row>
                <v-col md="5" class="text-center" style="margin-left:12px; padding-left:-30px;padding-right:20px;padding-top:-60px;padding-bottom:8px">
                 <p      
                  style="font-size:24px;margin-top:-6px"             
                  class="font-weight-bold text-center black--text">
                    Create An Account
                  </p>

                  <p      
                  style="font-size:14px;margin-top:-14px"             
                  class="font-bold text-center black--text">
                    Ready for your next adventure? <b>Sign Up!</b>
                  </p>
                  <section id="firebaseui-auth-container" />
                  <div style="font-size:14px">OR</div>
                  <v-form class="ma-4" v-on:submit.prevent="pressed">
                    <v-text-field
                      v-model="displayName"
                      outlined
                      single-line
                      label="What's your name?"
                      prepend-inner-icon="mdi-account-circle"
                      type="text"
                      color="#f66c1f"
                      :rules="[rules.required]"
                      style="margin-top:-10px"
                    />
                    <v-text-field
                      v-model="email"
                      outlined
                      single-line
                      label="Enter your email address"
                      prepend-inner-icon="mdi-email"
                      type="text"
                      color="#f66c1f"
                      :rules="[rules.required]"
                      style="margin-top:-10px"
                    />
                     <v-select
                      v-model="country"
                      :items="currency"
                      :item-text="'country'"
                      :item-value="'code'"
                      label="Select Country"
                      color="#f66c1f"
                      style="margin-top:-8px;margin-bottom:7px"
                      :rules="[rules.required]"
                      chips
                     ></v-select>
                    <v-text-field
                      id="password"
                      v-model="password"
                      outlined
                      single-line
                      prepend-inner-icon="mdi-lock"
                      color="#f66c1f"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      name="password"
                      label="Enter your password"
                      class="input-group--focused"
                      @click:append="show = !show"
                      style="margin-top:-10px"
                    />
          
                    <v-btn
                      block
                      color="#f66c1f"
                      class="white--text"
                      elevation="24"
                      @click="pressed"
                      style="font-size:16px; margin-top:-9px"
                      :loading="loading"

                    >
                      Sign Up
                    </v-btn>
                    <v-snackbar
                      v-model="snackbar"
                    >
                  <p style='font-size:14px;padding-top:-30px;padding-bottom:0px'>{{ error }} </p>

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
                  <v-btn
                  text
                  style="font-size:12px"
                   class="text-center font-weight-thin my-3" to="/forgotpassword">
                    Forgot password?
                  </v-btn>
                  <p text style="font-size:15px; margin-top:-10px" to="/login" > 
                  Already have an account? <router-link to="/login" style="color:#2D860F;text-decoration:none"> Login</router-link>
                 </p>
                </v-col>

                <v-img
                  cols="12"
                  md="7"
                  sm="12"
                src="https://res.cloudinary.com/tell/image/upload/v1601575291/Untitled_design_60_akukss.png"
                style="padding-left:-400px;padding-right:59px; margin-top:0px; margin-bottom:-170px; height:620px"
                 cover
                 width="50%"
                 class="hidden-md-and-down"
  >

                  <v-card-text>
                      <v-btn
                        rounded
                        outlined
                        color="white"
                        to="/login"
                        style="font-size:12px;text-align:center;margin-top:209px"
                      >
                        Log In
                      </v-btn>
                  </v-card-text>
                </v-img>
              </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import slugify from "slugify"
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"
import 'firebase/firestore'
import db from '../main'


export default {
 name: 'Signup',
  data() {
    return {
      loading:false,
      email: "",
      displayName:"",
      password: "",
      error:null,
      country:"",
      currency:[
               {country:'America',code:'USD'},
               {country:'Argentina',code:'ARS'},
               {country:'Australia',code:'AUD'},
               {country:'Burundi', code:'BIF'},
               {country:'Canada',code:'CAD'},
               {country:'Congo',code:'CDF'},
               {country:'Cape Verde',code:'CVE'},
               {country:'Dubai',code:'AED'},
               {country:'Europe',code:'Euro'},
               {country:'England',code:'GBP'},
               {country:'Gambia',code:'GMD'},
               {country:'Ghana',code:'GHS'},
               {country:'Guinea',code:'GNF'},
               {country:'Kenya',code:'KES'},
               {country:'Liberia',code:'LRD'},
               {country:'Malawi',code:'MWK'},
               {country:'Malaysia',code:'MYR'},
               {country:'Mozambique',code:'MZN'},
               {country:'Nigeria',code:'NGN'},
               {country:'Rwanda',code:'RWF'},
               {country:'Sierra Leone',code:'SLL'},
               {country:'Sao Tome',code:'STD'},
               {country:'Saudi Arabia',code:'SAR'},
               {country:'South Africa',code:'ZAR'},
               {country:'Uganda',code:'UGX'},
               {country:'United States of America',code:'USD'},
               {country:'Zambia',code:'ZMW'},
               {country:'Zimbabwe',code:'ZWD'},

               
                
                
                
                
                ],

       snackbar: false,
        timeout: 3000,
        y: 'top',
      show: false,
      slug: '',
       rules: {
          required: value => !!value || 'Required.',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      
     
    }
  },
  // Signing in with social media accounts
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
        

//  this is signup route-guard
 firebase.auth().onAuthStateChanged(user => {
    this.user = user
    if(this.user)
    this.$route.push('/socialsignup')
  })
  },
//signing with social media ends

////////
//signing up with email and password and automatically creating user profile slug
  methods: {
          pressed(){
            this.loading = true
            setTimeout(() => (this.loading = false), 3500)

            if(this.displayName && this.email && this.password){
               this.slug = slugify(this.displayName, {
                 replacement:"-",
                 remove:/[$*_+~.()'"!\-:@]/g,
                 lower:true
               })
              let ref= db.collection('users').doc(this.slug)
              ref.get().then(doc => {
                if(doc.exists){
                  this.error= 'This username is already used.'
                  this.snackbar = true
                } else{
                 firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                 .catch(error => {
               this.error= error.message
               this.snackbar = true

                 })
                .then(data => {
                  data.user
                 .updateProfile({
                  displayName: this.displayName,
                  photoURL:"https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2"
                  })
                 .then(() => {
                   ref.set({
                   displayName: this.slug,
                   user_id: this.user.uid,
                   email:this.email,
                   earnings:"",
                   withdrawals:[],
                   books:[],
                   fullname:this.displayName,
                   phonenumber:"",
                   photoURL:"https://firebasestorage.googleapis.com/v0/b/tellbookstore.appspot.com/o/avatar.png?alt=media&token=593af39b-6c6d-47d8-afc5-ab8560b08dd2",
                   bio:"I'm about to publish a tellbooks best seller",
                   currency:this.country,
                   tell:""

                   }).then(() => {
                console.log('user logged in')
                 })
                 })

              })
                }
              

              })
            } else {
                this.error="You need to enter your details"
                 this.snackbar = true
            }

              
              
         },
  },
}

</script>
