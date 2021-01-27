<template>
  <div class="book-details">
    <header class="bg-gray-50 mb-20 py-12">
      <div class="container flex justify-between">
        <div class="w-2/3 max-w-2xl">
          <p>{{ this.$route.params.book.volumeInfo.authors[0] }}</p>
          <h1 class="text-5xl mb-5">
            {{ this.$route.params.book.volumeInfo.title }}
          </h1>
          <p class="text-lg leading-relaxed mb-10">
            {{ this.$route.params.book.volumeInfo.description }}
          </p>
        </div>
        <div
          v-if="this.$route.params.book.volumeInfo.imageLinks.thumbnail"
          class="w-1/3"
        >
          <img
            :src="this.$route.params.book.volumeInfo.imageLinks.thumbnail"
            alt=""
            class="object-cover h-full rounded-md"
          />
        </div>
      </div>
      <div class="container buttons flex">
        <a href="#" class="py-4 px-7 rounded-md bg-gray-600 text-white mr-6"
          >Mark as Read</a
        >
        <a href="#" class="py-4 px-7 rounded-md border border-gray-600"
          >Save for Later</a
        >
      </div>
    </header>
    <main class="py-20"></main>
  </div>
</template>

<script>
export default {
  props: ["book"],
};
</script>

<style></style>
