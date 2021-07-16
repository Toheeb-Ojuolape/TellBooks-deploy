<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row class="text-center" justify="center">
          <v-col cols="12" sm="6" md="8">
            <v-card class="elevation-24 px-3">
              <v-row>
                <v-img
                  cols="12"
                  md="7"
                  sm="12"
                  src="https://res.cloudinary.com/tell/image/upload/v1602015662/5556_nivy0g.jpg"
                  style="padding-left:-400px;padding-right:59px; margin-top:0px; margin-bottom:-130px; height:330px"
                  cover
                  width="50%"
                  class="hidden-md-and-down"
                >
                </v-img>

                <v-col md="5" class="text-center mx-5">
                  <p
                    class="font-weight-black my-6"
                    style="text-align:left; color:#fa9746; font-size:50px"
                  >
                    Awesome!
                  </p>
                  <p style="font-size:15px; text-align:left; margin-top:-36px">
                    You're a part of the 'No Password Geng'. You can now login
                    only with the click of your social login button!.<br />
                    <br />Please select your country and click the button below
                    to complete registration.
                  </p>
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
                      class="px-5 white--text mb-14"
                      @click="pressed"
                    >
                      Go To Dashboard
                    </v-btn>
                  </v-card-actions>
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
import firebase from "firebase/app";
import db from "../../main";
import slugify from "slugify";

export default {
  name: "Google",
  data() {
    return {
      loading: false,
      text: "",
      timeout: 2500,
      country: "",
      person:"",
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
     window.scrollTo(0, 0);
  },
  methods: {
    pressed() {
      this.loading = true;
      firebase.auth().onAuthStateChanged(user => {
        this.person = user;

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
              user_id: this.person.uid,
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
            this.$router.push("/dashboard");
          });
      });
    }
  },
};
</script>

<style scope></style>
