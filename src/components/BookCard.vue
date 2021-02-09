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
      v-if="book.image"
      :src="book.image"
      alt=""
      class="image rounded-md mb-4 md:mb-0 md:mr-10 block self-start"
    />
    <div class="flex flex-col">
      <p class="text-gray-600 uppercase" v-if="book.author">
        {{ book.author }}
      </p>
      <h3 class="text-2xl mb-4 font-bold">
        {{ book.title }}
      </h3>
      <p v-if="book.snippet" class="flex-grow text-md mb-4">
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
import { projectFirestore, projectAuth, firebase } from "@/firebase/config";
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
      sluggedTitle: "",
      bookSnippet: "",
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
      let saveBook = {
        author: this.book.author,
        title: this.book.title,
        description: this.book.description,
        ...(this.book.snippet && {
          snippet: this.book.snippet,
        }),
        ...(this.book.image && {
          image: this.book.image,
        }),
        review: null,
      };

      let currentUser = projectAuth.currentUser.email;

      projectFirestore
        .collection("users")
        .doc(currentUser)
        .update({
          savedBooks: firebase.firestore.FieldValue.arrayUnion(saveBook),
        })
        .then(console.log("It worked"));
    },
  },
  created() {
    this.sluggedTitle = slugify(this.book.title, { lower: true });

    if (this.book.snippet) {
      this.bookSnippet = this.stripContent(
        this.replaceEntity(this.book.snippet)
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
