<template>
  <v-app>
    <v-main>
      <v-container>
            <v-card flat style="margin:10% auto 10% auto;">
            <v-row no-gutters>
            <v-col class="hidden-md-and-down">
            <v-card flat>
            <v-img src="../../assets/Forgot password-rafiki (1).svg" />
            </v-card>
            </v-col>
                <v-col style="padding:10%">
                <v-btn width="5%" text @click="goBack()">
                <v-icon class="mr-2">mdi-arrow-left</v-icon>
                Back
                </v-btn>
                  <p
                    class="font-weight-black my-6"
                    style="text-align:left; font-size:40px"
                  >
                   Reset Password
                  </p>
                  <p style="font-size:16px; text-align:left; margin-top:-20px">
                    Enter the email associated with your Tell! Books account:
                  </p>
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-text-field
                      v-model="email"
                      color="black"
                      :rules="emailRules"
                      label="Email Address"
                      required
                      outlined
                      style="height:67px;border-radius:8px"
                      
                    />
                  </v-form>

                  
                    <v-spacer />
                    <v-btn
                      elevation="24"
                      x-large
                      block
                      :disabled="!valid"
                      :loading="loading"
                      color="#2d860f"
                      style="font-size:14px;border-radius:8px"
                      class="mt-4 px-5 white--text"
                      @click="validate"
                    >
                      Send Email
                    </v-btn>
                  <v-dialog v-model="success" width="500px" height="500px" :timeout="timeout">
                  <v-card color="#2d860f" style="margin:auto" class="pa-7 text-center">
                  <v-icon size="100px" color="white" fab>mdi-email-check</v-icon>
                  <h2 class="white--text mb-2" style="font-size:22px">{{text}}</h2>
                  <p class="white--text"> Please check your inbox for an email from us </p>
                    <v-btn target="_blank" large color="white" style="color:#2d860f;border-radius:8px" href="https://gmail.com">
                      Open email
                    </v-btn>
                  
                  </v-card>
                
                  </v-dialog>

                  <v-dialog v-model="failure" width="500px" height="500px" :timeout="timeout">
                  <v-card color="red" style="margin:auto" class="pa-7 text-center">
                  <v-icon size="100px" color="white" fab>mdi-close-circle</v-icon>
                  <p class="white--text">Sorry, this email is not associated with any account on Tell! Books </p>
                    <v-btn large color="white" style="color:red;border-radius:8px" @click="failure =! failure">
                      Close
                    </v-btn>
                  
                  </v-card>
                
                  </v-dialog>
                </v-col>
              </v-row>
            </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "ForgotPassword",
  data() {
    return {
      loading: false,
      success: false,
      failure:false,
      person:"",
      text: "",
      timeout: 2500,

      valid: true,
      lazy: false,
      emailRules: [
        v => !!v || "Email address is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email address"
      ],

      email: ""
    };
  },
   created(){
     window.scrollTo(0, 0);
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      this.email = user.email
    });
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    validate() {
      this.loading = true;
      var auth = firebase.auth();

      if (this.$refs.form.validate()) {
        auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            // Email sent.
            this.text = "Email sent successfully";
            this.success = true;
            this.loading = false;
          })
          .catch(error => {
            // An error happened.
            this.text = error.message;
            this.failure = true;
            this.loading = false;
          });
      }
    }
  }
};
</script>


<style scoped>

.resetPassword input{
	margin-bottom: 10px;
	background: #F3F3F3 0% 0% no-repeat padding-box;
	border-radius: 3px;
	border:none;

		width: 95%;
		height: 42px;

		opacity: 1;

		font-size: 15px;
		font-family: Montserrat-Regular;

		padding-left: 10px;
		padding-right: 10px;

}


</style>