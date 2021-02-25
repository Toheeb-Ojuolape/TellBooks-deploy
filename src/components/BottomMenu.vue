<template>
<v-container class="hidden-lg-and-up">
  <v-bottom-navigation
    shift
    color="#f66c1f"
    fixed
    style="margin-top:10px"
  >
    <v-btn to="/dashboard">
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

  

    <v-btn to="/library">
      <span>Library</span>
      <v-icon>mdi-bookshelf</v-icon>
    </v-btn>

    <v-btn to="/settings">
      <span>Settings</span>
      <v-icon>mdi-cogs</v-icon>
    </v-btn>

    <v-btn to="/profile">
      <span>Profile</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</v-container>

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