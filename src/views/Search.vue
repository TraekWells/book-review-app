<template>
  <main>
    <article
      class="bg-indigo-100 py-24 text-white flex flex-col justify-center items-center"
    >
      <h1 class="text-4xl mb-4 font-bold">Book Review App</h1>
      <p class="text-xl mb-10">I'll think of a better title later</p>
      <SearchForm @books="sendResults" />
    </article>
  </main>
</template>

<script>
import SearchForm from "@/components/SearchForm";

export default {
  name: "Home",
  components: {
    SearchForm,
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
