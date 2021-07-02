<template>
  <v-toolbar flat class="md-4 hidden-md-and-down ">
   <v-spacer></v-spacer>
      <v-btn
        rounded
        elevation="12"
        to="/publish"
        color="#f66c1f"
        class="white--text"
        style="float:right;font-size:15px;"
      >
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
      </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {};
  },
  methods: {
    find() {
      this.$emit("find");
    },
  },
};
</script>
