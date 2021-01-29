<template>
  <div>
    <header class="bg-gray-800 text-white mb-20 px-6 md:px-0 py-16 relative">
      <div class="container sm:flex flex-col items-center">
        <h1 class="text-5xl mb-5">Logbook</h1>
        <p class="text-xl max-w-2xl leading-relaxed mb-10 md:text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          temporibus iste ut a facere, voluptatem dolorum, repudiandae maxime
          doloremque non, fuga nobis error blanditiis omnis impedit hic porro
          neque sunt.
        </p>
        <SearchForm @books="sendResults" class="md:absolute md:-bottom-7" />
      </div>
    </header>
    <main class="container px-7 md:px-20 mx-auto">
      <div v-if="!searchResults" class="recommended">
        <h2 class="text-center mb-10">Recommended For You</h2>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <template v-for="(book, index) in recommendedBooks">
            <BookCard :book="book" :key="index" />
          </template>
        </div>
      </div>
      <div v-else class="search-results">
        <h2 class="text-center">Search Results</h2>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <template v-for="(book, index) in searchResults">
            <BookCard :book="book" :key="index" />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import SearchForm from "@/components/SearchForm";
import BookCard from "@/components/BookCard";

export default {
  components: {
    SearchForm,
    BookCard,
  },
  data() {
    return {
      searchResults: null,
      recommendedBooks: [],
    };
  },
  methods: {
    sendResults(payload) {
      this.searchResults = payload;
    },
  },
  mounted() {
    const api = `https://www.googleapis.com/books/v1/volumes?q=samurai&langRestrict=en&maxResults=20&key=${process.env.VUE_APP_API_KEY}`;

    axios
      .get(api)
      .then((response) => {
        response.data.items.forEach((book) => {
          this.recommendedBooks.push(book);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
