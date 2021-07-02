<template>
    <v-card style="border-radius:12px" class="pa-6 text-center pb-12" justify="center">
          <p class="px-3">
            Contact our Customer Happiness Representatives using any of the
            following options:
          </p>

          <v-btn
            large
            color="green"
            :href="
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20need%20to%20speak%20to%20a%20customer%20representative.%20My%20name%20is%20${user.data.displayName}`
            "
            target="_blank"
            
            style="color:white"
             class="mt-3"
          >
            <v-icon color="white" class="mr-2 px-2" >mdi-whatsapp</v-icon>
            Message on WhatsApp
          </v-btn>
          <v-btn
            large
            color="#f66c1f"
            href="mailto:books@tell.africa?subject=Request for Support &body=Hi tellbooks, I would like to request for support on the following issue: "
            target="_blank"
            style="color:white"
            class="mt-3 px-12"
          >
            <v-icon fab color="white" class="mr-2 px-2" >mdi-email</v-icon>
            Send an Email
          </v-btn>
        </v-card>
        
</template>


<script>
import { mapGetters } from 'vuex'
export default{
    name:'CustomerSupport',
    
    computed:{
      ...mapGetters({
        user:'user'
      })
    }
     
}



</script>