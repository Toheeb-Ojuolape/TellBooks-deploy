<template>
  <v-app v-if="book != null">
  <v-row
      v-touch="{
      left: () => next(),
      right: () => prev(),
    }"
   
   >
    <title-bar
      :ifShow="ifShow"
      :themesList="themesList"
      :navigation="navigation"
      :locationLoaded="locationLoaded"
      @jumpTo="jumpTo"
      @reduceFontSize="setFontSize"
      @addFontSize="setFontSize"
      @setTheme="setTheme"
      @changeFont="setFontFamily"
    />
    <div class="epub">
      <div class="read-wrapper">
        <div id="read"></div>
        <div class="cover">
          <div class="left" @click="prev()"></div>
          <div class="center" @click="toggleTitleAndFootbar()"></div>
          <div class="right" @click="next()"></div>
        </div>
        <v-card color="grey lighten-4" tile class="footer-bar">
          <v-card color="grey lighten-4" tile class="footer-bar hidden-md-and-down">
      <v-toolbar color="black" dense>
      <v-btn color="white" text @click="prev()"><v-icon class="white-text">mdi-chevron-left</v-icon>Previous</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="next()">Next<v-icon color="white">mdi-chevron-right</v-icon></v-btn>
      </v-toolbar>
    </v-card>

      <v-toolbar dense>
        <v-slider
          v-model="progress"
          color="#fa9746"
          thumb-label
          @change="onProgressChange(progress)"
          :max="book.locations.total/3"
        ></v-slider>
      </v-toolbar>
    </v-card>
      </div>
      <v-overlay v-if="book != null" :value="overlay" opacity="1">
        <v-progress-circular
          :rotate="360"
          :size="190"
          :width="20"
          :value="value"
          style="text-align:center;font-size:19px;color:#f66c1f"
        >
          {{ value }}%
        </v-progress-circular>
        <p style="font-size:21px; padding-top:10px;text-align:center">
          Loading your ebook...
        </p>
      </v-overlay>
    </div>

    <v-overlay v-if="book != null" :value="loadingProgress" opacity=1>
      <v-progress-circular
      :size="150"
      :width="10"
      indeterminate
      style="text-align:center;font-size:19px;color:#f66c1f;margin-left:30px"
      ></v-progress-circular>
      <p style="font-size:21px; padding-top:10px;text-align:center">Loading Reading Progress </p>
    </v-overlay>


    <v-dialog v-model="dialog" max-width="500">
      <v-card elevation="24" color="black" class="pa-7 text-center">
        <v-icon size="100px" color="white">mdi-book-open</v-icon>
        <h1
          style="font-size:23px;padding:10px;color:white"
          class="font-weight-black"
        >
          Instructions
        </h1>
        <p style="font-size:15px;color:white">
          Hi. Swipe RIGHT to move to the next page. Swipe LEFT to move to the previous
          page. Tap CENTER to see reading menu.
        </p>
        <v-btn @click="dialog = false" elevation="24"> Ok</v-btn>
      </v-card>
    </v-dialog>
    </v-row>
  </v-app>
  <v-app v-else style="text-align:center">
    <v-content style="background:#f66c1f">
      <h1
        class="font-weight-bold white--text"
        style="margin:20px;font-size:42px;padding-top:270px"
      >
        Sorry, this page does not exist
      </h1>
      <p style="font-size:19px;color:white">
        But you can still find your way back home
      </p>
      <v-btn
        x-large
        elevation="24"
        style="margin-top:30px;font-size:20px;color:#f66c1f"
        to="/shelf"
      >
        Go Home</v-btn
      >
    </v-content>
  </v-app>
</template>

<script type="text/ecmascript-6">
import EPub from "epubjs";
import TitleBar from '@/components/TitleBar';
import db from "../main"
import {mapGetters} from "vuex"
import slugify from "slugify"

export default {
  data() {
    return {
      ifShow: false,
      book:"",
      dialog:false,
      bookName:this.$route.params.id,
      ifShowContent:false,
      loadingProgress:false,
      bookAvailable:true,
      navigation:{},
      progress: 0,
      value:0,
      total:0,
      overlay: true,
      defaultFontSize: 16,
      themesList: [
        {
          name: 'default',
          style: {
            body: {'color': '#000', 'background': '#cee9fe'}
          }
        },
        {
          name: 'eye',
          style: {
            body: {'color': '#000', 'background': '#ceeaba'}
          }
        },
        {
          name: 'night',
          style: {
            body: {'color': '#FFFFFF', 'background': '#000'}
          }
        },
        {
          name: 'white',
          style: {
            body: {'color': '#000', 'background': '#FFFFFF'}
          }
        },
        {
          name: 'tell',
          style: {
            body: {'color': '#000', 'background': '#f66c1f'}
          }
        }
      ],
      defaultTheme: 3,
      defaultFont:"",
      locationLoaded: true,
    };
  },
  components: {
    TitleBar
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    }),
    readerName(){
      return slugify(this.user.data.displayName, {
               replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
      })
    }
  },
