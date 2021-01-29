<template>
  <div class="search flex">
    <form @submit.prevent="handleForm">
      <input
        type="text"
        class="p-4 text-gray-700 text-xl shadow-md rounded-l-md focus:ring-4"
        v-model="searchQuery"
        placeholder="Search for a book"
      />
      <button
        class="bg-green-700 text-white py-4 text-xl shadow-md px-8 rounded-r-md hover:bg-green-800"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      searchQuery: null,
      searchResults: [],
    };
  },
  methods: {
    handleForm() {
      const searchQuery = this.searchQuery;
      const api = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&langRestrict=en&maxResults=20&key=${process.env.VUE_APP_API_KEY}`;

      axios
        .get(api)
        .then((response) => {
          response.data.items.forEach((book) => {
            this.searchResults.push(book);
          });
          this.$emit("books", this.searchResults);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
