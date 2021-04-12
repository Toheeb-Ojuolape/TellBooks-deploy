<template>
  <v-app v-if="userData != undefined">
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
          {{ theauthorName }}
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
    <!-- Desktop view -->
    <v-container class="hidden-md-and-down">
      <v-row>
        <v-card
          absolute
          cols="12"
          md="5"
          sm="6"
          xs="6"
          style="margin-top:40px;"
          width="25%"
        >
          <v-avatar
            height="100"
            width="100"
            style="margin-left:100px;margin-top:50px"
            @click="cover = true"
          >
            <img
              style="border-radius:100px;text-align:center"
              :src="userData.photoURL"
            />
          </v-avatar>
          <v-skeleton-loader
            type="image"
            style="margin-top:-150px"
            v-if="loading"
          >
          </v-skeleton-loader>
          <h2
            class="font-weight-bold"
            style="font-size:18px;text-align:center;margin-top:5px"
          >
            {{ userData.fullname }}
          </h2>
          <p style="font-size:15px;text-align:center">@{{ authorName }}</p>
          <v-btn
            v-if="userData.tell != ''"
            rounded
            outlined
            @click="followTell"
            style="margin-left:107px;margin-right:30px;margin-bottom:10px"
            color="blue"
            >Follow</v-btn
          >
          <p
            class="subtitle"
            style="font-size:15px;text-align:center;margin-bottom:40px;padding-left:12px;padding-right:12px"
          >
            Author bio:<br />

            {{ userData.bio }}
          </p>
          <v-skeleton-loader
            type="list-item-two-line"
            style="margin-top:-150px"
            v-if="loading"
          >
          </v-skeleton-loader>

          <v-btn
            small
            fab
            @click="sendMail"
            style="margin-left:94px;margin-bottom:-14px"
            ><v-icon>mdi-email-outline</v-icon></v-btn
          >
          <v-btn
            v-if="userData.phonenumber != ''"
            small
            fab
            color="#48c857"
            @click="messageWhatsapp"
            style="margin-bottom:-14px"
            ><v-icon color="white">mdi-whatsapp</v-icon></v-btn
          >
          <v-btn
            v-if="userData.tell != ''"
            small
            fab
            color="#e00000"
            @click="followTell"
            style="margin-bottom:-14px"
            ><v-icon color="white">mdi-share-variant</v-icon></v-btn
          >
        </v-card>
        <v-col md="7" sm="6" xs="6">
          <v-card style="margin-top:30px;margin-left:30px" width="100%">
            <p style="font-size:17px;padding:20px">{{ theauthorName }}'s books</p>
            <v-progress-linear
              value="70%"
              color="#f66c1f"
              style="margin-top:-10px"
            >
            </v-progress-linear>
          </v-card>
          <v-row>
            <p
              cols="12"
              md="3"
              sm="3"
              xs="3"
              lg="3"
              style="margin-left:42px;margin-top:25px"
              v-for="(b, i) in filteredBooks"
              :key="i"
            >
              <v-card elevation="24" height="250" width="170">
               <v-img
                  v-if="b.filetype == 'Audio'"
                  :src="b.bookcover"
                  height="250"
                  width="170"
                  @click="audioPage(i, b)"
                />
                <v-img
                  v-if="b.filetype == 'Pdf' || b.filetype =='Epub'"
                  :src="b.bookcover"
                  height="250"
                  width="170"
                  @click="bookPage(i, b)"
                />
                <v-img
                  v-if="b.filetype == 'Chat'"
                  :src="b.bookcover"
                  height="250"
                  width="170"
                  @click="chatPage(i, b)"
                />
              </v-card>
            </p>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- Mobile view -->
    <v-container class="hidden-lg-and-up">
      <v-card style="margin-top:40px;">
        <div style="text-align:center">
          <v-avatar
            height="100"
            width="100"
            style="margin-top:50px"
            @click="cover = true"
          >
            <img style="border-radius:60px" :src="userData.photoURL" />
          </v-avatar>

          <v-skeleton-loader
            type="image,sentences"
            style="margin-top:-150px"
            v-if="loading"
          >
          </v-skeleton-loader>
          <h2
            class="font-weight-bold"
            style="font-size:18px;text-align:center;margin-top:5px"
          >
            {{ userData.fullname }}
          </h2>
          <p style="font-size:13px;text-align:center">
            @{{ userData.displayName }}
          </p>
          <v-btn
            v-if="userData.tell != ''"
            rounded
            outlined
            @click="followTell"
            style="margin-bottom:10px"
            color="blue"
            >Follow</v-btn
          >
          <p
            class="subtitle"
            style="font-size:15px;text-align:center;margin-bottom:40px;padding-left:12px;padding-right:12px"
          >
            Author bio:<br />
            {{ userData.bio }}
          </p>
          <v-btn small fab @click="sendMail" style="margin-bottom:-14px"
            ><v-icon>mdi-email-outline</v-icon></v-btn
          >
          <v-btn
            v-if="userData.phonenumber != ''"
            small
            fab
            color="#48c857"
            @click="messageWhatsapp"
            style="margin-bottom:-14px"
            ><v-icon color="white">mdi-whatsapp</v-icon></v-btn
          >
          <v-btn
            v-if="userData.tell != ''"
            small
            fab
            color="#e00000"
            @click="followTell"
            style="margin-bottom:-14px"
            ><v-icon color="white">mdi-share-variant</v-icon></v-btn
          >
        </div>
      </v-card>
      <v-card style="margin-top:60px;margin-bottom:30px" width="100%">
        <p style="font-size:17px;padding:20px">{{ theauthorName }}'s books</p>
        <v-progress-linear value="70%" color="#f66c1f" style="margin-top:-10px">
        </v-progress-linear>
      </v-card>
      <v-row style="margin-bottom:70px">
        <p
          cols="12"
          md="3"
          sm="3"
          xs="3"
          lg="3"
          style="margin-top:10px;margin-bottom:10px"
          v-for="(b, i) in filteredBooks"
          :key="i"
        >
          <v-card elevation="24" height="190" width="120" class="mx-3">
            <v-img
              v-if="b.filetype == 'Chatbook'"
              :src="b.bookcover"
              height="190"
              width="120"
              @click="chatPage(i, b)"
            />
            <v-img
              v-if="b.filetype == 'Audio'"
              :src="b.bookcover"
              height="190"
              width="120"
              @click="audioPage(i, b)"
            />
            <v-img
              v-if="b.filetype =='Pdf' || b.filetype =='Epub'"
              :src="b.bookcover"
              height="190"
              width="120"
              @click="bookPage(i, b)"
            />
          </v-card>
        </p>
      </v-row>
      <BottomMenu style="margin-top:30px" />
    </v-container>
  </v-app>
  <v-app v-else style="text-align:center">
    <v-content style="background:#f66c1f">
      <h1
        class="font-weight-bold white--text"
        style="margin:20px;font-size:42px;padding-top:270px"
      >
        Sorry, this user does not exist
      </h1>
      <p style="font-size:19px;color:white;margin:20px">
        But you can still find your way back home
      </p>
      <v-btn
        x-large
        color="white"
        elevation="24"
        style="margin-top:30px;margin-bottom:100px"
        to="/shelf"
      >
        Go Home</v-btn
      >
    </v-content>
  </v-app>
