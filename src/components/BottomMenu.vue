<template>
  <v-bottom-navigation
  class="hidden-lg-and-up"
    app
    color="#f66c1f"
    fixed
    grow
    dense
  >
    <v-btn to="/dashboard">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

  

    <v-btn to="/library">
      <v-icon>mdi-bookshelf</v-icon>
    </v-btn>

    <v-btn to="/shelf">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn to="/audiobooks">
      <v-icon>mdi-headphones</v-icon>
    </v-btn>


    <v-btn to="/profile">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>


<script>

export default {
    name: 'BottomMenu',
    data() {
        return {
        
        }
    },
    methods:{

    },
    // computed: {
    //   ...mapGetters({
    //   user: "user"
    // }),
    // },
}
</script>

<style scoped>

    .v-item-group.v-bottom-navigation .v-btn.v-size--default {
      height: inherit;
    }
</style>