<template>
            <v-card class="pt-7 px-8" flat>
                  <p
                    class="font-weight-black my-7"
                    style="text-align:left; color:#fa9746; font-size:25px"
                  >
                    Incomplete Registration
                  </p>
                  <v-alert v-model="alert" type="error">
               {{ message }}
            </v-alert>
                  <p style="font-size:15px; text-align:left; margin-top:0px">
                   Hi <b>{{person.displayName}}</b><br />
                   <br />

                   We detected that your registration was not complete. This would prevent you from publishing your book on Tell! Books.
                    <br />
                    <br />
                    Please select your country and click the button below
                    to complete your registration.
                  </p>
                  <v-select
                    v-model="country"
                    :items="currency"
                    :item-text="'country'"
                    :item-value="'code'"
                    label="Select Country"
                    color="#f66c1f"
                    outlined
                    style="margin-top:-8px"
                    :rules="[rules.required]"
                    chips
                  ></v-select>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      rounded
                      large
                      elevation="24"
                      raised
                      :loading="loading"
                      color="#f66c1f"
                      font-size="14px"
                      class="px-5 white--text mb-6"
                      @click="pressed"
                    >
                      Complete Registration
                    </v-btn>
                  </v-card-actions>
            </v-card>
</template>

<script>
import firebase from "firebase/app";
import db from "../main";
import slugify from "slugify";

export default {
  name: "SocialSignup",
  data() {
    return {
      loading: false,
      text: "",
      timeout: 2500,
      country: "",
      person:"",
      message:"",
      alert:false,
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
      rules: { required: value => !!value || "Required." }
    };
  },
  created(){
     firebase.auth().onAuthStateChanged(user => {
        this.person= user;
     })
  },
  methods: {
    
    pressed() {
      if(this.country ==""){
      this.alert = true
      this.message = 'Please select your country'
      setTimeout(()=>{
        this.alert = false
      },1500)
    } else{
      this.loading = true;
      firebase.auth().onAuthStateChanged(user => {
        this.person= user;

        this.slug = slugify(this.person.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection("users")
          .doc(this.slug)
          .set(
            {
              displayName: this.slug,
              email: this.person.email,
              earnings: "",
              withdrawals: [],
              books: [],
              fullname: "",
              phonenumber: "",
              bio: "I'm about to publish a tellbooks bestseller!",
              currency: this.country,
              tell: "",
              photoURL: this.person.photoURL
            },
            { merge: true }
          )
          .then(() => {
            location.reload()
          });
      });
    }
    }
  }
};
</script>

<style scope></style>
