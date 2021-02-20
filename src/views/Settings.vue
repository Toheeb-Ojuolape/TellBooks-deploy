<template>
  <v-app>
    <html class="dark-mode">
      <v-card>
        <v-toolbar class="md-4 hidden-md-and-down ">
          <v-btn
            @click="goBack"
            class="ml-16"
            color="#f66c1f"
            style="color:white"
          >
            <v-icon color="white">mdi-chevron-left</v-icon>Back
          </v-btn>
          <v-toolbar-title
            class="mx-14 my-5 font-weight-black"
            height="500px"
            style="font-size:22px"
          >
            Settings
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

        <v-toolbar class="md-4 hidden-lg-and-up" color="white">
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
      </v-card>
      <NavBar />
      <v-container style="margin-bottom:20px">
        <v-row>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            class="pa-5 justify-center mt-7 px-10"
            style="text-align:center;margin-left:70px;margin-right:80px"
          >
            <v-card-text style="font-size:16px;color:black"
              >Choose Theme</v-card-text
            >
            <ColorModePicker style="margin-left:10px" />
          </v-card>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            @click="support = true"
            class="pa-5 px-11 justify-center mt-7"
            style="text-align:center;margin-left:80px;margin-right:80px"
          >
            <v-card-text
              style="font-size:16px;color:black"
              @click="support = true"
              >Customer Support</v-card-text
            >
            <v-btn fab color="#0066f5"
              ><v-icon color="white" @click="support = true"
                >mdi-headset</v-icon
              ></v-btn
            >
          </v-card>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            class="pa-5 justify-center mt-7"
            to="/reset-password"
            style="text-align:center;margin-left:80px;margin-right:80px"
          >
            <v-card-text style="font-size:16px;color:black" to="/reset-password"
              >Change Password</v-card-text
            >
            <v-btn fab color="#0066f5"
              ><v-icon color="white" to="/reset-password">
                mdi-lock</v-icon
              ></v-btn
            >
          </v-card>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            size="1000px"
            class="pa-5 px-14 justify-center mt-7"
            to="/wallet"
            style="text-align:center;margin-left:75px;margin-right:80px"
          >
            <v-card-text style="font-size:16px;color:black" to="/wallet"
              >My Wallet</v-card-text
            >
            <v-btn fab color="#0066f5"
              ><v-icon color="white" to="/wallet">
                mdi-cash-multiple</v-icon
              ></v-btn
            >
          </v-card>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            class="px-11 py-4 justify-center mt-7"
            @click="inviteFriends = true"
            style="text-align:center;margin-left:80px;margin-right:80px"
          >
            <v-card-text
              style="font-size:16px;color:black"
              @click="inviteFriends = true"
              >Invite Your Friends</v-card-text
            >
            <v-btn fab color="#0066f5"
              ><v-icon color="white" @click="inviteFriends = true">
                mdi-share-variant</v-icon
              ></v-btn
            >
          </v-card>
          <v-card
            cols="12"
            md="3"
            sm="3"
            lg="3"
            xs="3"
            class="pa-5 justify-center mt-7 px-15"
            @click="signout"
            style="text-align:center;margin-left:80px;margin-right:80px"
          >
            <v-card-text style="font-size:16px;color:black" @click="signout"
              >Logout</v-card-text
            >
            <v-btn fab color="#0066f5"
              ><v-icon color="white" @click="signout">
                mdi-logout</v-icon
              ></v-btn
            >
          </v-card>
        </v-row>
      </v-container>

      <v-dialog max-width="300" max-height="500" v-model="inviteFriends">
        <v-card class="pa-12 text-center" justify="center">
          <v-btn
            dark
            fab
            small
            color="#1773ea"
            :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
            target="_blank"
            right
            bottom
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            small
            color="green"
            :href="
              `https://wa.me/?text=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
            right
            bottom
            style="margin-left:10px"
          >
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            small
            color="#1da1f2"
            :href="
              `https://twitter.com/intent/tweet?text=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
            right
            bottom
            style="margin-left:10px"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>

          <v-btn
            dark
            fab
            color="#2663ac"
            small
            :href="
              `https://www.linkedin.com/shareArticle?mini=true&title=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
            right
            bottom
            style="margin-left:10px"
          >
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-card>
      </v-dialog>

      <v-dialog max-width="300" max-height="500" v-model="support">
        <v-card class="pa-4 text-center pb-8" tile justify="center">
          <p class="px-3" style="font-size:14px">
            Contact our Customer Happiness Representative using any of the
            options below:
          </p>

          <v-btn
            dark
            fab
            large
            color="green"
            :href="
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20need%20to%20speak%20to%20a%20customer%20representative.%20My%20name%20is%20${user.displayName}`
            "
            target="_blank"
            right
            bottom
            style="margin-left:10px"
          >
            <v-icon large>mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            large
            color="#1da1f2"
            href="mailto:books@tell.africa?subject=Request for Support &body=Hi tellbooks, I would like to request for support on the following issue: "
            target="_blank"
            right
            bottom
            style="margin-left:10px"
          >
            <v-icon large>mdi-email</v-icon>
          </v-btn>
        </v-card>
        <v-btn
          @click="support = false"
          color="#1877f2"
          class="white--text"
          tile
        >
          Close</v-btn
        >
      </v-dialog>
    </html>
    <BottomMenu />
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import ColorModePicker from "@/components/ColorModePicker";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";


export default {
  components: {
    ColorModePicker,
    NavBar,
    BottomMenu
  },
  data() {
    return {
      user: "",
      inviteFriends: false,
      pageUrl: "https://books.tell.africa/signup",
      support: false
    };
  },

  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(result => {
          console.log(result);
          this.user = "";
          this.$router.push("/");
        });
    },

    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (!this.user) this.$router.push("/login");
    });
  }
};
</script>

<style scope></style>
