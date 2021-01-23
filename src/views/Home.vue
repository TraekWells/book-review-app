<template>
  <article
    class="bg-green-500 py-24 text-white flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl mb-4 font-bold">Book Review App</h1>
    <p class="text-xl mb-10">I'll think of a better title later</p>
    <div class="search flex">
      <form @submit.prevent>
        <input
          type="text"
          class="p-3 text-gray-700 shadow-md mr-8 rounded-md focus:ring-4"
          v-model="searchQuery"
          placeholder="Search for a book"
        />
        <button
          @click="handleForm"
          class="bg-green-700 py-3 px-8 rounded-md hover:bg-green-800"
        >
          Search
        </button>
      </form>
    </div>
  </article>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      searchQuery: null,
    };
  },
  methods: {
    handleForm() {
      const searchQuery = this.searchQuery;
      const api = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.VUE_APP_API_KEY}`;

      axios
        .get(api)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
