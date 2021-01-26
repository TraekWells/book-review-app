<template>
  <main>
    <article
      class="bg-green-500 py-24 text-white flex flex-col justify-center items-center"
    >
      <h1 class="text-4xl mb-4 font-bold">Book Review App</h1>
      <p class="text-xl mb-10">I'll think of a better title later</p>
      <Search @books="sendResults" />
    </article>
    <SearchResults v-if="books" :books="books" />
  </main>
</template>

<script>
import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";

export default {
  name: "Home",
  components: {
    Search,
    SearchResults,
  },
  data() {
    return {
      books: null,
    };
  },
  methods: {
    sendResults(payload) {
      this.books = payload;
    },
  },
};
</script>

<style></style>
