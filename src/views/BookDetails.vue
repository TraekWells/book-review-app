<template>
  <div class="book-details">
    <header class="bg-gray-800 text-white mb-20 py-20 relative">
      <div class="container flex">
        <div
          v-if="info.volumeInfo.imageLinks.thumbnail"
          class="book-container w-auto mr-16"
        >
          <img
            :src="info.volumeInfo.imageLinks.thumbnail"
            alt=""
            class="book-image object-cover rounded-md mr-8"
          />
        </div>
        <div class="w-auto max-w-2xl">
          <p class="text-green-300 font-bold uppercase mb-3">
            {{ info.volumeInfo.authors[0] }}
          </p>
          <h1 class="text-5xl mb-5">
            {{ info.volumeInfo.title }}
          </h1>
          <p v-if="info.searchInfo" class="flex-grow text-md mb-10">
            {{ $route.params.snippet }}
          </p>

          <div class="buttons flex">
            <a
              href="#"
              class="py-4 px-7 rounded-md transition-colors bg-gray-600 hover:bg-gray-900 text-white mr-6"
              >Mark as Read</a
            >
            <a
              href="#"
              class="py-4 px-7 rounded-md transition-colors border hover:border-transparent hover:bg-gray-900 hover:text-white border-gray-600"
              >Save for Later</a
            >
          </div>
        </div>
      </div>
    </header>
    <main class="py-12">
      <div class="container flex">
        <article class="description mr-14 w-1/2">
          <h2>Description</h2>
          <p class="text-lg leading-relaxed mb-10">
            {{ info.volumeInfo.description }}
          </p>
        </article>
        <article class="review bg-gray-100 p-6 rounded-md w-1/2">
          <h2>My Review</h2>
          <p class="text-lg leading-relaxed mb-10">
            Review goes here
          </p>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return {
      info: this.$route.params.book,
    };
  },
};
</script>

<style>
.book-container {
  margin-bottom: -12%;
}

.book-image {
  height: 25rem;
}
</style>
