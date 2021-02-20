<template>
 <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row class="text-center" justify="center">
          <v-col cols="12" sm="6" md="8">
            <v-card class="elevation-12">
              <v-row>
                <v-img
                  cols="12"
                  md="7"
                  sm="12"
                src="https://res.cloudinary.com/tell/image/upload/v1601630210/Untitled_design_62_sjo3y4.png"
                style="padding-left:-400px;padding-right:59px; margin-top:0px; margin-bottom:-130px; height:437px"
                 cover
                 width="50%"
                 class="hidden-md-and-down">

                </v-img>

                <v-col md="5" class="text-center mx-5">
                  <p
                    class="font-weight-black my-6" 
                    style="text-align:left; font-size:50px"
                  >
                    Reset Your Password
                  </p>
              <p style="font-size:16px; text-align:left; margin-top:-20px">
                Enter your email below to reset your password
              </p>
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <br>
                <v-text-field
                  v-model="email"
                  color="black"
                  :rules="emailRules"
                  label="Email"
                  required
                />
              </v-form>

            <v-card-actions>
              <v-spacer />
              <v-btn 
                     rounded
                     large
                     elevation="24"
                     raised
                     :disabled="!valid"
                     :loading="loading"
                     color="#1877f2" 
                     font-size="14px"
                     class="px-5 white--text mb-14"
                     @click="validate"
              >
                Send Email
              </v-btn>
            </v-card-actions>
            <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}
          <v-btn
            color="blue"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  </template>











        
      

<script>
import firebase from 'firebase/app'

export default {
    name: 'ResetPassword',
    data() {
        return {
            user:"",
            loading: false,
            snackbar: false,
            text: '',
            timeout: 2500,

            valid: true,
            lazy: false,
            emailRules: [
                        v => !!v || 'Email address is required',
                        v => /.+@.+\..+/.test(v) || 'Please enter a valid email address',
            ],

            email: '',
        }
    },

    mounted() {
  firebase.auth().onAuthStateChanged(user => {
    this.user = user
    if(!this.user)
    this.$router.push('/login')
  })

},
    methods: {
        validate(){
            this.loading = true
            var auth = firebase.auth()

            if (this.$refs.form.validate()) {

                auth.sendPasswordResetEmail(this.email).then(() => {
                // Email sent.
                    this.text = 'Email sent successfully'
                    this.snackbar = true
                    this.loading = false
                }).catch((error) => {
                    // An error happened.
                    this.text = error.message
                    this.snackbar = true
                    this.loading = false
                })
            }

        }
    },
}
</script>

<style scope>


</style>