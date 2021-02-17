<template>
  <article
    class="bg-gray-50 rounded-md p-7 md:flex relative"
    data-aos="fade-up"
    data-aos-offset="150"
    data-aos-delay="100"
  >
    <BookmarkIcon
      @click="saveBookForLater"
      class="absolute top-5 right-5 w-6 cursor-pointer transition-colors text-gray-700 hover:fill-current"
    />
    <div
      ref="alert"
      class="saved opacity-0 text-sm bg-gray-700 text-white rounded-md text-center inline-block py-2 px-4 absolute right-3 -top-7 transition-all"
    >
      <p>Saved!</p>
    </div>
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
      currentUser: projectAuth.currentUser.email,
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
    saveBookForLater() {
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

      projectFirestore
        .collection("users")
        .doc(this.currentUser)
        .update({
          savedBooks: firebase.firestore.FieldValue.arrayUnion(saveBook),
        })
        .then(console.log("It worked"));

      this.$refs.alert.classList.add("opacity-100");

      setTimeout(() => {
        this.$refs.alert.classList.remove("opacity-100");
      }, 1000);
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
