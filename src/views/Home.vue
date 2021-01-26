<template>
  <div>
    <header class="bg-gray-50 mb-20 flex items-center">
      <div class="p-16 w-1/2">
        <div class="container mx-auto">
          <h1 class="text-5xl mb-5">Logbook</h1>
          <p class="text-lg mb-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
            temporibus iste ut a facere, voluptatem dolorum, repudiandae maxime
            doloremque non, fuga nobis error blanditiis omnis impedit hic porro
            neque sunt.
          </p>
          <SearchForm @books="sendResults" />
        </div>
      </div>
      <div class="w-1/2">
        <img
          src="@/assets/images/hero-image.jpg"
          alt=""
          class="object-cover h-full"
        />
      </div>
    </header>
    <main class="container px-20 mx-auto">
      <!-- <div class="container px-20 mx-auto">
        <h2>Recommended For You</h2>
        <BookCard
          :book="books"
          v-for="(book, index) in recommendedBooks"
          :key="index"
        />
      </div> -->
      <div class="grid grid-cols-2 gap-12">
        <template v-for="(book, index) in searchResults">
          <BookCard :book="book" :key="index" />
        </template>
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
    const api = `https://www.googleapis.com/books/v1/volumes?q=jack%20reacher&subject:fiction&key=${process.env.VUE_APP_API_KEY}`;

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
