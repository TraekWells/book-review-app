<template>
  <article
    class="bg-gray-50 rounded-md p-7 md:flex relative"
    data-aos="fade-up"
    data-aos-offset="150"
    data-aos-delay="100"
  >
    <BookmarkIcon
      @click="saveBookToDatabase"
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
      <p v-if="this.book.searchInfo" class="flex-grow text-md mb-4">
        {{ bookSnippet }}
      </p>
      <router-link
        :to="{
          name: 'BookDetails',
          params: { title: sluggedTitle, snippet: bookSnippet, book: book },
        }"
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
// import { projectFirestore, projectAuth } from "@/firebase/config";

export default {
  name: "BookCard",
  props: {
    book: {
      type: Object,
    },
  },
  data() {
    return {
      sluggedTitle: "",
      bookSnippet: "",
      // saveBook: {
      //   author: this.book.volumeInfo.authors[0],
      //   title: this.book.volumeInfo.title,
      //   description: this.book.volumeInfo.description,
      //   snippet: this.book.searchInfo.textSnippet
      //     ? this.book.searchInfo.textSnippet
      //     : null,
      //   image: this.book.volumeInfo.imageLinks.thumbnail,
      //   review: null,
      // },
    };
  },
  components: {
    BookmarkIcon,
    ArrowRightIcon,
  },
  methods: {
    stripContent(text) {
      let regex = /(<([^>]+)>)/gi;
      return text.replaceAll(regex, "");
    },
    replaceEntity(str) {
      return str.replaceAll("&#39;", "'");
    },
    saveBookToDatabase() {
      console.log(this);
      //   let currentUser = projectAuth.currentUser.uid;

      //   projectFirestore
      //     .collection("users")
      //     .where("user_id", "==", currentUser)
      //     .set({ savedBooks: this.saveBook })
      //     .then(this.saveBook);
      // },
    },
  },
  created() {
    this.sluggedTitle = slugify(this.book.volumeInfo.title, { lower: true });
    if (this.book.searchInfo) {
      this.bookSnippet = this.stripContent(
        this.replaceEntity(this.book.searchInfo.textSnippet)
      );
    } else {
      this.bookSnippet = "";
    }
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
