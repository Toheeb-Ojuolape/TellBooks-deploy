<template>
            <v-card class="pt-7 px-5" flat>
                  <p
                    class="font-weight-black my-7"
                    style="text-align:left; color:#fa9746; font-size:50px"
                  >
                    Awesome!
                  </p>
                  <p style="font-size:15px; text-align:left; margin-top:-36px">
                    You're a part of the 'No Password Geng'. You can now login
                    only with the click of your social login button!.<br />
                    <br />Please select your country and click the button below
                    to complete your registration.
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
                      Continue
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
      currency: [
        { country: "America", code: "USD" },
        { country: "Argentina", code: "ARS" },
        { country: "Australia", code: "AUD" },
        { country: "Burundi", code: "BIF" },
        { country: "Canada", code: "CAD" },
        { country: "Congo", code: "CDF" },
        { country: "Cape Verde", code: "CVE" },
        { country: "Dubai", code: "AED" },
        { country: "Europe", code: "Euro" },
        { country: "England", code: "GBP" },
        { country: "Gambia", code: "GMD" },
        { country: "Ghana", code: "GHS" },
        { country: "Guinea", code: "GNF" },
        { country: "Kenya", code: "KES" },
        { country: "Liberia", code: "LRD" },
        { country: "Malawi", code: "MWK" },
        { country: "Malaysia", code: "MYR" },
        { country: "Mozambique", code: "MZN" },
        { country: "Nigeria", code: "NGN" },
        { country: "Rwanda", code: "RWF" },
        { country: "Sierra Leone", code: "SLL" },
        { country: "Sao Tome", code: "STD" },
        { country: "Saudi Arabia", code: "SAR" },
        { country: "South Africa", code: "ZAR" },
        { country: "Uganda", code: "UGX" },
        { country: "United States of America", code: "USD" },
        { country: "Zambia", code: "ZMW" },
        { country: "Zimbabwe", code: "ZWD" }
      ],
      rules: { required: value => !!value || "Required." }
    };
  },
  methods: {
    pressed() {
      this.loading = true;
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;

        this.slug = slugify(user.displayName, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        db.collection("users")
          .doc(this.slug)
          .set(
            {
              displayName: this.slug,
              user_id: this.user.uid,
              email: this.user.email,
              earnings: "",
              withdrawals: [],
              books: [],
              fullname: "",
              phonenumber: "",
              bio: "I'm about to publish a tellbooks bestseller!",
              currency: this.country,
              tell: "",
              photoURL: this.user.photoURL
            },
            { merge: true }
          )
          .then(() => {
            this.$router.go(-1);
          });
      });
    }
  }
};
</script>

<style scope></style>
