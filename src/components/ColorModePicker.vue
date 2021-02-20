<template>
  <div>
    <v-tooltip v-if="!$vuetify.theme.dark" bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="#1877f2" small fab v-on="on" @click="darkMode">
          <v-icon class="mr-1" color="white">
            mdi-moon-waxing-crescent
          </v-icon>
        </v-btn>
      </template>
      <span>Dark Mode Off</span>
    </v-tooltip>

    <v-tooltip v-else bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="#1877f2" small fab v-on="on" @click="darkMode">
          <v-icon color="yellow">
            mdi-white-balance-sunny
          </v-icon>
        </v-btn>
      </template>
      <span>Dark Mode On</span>
    </v-tooltip>
  </div>
</template>

<script>
  export default {
     name: 'ColorModePicker',
   data(){
     return {}
   },
   methods:{
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
   }
  }
</script>