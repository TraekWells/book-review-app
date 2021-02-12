<template>
  <div class="search flex">
    <form @submit.prevent="handleForm" class="flex flex-col md:flex-row w-full">
      <input
        type="text"
        class="w-full p-3 md:p-4 text-gray-700 text-lg md:text-xl shadow-md rounded-t-md md:rounded-r-none md:rounded-l-md focus:ring-4"
        v-model="searchQuery"
        placeholder="Search for a book"
      />
      <button
        class="bg-green-700 text-white py-3 md:py-4 text-lg md:text-xl shadow-md px-6 md:px-8 rounded-b-md md:rounded-l-none md:rounded-r-md hover:bg-green-800"
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
      const api = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&printType=books&langRestrict=en&maxResults=30&key=${process.env.VUE_APP_API_KEY}`;

      axios
        .get(api)
        .then((response) => {
          response.data.items.forEach((book) => {
            let bookObject = {
              author: book.volumeInfo.authors[0],
              title: book.volumeInfo.title,
              description: book.volumeInfo.description,
              ...(book.searchInfo && {
                snippet: book.searchInfo.textSnippet,
              }),
              ...(book.volumeInfo.imageLinks && {
                image: book.volumeInfo.imageLinks.thumbnail,
              }),
              review: null,
            };
            this.searchResults.push(bookObject);
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
