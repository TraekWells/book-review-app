<template>
  <article class="bg-gray-50 rounded-md p-7 flex relative">
    <BookmarkIcon class="favorite-icon absolute top-5 right-5 w-5" />
    <img
      v-if="book.volumeInfo.imageLinks"
      :src="book.volumeInfo.imageLinks.thumbnail"
      alt=""
      class="image rounded-md mr-10 block self-start"
    />
    <div class="flex flex-col">
      <p class="mb-2 text-gray-600" v-if="book.volumeInfo.authors">
        {{ book.volumeInfo.authors[0] }}
      </p>
      <h3 class="text-2xl mb-3 text-green-700 font-bold">
        {{ book.volumeInfo.title }}
      </h3>
      <p v-if="book.searchInfo" class="flex-grow">
        {{ this.stripContent(book.searchInfo.textSnippet) }}
      </p>
      <router-link to="#" class="learn-more flex"
        >Learn More <ArrowRightIcon class="ml-2"
      /></router-link>
    </div>
  </article>
</template>

<script>
import { BookmarkIcon, ArrowRightIcon } from "vue-feather-icons";

export default {
  name: "BookCard",
  props: {
    book: {
      type: Object,
    },
  },
  data() {
    return {
      strippedtext: null,
    };
  },
  components: {
    BookmarkIcon,
    ArrowRightIcon,
  },
  methods: {
    stripContent(text) {
      let regex = /(<([^>]+)>)/gi;
      return text.replace(regex, "");
    },
  },
};
</script>

<style>
.svg:hover {
  color: rgba(251, 191, 36, var(--tw-text-opacity));
  fill: rgba(251, 191, 36, var(--tw-text-opacity));
}

.image {
  max-width: 12rem;
}
</style>
