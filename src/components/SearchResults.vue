<template>
  <div class="bg-green-50 py-20">
    <div class="results container mx-auto px-20">
      <article
        class="card bg-white shadow-md rounded-md p-8 flex relative"
        v-for="(book, index) in books"
        :key="index"
      >
        <BookmarkIcon class="favorite-icon absolute top-5 right-5 w-5" />
        <div v-if="book.volumeInfo.imageLinks" class="card-image w-1/2">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail"
            alt=""
            class="w-full object-cover"
          />
        </div>
        <div class="card-content w-1/2">
          <p v-if="book.volumeInfo.auth">{{ book.volumeInfo.authors[0] }}</p>
          <h3 class="text-green-700 text-lg font-bold">
            {{ book.volumeInfo.title }}
          </h3>
          <p v-if="book.searchInfo">{{ book.searchInfo.textSnippet }}</p>
          <router-link to="#" class="learn-more"
            >Learn More <ArrowRightIcon class="ml-2"
          /></router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { BookmarkIcon, ArrowRightIcon } from "vue-feather-icons";

export default {
  name: "SearchResults",
  components: {
    BookmarkIcon,
    ArrowRightIcon,
  },
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
  /* grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr)); */
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.learn-more {
  display: flex;
  align-items: center;
}

.favorite-icon:hover {
  fill: #ffd700;
  color: #ffd700;
  cursor: pointer;
}
</style>
