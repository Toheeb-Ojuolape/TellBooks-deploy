<template>
  <v-app>
  <v-main class="hidden-sm-and-down">
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
    <v-card flat>
      <v-toolbar flat class="md-4 hidden-sm-and-down">
        <v-btn
          text
          @click="goBack"
        
          color="#f66c1f"
        >
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          flat
          class="mx-14 my-5 font-weight-black"
          height="500px"
          style="font-size:22px"
        >
          Wallet
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
    <v-container style="margin:auto 13% 0px 13%">
      <v-card
        elevation="24"
        class="blueGradient text-center justify-center py-11"
        width="500px"
      >
        <h1
          style="text-align:center; color:white;font-size:46px;padding-top:20px"
        >
          Wallet
        </h1>
        <v-spacer />
        <h4
          class="caption white--text"
          style="text-align:center;font-size:14px"
        >
          Your earnings:
        </h4>
        <h1 class="white--text" style="text-align:center;font-size:30px">
          {{ writer.currency }} {{ earnings - totalWithdrawals }}
        </h1>
        <v-card-actions class="justify-center" style="text-align:center">
          <v-btn
            class="justify-center"
            style="text-align:center"
            @click="withdrawal = true"
          >
            Request withdrawal
          </v-btn>
        </v-card-actions>
      </v-card>
      <p style="font-size:12px;margin-left:2px;margin:10px;color:#022b69">
        *Please note that withdrawal to bank account incurs
        <span class="font-weight-bold">2.5% of withdrawn amount</span><br> as
        processing and transfer charges
      </p>
    </v-container>
    <v-dialog v-if="earnings > 0" max-width="500" v-model="withdrawal">
      <v-card elevation="24" class="pa-8" :loading="loading">
        <v-form>
          <v-text-field
            v-model="amount"
            label="How much would you like to withdraw?"
            color="#1877f2"
            prepend-inner-icon="mdi-cash"
            type="number"
          />
          <v-text-field
            v-model="bank"
            label="Bank Name"
            color="#1877f2"
            prepend-inner-icon="mdi-bank"
          />
          <v-text-field
            v-model="accountnumber"
            label="Account number?"
            color="#1877f2"
            type="number"
            prepend-inner-icon="mdi-account-circle"
          />

          <v-btn
            @click="withdraw"
            color="#1877f2"
            class="white--text"
            :disabled="accountnumber == ''"
            :loading="loading"
            >Withdraw</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-else v-model="withdrawal" max-width="500">
      <v-card elevation="24" color="red" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-close-circle</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-black"
        >
          No available balance
        </h1>
        <p style="font-size:15px;color:white">
          Sorry, {{ user.displayName }}, you cannot request withdrawal because
          you have no money in your wallet.
        </p>
        <v-btn @click="withdrawal = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="success" max-width="500">
      <v-card elevation="24" color="#1877f2" class="pa-7 text-center">
        <v-icon size="100px" color="white"
          >mdi-checkbox-multiple-marked-circle-outline</v-icon
        >
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-black"
        >
          Withdrawal request successful!
        </h1>
        <p style="font-size:15px;color:white">
          Your payment request has been received and is currently being
          processed. You should receive payment in less than
          <span class="font-weight-black">36 hours.</span>
        </p>
        <v-btn @click="success = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
     </div>
    </v-col>
    </v-row>
    </v-main>

    <!-- Mobile view -->
    <v-main class="hidden-md-and-up">
    <v-toolbar flat class="md-4 hidden-md-and-up" color="white">
        <v-btn @click="goBack" style="color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />

        <v-btn fab text to="/shelf">
          <v-icon class="green--text">mdi-magnify</v-icon>
        </v-btn>

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class=" mr-5"
          style="font-size:15px;color:white"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>
      <v-container style="text-align:center">
      <v-card
        elevation="24"
        class="blueGradient text-center justify-center py-11"
        width="500px"
      >
        <h1
          style="text-align:center; color:white;font-size:46px;padding-top:20px"
        >
          Wallet
        </h1>
        <v-spacer />
        <h4
          class="caption white--text"
          style="text-align:center;font-size:14px"
        >
          Your earnings:
        </h4>
        <h1 class="white--text" style="text-align:center;font-size:30px">
          {{ writer.currency }} {{ earnings - totalWithdrawals }}
        </h1>
        <v-card-actions class="justify-center" style="text-align:center">
          <v-btn
            class="justify-center"
            style="text-align:center"
            @click="withdrawal = true"
          >
            Request withdrawal
          </v-btn>
        </v-card-actions>
      </v-card>
      <p style="font-size:12px;margin-left:2px;margin:10px;color:#022b69">
        *Please note that withdrawal to bank account incurs
        <span class="font-weight-bold">2.5% of withdrawn amount</span> as
        processing and transfer charges
      </p>
    </v-container>
    
    
    
    </v-main>
    <BottomMenu class="hidden-md-and-up" />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import db from "../main";
