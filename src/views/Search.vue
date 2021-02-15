<template>
  <div>
    <header class="bg-gray-800 text-white mb-20">
      <div class="container flex items-center justify-center py-20">
        <div class="max-w-2xl text-center flex flex-col items-center">
          <h1 class="text-5xl mb-5">Search</h1>
          <p class="text-xl leading-relaxed mb-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
            temporibus iste ut a facere, voluptatem dolorum, repudiandae maxime
            doloremque non, fuga nobis error blanditiis omnis impedit hic porro
            neque sunt.
          </p>
          <SearchForm @books="sendResults" />
        </div>
      </div>
    </header>
    <main>
      <div class="container px-7 md:px-20">
        <Loading v-if="loading" />
        <div v-if="searchResults" class="search-results">
          <h2>Search Results</h2>
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <template v-for="(book, index) in searchResults">
              <BookCard :book="book" :key="index" />
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";

export default {
  name: "Home",
  components: {
    SearchForm,
    BookCard,
    Loading,
  },
  data() {
    return {
      searchResults: null,
      loading: false,
    };
  },
  metaInfo: {
    titleTemplate: "%s | Search",
  },
  methods: {
    sendResults(payload) {
      this.loading = true;
      this.searchResults = payload;
      this.loading = false;
    },
  },
};
</script>

<style></style>
