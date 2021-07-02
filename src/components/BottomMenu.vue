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
    <span>Home</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

  

    <v-btn to="/library">
    <span>Library</span>
      <v-icon>mdi-bookshelf</v-icon>
    </v-btn>

    <v-btn to="/shelf">
    <span>Explore</span>
      <v-icon>mdi-compass-outline</v-icon>
    </v-btn>



    <v-btn to="/profile">
    <span>Account</span>
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