import NavBar from "@/components/NavBar";
import slugify from "slugify";
import BottomMenu from "@/components/BottomMenu";
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Loadscript from "vue-plugin-load-script";
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    BottomMenu,
  },
  data() {
    return {
      person: "",
      sales: [],
      earnings: 0,
      books: [],
      author: "",
      name: "",
      currency: "",
      withdrawal: false,
      amount: null,
      bank: "",
      loading: false,
      accountnumber: "",
      text: "",
      snackbar: "",
      timeout: 2000,
      success: false,
      writer: "",
      totalWithdrawals: 0,
      cardloading: true,
    };
  },

  computed:{
    ...mapGetters({
      user:'user'
    })
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      if (!this.person) this.$router.push("/login");
    });
  },

  created() {
    this.loading = true;
      this.author = slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });

      db.collection("books")
        .where("author", "==", this.author)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.books.push(doc.data());
            this.currency = doc.data().currency;
            this.price = doc.data().price;
            this.reads = doc.data().readers.length;
            this.earnings +=
              (0.9 * (doc.data().price * doc.data().readers.length)) / 10;
          });
        })
        .then(() => {
          db.collection("users")
            .doc(this.author)
            .get()
            .then((writer) => {
              this.writer = writer.data();
              this.totalWithdrawals = this.writer.withdrawals.reduce(function(
                a,
                b
              ) {
                return a + b;
              },
              0);
            });
        })
        .then(() => {
          this.loading = false;
        });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    withdraw() {
      Vue.loadScript("https://smtpjs.com/v3/smtp.js")
        .then(() => {
          // eslint-disable-next-line no-undef
          Email.send({
            SecureToken: "ac498295-32fa-4869-839c-42afcca0ca2b",
            To: `toheebojuolape7@gmail.com`,
            From: `Teniola from Tell! Books | books@tell.africa`,
            Subject: `${this.user.data.displayName} would like to withdraw ${this.writer.currency} ${this.amount}`,
            Body: `<h1> ${this.user.data.displayName} would like to withdraw ${this.writer.currency} ${this.amount}.</h1>
              
              <p>Account details are Bank Name= ${this.bank} , Account Number= ${this.accountnumber} </p>`,
          });
        })
        .then(() => {
          // eslint-disable-next-line no-undef
          Email.send({
            SecureToken: "ac498295-32fa-4869-839c-42afcca0ca2b",
            To: `${this.user.data.email}`,
            From: `Teniola from Tell! Books | books@tell.africa`,
            Subject: `Withdrawal request of ${this.writer.currency} ${this.amount} received!`,
            Body: `<div style="color: #444444; font-weight: normal;">
  <div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Source Sans Pro,Source Sans Serif; font-size: 15px; color: #666;">
  <div style="color: #444444; font-weight: normal;">
  <div style="font-weight: 400; font-size: 15px; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; border-bottom: 3px solid #eeeeee; margin-bottom: 1em;">
  <p style="color: #444444;text-align:center"><img class="alignnone wp-image-27004" src="https://tell.africa/wp-content/uploads/2019/03/Webp.net-resizeimage-3.png" alt="" width="40" height="40" /></p>
  <p style="text-align: left;">1 min read |</p>
  
  <h2 style="color: #666666; text-align: left;"><span style="color: #000000;">Hi ${this.user.data.displayName}<strong>,</strong></span></h2>
  <p style="text-align: left;">Your request to withdraw ${this.writer.currency} ${this.amount} into your ${this.bank} account with Account Number:${this.accountnumber} is currently being processed.</p>
  
  
  
  
  
  <p style="color: #ffffff;">.</p><p>If you would like to cancel this transaction, send us an email at <a href="mailto:books@tell.africa">books@tell.africa </a>or send us a message on WhatsApp by clicking the button below:</p> <br>
  
  <p style="text-align: center;"><span style="color: #000000;"><strong><span style="color: #ffffff;"><a style="background:#1877f2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="https://api.whatsapp.com/send?phone=2348167299743&amp;text=Hi%20tellbooks.%20I%20need%20to%20talk%20to%20a%20customer%20support%20representative.%20My%20name%20is%20">WhatsApp Us</a></span></strong></span></p>
  
  &nbsp;
  <div style="color: #666666; font-weight: normal;"><span style="color: #ffffff;">.</span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Kind Regards 💙, </span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Teniola</span></div>
  <div style="color: #666666; text-align: left; font-size:13px"><span style="font-size:12px; color: #000000;"><i>Customer Happiness Rep @ tellbooks</i></span></div>
  <div style="color: #666666; font-weight: normal;"></div>
  <div style="font-weight: normal;"></div>
  <div style="color: #666666;">
  <div style="max-width: 560px; padding: 0px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
  <div style="border-bottom: 3px solid #eeeeee;">
  <div style="color: black; background:#1877f2;">
  <div style="background-color:#1877f2; color: black; text-align: center; padding: 30px 20px 90px 30px;">
  <p style="text-align: center; color: white;"><span style="color: #ffffff;"><strong>Follow us on Social Media:</strong></span></p>
  <p style="text-align: center; color: white;"><span style="color: #000000;"><a style="color: #000000;" href="https://facebook.com/tell.com.ng"><img class="alignnone wp-image-28420" src="https://www.tell.com.ng/wp-content/uploads/2019/08/facebook-1.png" alt="" width="22" height="22" /></a><a style="color: #000000;" href="https://twitter.com/telldotafrica"><img class="alignnone wp-image-28421" src="https://www.tell.com.ng/wp-content/uploads/2019/08/twitter-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://instagram.com/tell.africa"><img class="alignnone wp-image-28422" src="https://www.tell.com.ng/wp-content/uploads/2019/08/instagram-1.png" alt="" width="21" height="21" /></a> <a style="color: #000000;" href="https://linkedin.com/company/tellafrica"><img class="alignnone wp-image-28423" src="https://www.tell.com.ng/wp-content/uploads/2019/08/linkedin-1.png" alt="" width="21" height="21" /></a> <a style="color: #000000;" href="https://youtu.be/4L3b6L3eL6g"><img class="alignnone wp-image-28424" src="https://www.tell.com.ng/wp-content/uploads/2019/08/youtube.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://api.whatsapp.com/send?phone=2348167299743"><img class="alignnone wp-image-28425" src="https://www.tell.com.ng/wp-content/uploads/2019/08/whatsapp-1.png" alt="" width="22" height="22" /></a></span></p>
  
  <div style="color: white; text-align: center;"><span style="color: #ffffff;"><a style="color: #ffffff;" href="https://tell.africa/about">About Us</a> <a style="color: #ffffff;" href="https://www.tell.africa/anonymous/">| Write Anonymously</a> <a style="color: #ffffff;" href="https://www.tell.africa/hire">| Find Writers</a><a style="color: #ffffff;" href="https://www.tell.africa/column/">| Create A Column.</a></span></div>
  <div></div>
  <div style="color: white; text-align: center;"><span style="color: #1877f2;">.</span></div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`,
          });
        })
        .then(() => {
          db.collection("users")
            .doc(this.author)
            .update({
              withdrawals: firebase.firestore.FieldValue.arrayUnion(
                parseFloat(this.amount)
              ),
              earnings: this.earnings - this.totalWithdrawals - this.amount,
            });
        })
        .then(() => {
          this.loading = false;
          this.withdrawal = false;
          this.success = true;
        })
        .catch(() => {
          this.text = "Error requesting for payout. Please try later";
          this.snackbar = true;
        });
    },
  },
};
</script>


<style scoped>
.blueGradient{
background-color: #4d5dfb;
background-image: linear-gradient(315deg, #1877f2 0%, #2663ac 100%);
}

</style>
