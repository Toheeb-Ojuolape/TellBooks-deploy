<template>
  <v-app>
    <v-main style="background:#ffd5d5">
        <v-toolbar flat color="#ffd5d5" class="md-4 hidden-md-and-down ">
          <v-btn
            @click="goBack"
            color="#f66c1f"
            text
            
          >
            <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
          </v-btn>
          <v-toolbar-title
            class="mx-14 my-5 font-weight-bold"
            height="500px"
            style="font-size:22px"
          >
            ChatBooks
          </v-toolbar-title>

          <v-spacer />
         

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
        <v-toolbar color="#ffd5d5" flat class="hidden-lg-and-up">
      <v-btn @click="goBack" style="color:#FF69B4" text>
        <v-icon color="#FF69B4">mdi-chevron-left</v-icon>Back
      </v-btn>

      <v-spacer />
    </v-toolbar>
       <v-form @submit.prevent="find()">
       <v-text-field
            v-model="search"
            rounded
            elevation="24"
            color="#f66c1f"
            label="Search by book title, author or category"
            solo
            prepend-inner-icon="mdi-magnify"
            style="padding-top:100px;max-width:80%;margin:auto auto 60px auto"
          />
          </v-form>
      <v-card flat width="100%" style="border-radius:50px 50px 0px 0;padding-top:70px;padding-bottom:80px">
    
<p
        style="margin-bottom:10px;padding-left:10px;font-size:19px"
        class="font-weight-bold ml-3"
      >
        BestSellers
      </p>
      
      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n">
          <v-skeleton-loader
            type="card"
            v-if="loading"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <p v-if="loading" style="padding-top:40px;margin-bottom:10px;padding-left:10px;font-size:19px"
        class="font-weight-bold ml-3"> New Audiobooks</p>
      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n">
          <v-skeleton-loader
            class="mb-6 mt-4"
            type="image,article"
            v-if="loading"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
        <div class="scrollmenu">
  <div class="carousel" v-for="(b,i) in filteredChat" :key="i">
 <v-card height="220px" width="300px" elevation="18" style="border-radius:20px 20px 20px 0px;padding:40px;padding-top:40px">
  <v-row>
  <div style="float:left;width:50%">
  <v-card height="130px" width="90px" elevation="20">
  <img @click="bookPage(i,b)" :src="b.bookcover" height="130px" width="90px"/>
  </v-card>
  </div>
  <div style="float:left;width:50%">
  <div @click="bookPage(i,b)" v-if="b.title.length < 20" style="text-align:left;font-size:18px" class="font-weight-bold">{{b.title}}</div>
  <div  @click="bookPage(i,b)" v-else style="text-align:left;font-size:18px" class="font-weight-bold">{{b.title.slice(0,20)}}...</div>
  <div style="text-align:left;font-size:16px" class="grey--text">{{b.category}}</div>
  <div style="margin-right:19px;width:1px">
  <v-rating dense  :value="parseFloat(b.rating)" width=1px color="#f6b911" size="14" />
  </div>
  <v-btn :to="`/chatbooks/${b.slug}`" style="float:right;margin-bottom:20px" fab class="pulsingButton" color="#ff69b4"> <v-icon color="white">mdi-message</v-icon></v-btn>
  
  </div>
  </v-row>
  </v-card>
  </div>
  
</div>    
<div v-if="!loading" class="mb-10">
<p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold ml-3"
      >
        New ChatBooks
      </p>
     <!-- <v-btn
        to="/category/audio"
        class="px-3 mb-2 mr-3"
        style="text-decoration:none;font-size:10px;padding:5px;float:right;color:white;margin-top:17px"
        color="#f935a9"
        rounded
        x-small
        >see all</v-btn
      > -->
      </div>
        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n">
            <v-skeleton-loader
              class="mb-6 mt-4 hidden-lg-and-up"
              type="image,article"
              v-if="loading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row no-gutters>
         <p
         cols="12"
         md="4"
         sm="4"
         lg="3"
                style="margin-left:12px;margin-top:25px;margin-bottom:10px"
                v-for="(b, i) in filteredChat"
                :key="i"
              >
                  <v-img
                    :src="b.bookcover"
                    gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,1)"
                    height="210"
                    width="168"
                    style="border-radius:10px;padding-left:9px"
                    @click="bookPage(i, b)">
                  <p v-if="b.title.length > 16" class="white--text font-weight-bold" style="font-size:16px;padding-top:95%;padding-bottom:0;margin-bottom:0"> {{b.title.slice(0,15)}}...</p>
                  <p v-else class="white--text font-weight-bold" style="font-size:16px;padding-top:95%;padding-bottom:0;margin-bottom:0"> {{b.title}}</p>
                  <div class="white--text mb-2" style="font-size:10px">
                  <span> {{b.category}}</span>
                  <span v-if="b.rating != ''" class="white--text pl-3"> <v-icon size="9" style="margin-bottom:2px;margin-right:2px" color="#f5a623">mdi-star</v-icon>{{parseInt(b.rating)}}</span>
                  <span v-else class="white--text pl-3"> <v-icon size="9" style="margin-bottom:2px;margin-right:2px" color="#f5a623">mdi-star</v-icon>0</span>
                  </div>
                  </v-img>
           </p>
        </v-row>

          <v-btn large fixed absolute bottom right style="margin-bottom:100px" fab color="#ff69b4" class="pulsingButton" to="/publish"><v-icon color="white">mdi-plus</v-icon></v-btn>
      </v-card>
    </v-main>
    <BottomMenu />
  </v-app>
</template>

<script>
import BottomMenu from "@/components/BottomMenu";
import { mapGetters } from "vuex"


export default {
  components: {
    BottomMenu,
  },
  data: () => ({
    IDs: [],
    model:null,
    earnings: 0,
    search:"",
    id: [],
    slug: [],
  }),


  computed:{
   ...mapGetters({
     books:"books",
     loading:"loading",
     user:"user"
   }),


   


    filteredChat(){
      return this.books.filter(book => book.filetype == "Chatbooks")
    },
  
      
   
  },

  created() {
    window.scrollTo(0,0);
    this.$store.dispatch('bindBooks')
  },

  methods: {

     find() {
      this.$router.push(`/search?key=${this.search}`);
    },

   bookPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Chat",
        params: { id: book.slug, book: book, bookID: this.bookID },
      });
    },

    

    
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>

.v-btn {
  text-transform: none !important;
}

div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
  height:300px
}

.carousel {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}

.pulsingButton {
  box-shadow: 0 0 0 0 rgba(68, 67, 67, 0.7);
  background-color: black;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 300ms ease-in-out;
}

/* Comment-out to have the button continue to pulse on mouseover */

a.pulsingButton:hover {
  -webkit-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  animation: none;
  color: #ffffff;
}

/* Animation */

@-webkit-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-moz-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-ms-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}
</style>
