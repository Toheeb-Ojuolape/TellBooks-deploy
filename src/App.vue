<template>
  <v-app>
    <router-view :key="$route.fullPath"></router-view>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  metaInfo() {
    return{
    title: 'African Book Publishing platform',
    titleTemplate: ' Tell! Books | %s',
     meta: [
                { name: 'description', content:  'Tell! Books provides a medium for young African creatives to seamlessly publish, monetize and distribute their creative works online'},
                { property: 'og:title', content: "Tell! Books | African Book Publishing platform"},
                { property: 'og:site_name', content: 'Tell! Books'},
                {property: 'og:type', content: 'website'},    
                {name: 'robots', content: 'index,follow'} 
            ]
  }
  },

  components: {
  },

  data: () => ({
    //
  }),
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
    if (JSON.parse(localStorage.getItem('nightmode')) == true){
       this.$vuetify.theme.dark = true
    } else{
       this.$vuetify.theme.dark = false
    }
  }
};
</script>
