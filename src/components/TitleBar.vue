<template>
  <transition name="slide-down">
    <v-card color="grey lighten-4" tile class="title-bar" v-if="ifShow">
      <v-toolbar dense>
        <v-btn style="margin-left:-11px" icon @click="goBack()"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <div style="margin-left:-10px">
        <v-dialog fullscreen v-model="ifShowContent">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="black--text" v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </template>
          <transition name="slide-left">
            <v-card
              v-if="ifShowContent && bookAvailable"
              style="padding:10px"
              height
            >
              <v-navigation-drawer v-model="ifShowContent" absolute temporary>
                <v-list nav dense>
                  <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                  >
                    <template v-for="(item, index) in navigation.toc">
                      <v-list-item color="#fa9746" :key="index">
                        <v-list-item-title
                          color="#fa9746"
                          @click="jumpTo(item.href)"
                          >{{ item.label }}</v-list-item-title
                        >
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </transition>
        </v-dialog>
        </div>

        <v-spacer></v-spacer>

        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="black--text" v-bind="attrs" v-on="on">
                <v-icon>Aa</v-icon>
              </v-btn>
            </template>

            <v-card style="padding:30px; text-align:center">
            <div style="text-align:center">
            <p style="font-size:16px">Font size</p>
            <div class='row'>
            <div class="column">
            <v-btn fab small @click="reduceFontSize(fontSize--)">a</v-btn>
            </div>
            <div class="column2">
            <v-text-field color="#fa9746" solo v-model="fontSize" style="font-size:16px;text-align:center"></v-text-field>
            </div>
            <div class="column">
            <v-btn fab small @click="addFontSize(fontSize++)">A</v-btn>
            </div>
            </div>
            </div>

            <p style="font-size:16px">Font type</p>
            <v-select
                      v-model="fontType"
                      :items="fonts"
                      :item-text="'name'"
                      :item-value="'value'"
                      label="Select Font type"
                      @change="changeFont(fontType)"
                      style="margin-top:15px;margin-bottom:10px;font-size:14px"
                      color="#fa9746"
                      filled
                      height=15
                     ></v-select>

            <p style="font-size:16px">Choose Theme</p>
             <div style="text-align:center">
            <v-row>
       <v-col md="8" sm="6" xs="6">
       <v-row>
       <p v-for="(item, index) in themesList" :key="index" style="text-align:center;margin-left:10px;margin-top:19px;margin-bottom:22px">
       <v-btn class="text-center" fab @click="setTheme(index)" small :style="item.style.body"></v-btn>
       </p>
       </v-row>
       </v-col>
          </v-row>
          </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#fa9746" outlined @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <v-btn icon :color="color" @click="bookmark()">
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        v-for="(item,i) in items"
        :key="i"
        >
          <v-list-item-title>
          <v-btn text :to="item.link"> 
          <v-icon color="#f66c1f" style="margin:5px">{{item.icon}}</v-icon>{{item.title}}
          </v-btn>
        </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-toolbar>
    </v-card>
  </transition>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'TitleBar',
  data() {
    return {
      bookName: this.$route.params.id,
      dialog: false,
      group:null,
      fontSize:16,
      fontType:"",
      color:"#262a41",
      ifShowContent: false,
      bookAvailable:true,
      fonts:[
               {name:'Times New Roman',value:'Times New Roman'},
               {name:'Arial',value:'Arial'},
               {name:'Verdana',value:'Verdana'},
               {name:'Garamond',value:'Garamond'},
               {name:'Georgia',value:'Georgia'},
               {name:'Tahoma',value:'Tahoma'},
                ],
      items: [
        { title: 'Gift Book',link:"/books/" + this.$route.params.id, icon:"mdi-gift" },
        { title: 'Rate Book', link:"/books/" + this.$route.params.id, icon:"mdi-star" },
        { title: 'Go to Library',link:"/library",icon:"mdi-bookshelf" },
      ],
    };
  },
  props:{
    ifShow: {
      type: Boolean,
      default: false
    },
    defaultFontSize: {
      type: Number,
      default:16
    },
    themesList: Array,
    defaultTheme: Number,
    locationLoaded: Boolean,
    navigation: Object
  },
  computed: {},
  mounted() {},
  methods: {
     goBack(){
      this.$router.go(-1)
    },
   reduceFontSize(size){
       this.$emit('reduceFontSize', size)
   },
  addFontSize(size){
       this.$emit('addFontSize', size)

   },
   setTheme(index) {
      this.$emit("setTheme", index);
      this.dialog= false
    },

    changeFont(fontType){
      this.$emit('changeFont',fontType)
    },
    jumpTo(href){
      this.$emit("jumpTo",href)
      this.ifShowContent = false
    },
    bookmark(){
      this.color="#fa9746"
    }
     
    

  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global.scss";

.v-btn {
  text-transform: none !important;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}


.column {
  text-align:center;
  width:20%;
  margin-top:10px;
}
.column2 {
  text-align:center;
  width:50%;
  margin-left:5px;
  margin-right:5px;
  margin-top:10px;
}

.column3 {
  float:left;
  width:15%;
  margin-top:10px;
  margin-left:10px
}



.title-bar {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  // @include center();
  z-index: 9;
  height: px2rem(46);
  box-shadow: 0 px2rem(8) px2rem(8) #c0c0c0;
  background: #fff;
  display: flex;
  .back {
    flex: 0 0 px2rem(46);
    @include center();
    .icon-back {
      font-size: px2rem(18);
    }
  }
  .right {
    flex: 1;
    @include center();
    justify-content: flex-end;
    .icon-wrapper {
      width: px2rem(46);
      height: px2rem(46);
      @include center();
      font-size: px2rem(18);
    }
  }
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s;
}
.slide-down-enter,
.slide-down-leave-to {
  transform: translate3d(0, px2rem(-100), 0);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translate3d(0, 0, 0);
}
</style>
