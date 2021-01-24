<template>
  <div class="bg-green-50">
    <div class="results container mx-auto px-40">
      <article
        class="card bg-white shadow-md rounded-md p-8"
        v-for="(book, index) in books"
        :key="index"
      >
        <h3>{{ book.volumeInfo.title }}</h3>
        <p>{{ book.volumeInfo.description }}</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: {
    books: {
      type: Array,
    },
  },
};
</script>

<style>
.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2rem;
}
</style>
