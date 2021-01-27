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
      <p class="mb- text-gray-600 uppercase" v-if="book.volumeInfo.authors">
        {{ book.volumeInfo.authors[0] }}
      </p>
      <h3 class="text-2xl mb-4 font-bold">
        {{ book.volumeInfo.title }}
      </h3>
      <p v-if="book.searchInfo" class="flex-grow text-md">
        {{ this.stripContent(book.searchInfo.textSnippet) }}
      </p>
      <router-link
        :to="{ name: 'BookDetails', params: { title: title, book: book } }"
        class="learn-more flex text-blue-600 hover:text-blue-800"
        >Learn More <ArrowRightIcon class="ml-2 transition-all"
      /></router-link>
    </div>
  </article>
</template>

<script>
import { BookmarkIcon, ArrowRightIcon } from "vue-feather-icons";
import slugify from "slugify";

export default {
  name: "BookCard",
  props: {
    book: {
      type: Object,
    },
  },
  data() {
    return {
      title: "",
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
  created() {
    this.title = slugify(this.book.volumeInfo.title, { lower: true });
  },
};
</script>

<style>
.image {
  max-width: 12rem;
}

.learn-more:hover svg {
  transform: translateX(1rem);
}
</style>
