<template>
  <v-app style="text-align:center">
    <v-main style="background:#f66c1f">
      <h1
        class="font-weight-bold white--text"
        style="margin:20px;font-size:42px;padding-top:270px"
      >
        Sorry, this book is not in your library
      </h1>
      <p style="font-size:19px;color:white;margin:20px">
        But you can add it by clicking the button below
      </p>
      <v-btn
        x-large
        elevation="24"
        style="margin-top:30px;font-size:20px;color:#f66c1f"
        :to="`/books/${bookName}`"
      >
        Get {{ bookName }}</v-btn
      >
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      bookName: this.$route.params.id
    };
  }
};
</script>
