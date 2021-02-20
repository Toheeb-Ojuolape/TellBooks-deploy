<template>
<v-card>
    <v-toolbar class="md-4 hidden-md-and-down ">
      <v-toolbar-title class="mx-14 my-5" height="500px" style="font-size:17px">
        Tell! Books
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn rounded elevation="24" to="/publish" color="#0066f5" class="white--text mr-5" style="font-size:15px;">
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
      </v-btn>
    </v-toolbar>

    <v-toolbar class="md-4 hidden-lg-and-up" color="white" fixed-on-scroll>
          <v-avatar @click.stop="drawer = !drawer" height=40px width=40px>
            <img src="tellbooks logo">
          </v-avatar>
        
      <v-spacer />

      <v-btn to="/shelf" icon>
        <v-icon color="#008140">mdi-magnify</v-icon>
      </v-btn>

      <v-btn rounded elevation="24" to="/publish" color="#f66c1f" class=" mr-5" style="font-size:15px;color:white">
        <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon>Publish
      </v-btn>
    </v-toolbar>
   

    
  </v-card>


  
</template>