</template>

<script>
import db from "../main";
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import { mapGetters } from "vuex"
import { unslugify } from "unslugify";

export default {
  components: {
    NavBar,
    BottomMenu
  },

  data() {
    return {
      userData: "",
      user: "",
      IDs: [],
      authorName: this.$route.params.id,
    };
  },

   metaInfo() {
    return {
      title: `${this.userData.displayName}`,
      titleTemplate: "%s | Tell! Books ",
      meta: [
                { name: 'description', content: 'Connect and follow' + this.userData.displayName + ' on Tell! Books | Top Online African Book publishing platform' },
                { property: 'og:title', content: this.userData.displayName + ' | Tell! Books'},
                { property: 'og:site_name', content: 'Tell! Books'},
                { property: 'og:description', content: 'Connect and follow ' + this.userData.displayName + ' on Tell! Books | Top Online African Book publishing platform '},
                {property: 'og:type', content: 'profile'},
                {property: 'og:url', content: 'https://books.tell.africa/' + this.userData.fullname},
                {property: 'og:image', content:this.userData.photoURL}    
            ]
    };
  },

  computed:{
    ...mapGetters({
      books:"books",
      loading:"loading"
    }),

    filteredBooks(){
      return this.books.filter(book => book.author == this.$route.params.id)
    },
   theauthorName(){
     return unslugify(this.$route.params.id)
   }
    

  },

  created() {
    this.$store.dispatch('bindBooks')
    
    db
      .collection("users")
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.userData = user.data();
      })
      
  },

  methods: {
    messageWhatsapp() {
      window.open("https://wa.me/" + this.userData.phonenumber);
    },
    followTell() {
      window.open(this.userData.tell);
    },
    sendMail() {
      window.open("mailto:" + this.userData.email);
    },
    bookPage(i, b) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Books",
        params: { id: b.slug, book: b, bookID: this.bookID }
      });
    },
    chatPage(i, b) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Chat",
        params: { id: b.slug, book: b, bookID: this.bookID }
      });
    },
    audioPage(i, b) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Audio",
        params: { id: b.slug, book: b, bookID: this.bookID }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
