<template>
  <article
    class="bg-gray-50 rounded-md p-7 md:flex relative"
    data-aos="fade-up"
    data-aos-offset="150"
    data-aos-delay="100"
  >
    <BookmarkIcon
      class="favorite-icon absolute top-5 right-5 w-5 cursor-pointer transition-colors hover:text-blue-700"
    />
    <img
      v-if="book.volumeInfo.imageLinks"
      :src="book.volumeInfo.imageLinks.thumbnail"
      alt=""
      class="image rounded-md mb-4 md:mb-0 md:mr-10 block self-start"
    />
    <div class="flex flex-col">
      <p class="text-gray-600 uppercase" v-if="book.volumeInfo.authors">
        {{ book.volumeInfo.authors[0] }}
      </p>
      <h3 class="text-2xl mb-4 font-bold">
        {{ book.volumeInfo.title }}
      </h3>
      <p v-if="book.searchInfo" class="flex-grow text-md mb-4">
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
import aos from "aos";
import "aos/dist/aos.css";

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
    aos.init();
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
