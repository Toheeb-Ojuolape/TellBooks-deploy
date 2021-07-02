<template>
        <v-card style="border-radius:12px" class="pa-8 text-center" justify="center">
        <p>Tell your friends about Tell! Books</p>
          <v-btn
            large
            color="#1773ea"
            :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
            target="_blank"
            style="color:white"
          >
            <v-icon color="white" class="mr-2 px-2">mdi-facebook</v-icon>
           Share on Facebook
          </v-btn>
          <v-btn
            large
            color="green"
            :href="
              `https://wa.me/?text=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
           
            style="color:white"
            class='mt-3'
          >
            <v-icon color="white" class="mr-2 px-2">mdi-whatsapp</v-icon>
          Share on WhatsApp</v-btn>
          <v-btn
            large
            color="#1da1f2"
            :href="
              `https://twitter.com/intent/tweet?text=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
          
            style="color:white"
            class='mt-3'
          >
            <v-icon color="white" class="mr-2 px-4">mdi-twitter</v-icon>
            Share on Twitter
          </v-btn>

          <v-btn
            large
            color="#2663ac"
            :href="
              `https://www.linkedin.com/shareArticle?mini=true&title=I%20just%20created%20an%20account%20on%20tellbooks.%20You%20should%20create%20one%20too!${pageUrl}`
            "
            target="_blank"
            style="color:white"
             class='mt-3'
          >
            <v-icon color="white" class="mr-2 px-2">mdi-linkedin</v-icon>
         Share on LinkedIn </v-btn>
        </v-card>
</template>






<script>
export default{
    name:'inviteFriends',
    data(){
        return{
            pageUrl:"https://books.tell.africa"
        }
    }
}
</script>