created(){
    this.renderBook()
},
  methods: {
      renderBook(){
        let ref= db.collection('books').doc(this.$route.params.id)
        let retrievedData = localStorage.getItem(this.bookName);
        let readingProgress = JSON.parse(retrievedData);
        if (localStorage.getItem(this.bookName) != null){
        this.read = readingProgress[0]
        var url = this.read;
      this.book = new EPub(url);
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      this.overlay = false
      this.loadingProgress = true
      setTimeout(() => (this.loadingProgress = false), 4000)
      this.rendition.display();
      this.themes = this.rendition.themes;
      this.setFontSize(parseFloat(readingProgress[3]));
      this.setFontFamily(readingProgress[4])
      this.registerTheme();
      this.setTheme(parseFloat(readingProgress[5]));
      this.book.ready.then(()=>{
        this.navigation = this.book.navigation;
        return this.book.locations.generate();
   }).then(()=>{
        this.locationLoaded = true;
        this.locations = this.book.locations;
        this.progress= readingProgress[1]
        this.onProgressChange(parseFloat(readingProgress[1]));
      });



     }else{
      ref.get()
      .then(books => {
      this.ebook = books.data()
      this.read = books.data().book
      this.bookID = books.id
      var url = this.read;
      this.book = new EPub(url);
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      this.overlay = true
      setTimeout(() => (this.overlay = false,this.dialog= true), 7000)
      this.rendition.display();
      this.themes = this.rendition.themes;
      this.setFontSize(this.defaultFontSize);
      this.registerTheme();
      this.setTheme(this.defaultTheme);
      this.book.ready.then(()=>{
        this.navigation = this.book.navigation;
        // console.log(this.navigation)
        return this.book.locations.generate();
   }).then(()=>{
        this.locationLoaded = true;
        this.locations = this.book.locations;
        this.onProgressChange(0);
      });
    }).then(() =>{
      if(this.ebook.readers.includes(this.user.data.displayName)){
        this.overlay = true
        setTimeout(() => (this.overlay = false), 7000)
      } else if(this.ebook.readers.includes(this.user.data.uid)){
         this.overlay = true
        setTimeout(() => (this.overlay = false), 7000)
      } else if(this.ebook.author == this.readerName){
         this.overlay = true
         setTimeout(() => (this.overlay = false), 7000)
      } else {
        this.overlay = false
        this.$router.push({name:'Err', params:{id:this.book.slug}})
      }
    })
     }
     },

    jumpTo(href) {
      this.rendition.display(href)
    },

    onProgressChange(progress) {
      const percentage = progress / 100;
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 2;
      this.rendition.display(location);
    },
    registerTheme() {
      this.themesList.forEach((theme)=>{
        this.themes.register(theme.name, theme.style);
      })
    },
    setTheme(idx) {
      this.defaultTheme = idx
      this.themes.select(this.themesList[idx].name);
    },
    prev() {
      this.rendition.prev();
      this.progress = this.progress - 2
    },
    next() {
      this.rendition.next();
      console.log(this.locations.cfiFromPercentage(0.1))
      console.log(this.locations)
      this.progress = this.progress + 1
    },

    

    toggleTitleAndFootbar() {
      this.ifShow = !this.ifShow;
      
    },
    setFontSize(size){
      this.defaultFontSize = size;
      if(this.themes){
        this.themes.fontSize(size + 'px');
      }
    },

    setFontFamily(font){
      this.defaultFont = font
      if(this.themes){
        this.themes.font(font)
      }
    },

    savePage(){
      window.addEventListener("beforeunload", () => {
        if (this.ebook.readers.includes(this.user.data.displayName)) {
              this.total = (this.book.locations.total/3)
              let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
              localStorage.setItem(this.bookName,JSON.stringify(saved))
            } if (this.ebook.readers.includes(this.user.data.uid)) {
             this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            } if (this.ebook.author == this.user.data.displayName) {
              this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            }
      },false )
      
    },

     goBack() {
      this.$router.go(-1);
      if (this.book.readers.includes(this.user.data.displayName)) {
              this.total = (this.book.locations.total/3)
              let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
              localStorage.setItem(this.bookName,JSON.stringify(saved))
            } else if (this.book.readers.includes(this.user.data.uid)) {
             this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            } else if (this.book.author == this.user.data.displayName) {
              this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            }
    },

  },

   mounted() {
    this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)

      this.savePage()
  },

  beforeDestroy(){
    if (this.book.readers.includes(this.user.data.displayName)) {
              this.total = (this.book.locations.total/3)
              let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
              localStorage.setItem(this.bookName,JSON.stringify(saved))
            } else if (this.book.readers.includes(this.user.data.uid)) {
             this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            } else if (this.book.author == this.user.data.displayName) {
              this.total = (this.book.locations.total/3)
    let saved = [this.read,this.progress,this.total,this.defaultFontSize,this.defaultFont,this.defaultTheme]
    localStorage.setItem(this.bookName,JSON.stringify(saved))
            }

  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
.footer-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 9;
  height: px2rem(46);
  background: #fff;
  display: flex;
  &.border-shadow {
    box-shadow: 0 px2rem(-8) px2rem(8) #c0c0c0;
  }
  .icon-wrapper {
    flex: 1 0 auto;
    @include center();
    font-size: px2rem(18);
  }
}
.read-wrapper {
  position: relative;
}
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  z-index: 1;
}
.left {
  flex: 0 0 px2rem(100);
}
.center {
  flex: auto;
}
.right {
  flex: 0 0 px2rem(100);
}
</style>
