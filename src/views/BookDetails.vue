<template>
  <div class="book-details">
    <header class="bg-gray-800 text-white mb-20 px-10 py-10 md:py-20 relative">
      <div class="container flex flex-col md:flex-row">
        <div v-if="info.image" class="book-container w-auto mr-16">
          <img
            :src="info.image"
            alt=""
            class="book-image object-cover rounded-md mr-8"
          />
        </div>
        <div class="w-auto max-w-2xl">
          <p class="text-green-300 font-bold uppercase mt-4 md:mt-0 mb-3">
            {{ info.author }}
          </p>
          <h1 class="text-3xl md:text-5xl mb-5">
            {{ info.title }}
          </h1>
          <p v-if="info.snippet" class="flex-grow text-md mb-10">
            {{ cleanSnippet }}
          </p>

          <div class="buttons flex flex-col md:flex-row">
            <a
              v-if="!markedAsRead"
              @click="saveBookToLibrary"
              class="py-4 px-7 rounded-md transition-colors text-center bg-gray-600 hover:bg-gray-900 text-white mb-5 md:mb-0 md:mr-6 cursor-pointer"
              >Mark as Read</a
            >
            <a
              v-else
              @click="removeBookFromLibrary"
              class="py-4 px-7 rounded-md transition-colors text-center bg-gray-600 hover:bg-gray-900 text-white mb-5 md:mb-0 md:mr-6 cursor-pointer"
              >You've Read It!</a
            >
            <a
              v-if="!savedForLater"
              @click="saveBookForLater"
              class="py-4 px-7 rounded-md transition-colors text-center border hover:border-transparent hover:bg-gray-900 hover:text-white border-gray-600 cursor-pointer"
              >Save for Later</a
            >
            <a
              v-else
              @click="removeBookFromSavedBooks"
              class="py-4 px-7 rounded-md transition-colors text-center border hover:border-transparent hover:bg-gray-900 hover:text-white border-gray-600 cursor-pointer"
              >Book is Saved!</a
            >
          </div>
        </div>
      </div>
    </header>
    <main class="px-10 py-0 md:py-12">
      <div class="container flex flex-col md:flex-row">
        <article class="description md:mr-14 md:w-1/2">
          <h2>Description</h2>
          <p class="text-lg leading-relaxed mb-10">
            {{ info.description }}
          </p>
        </article>
        <article
          v-if="markedAsRead"
          class="review bg-gray-100 p-6 rounded-md md:w-1/2"
        >
          <h2>My Review</h2>
          <template v-if="!info.review">
            <a
              v-if="!reviewOpen"
              @click="reviewOpen = !reviewOpen"
              class="text-gray-700 py-3 px-4 inline-block border-gray-700 hover:text-white hover:border-transparent hover:bg-gray-700 transition-colors border bw rounded-md cursor-pointer"
              >Write a review</a
            >
          </template>

          <template v-if="info.review && !reviewOpen">
            <p>{{ info.review }}</p>
            <a
              class="inline-block text-blue-600 underline mt-6 cursor-pointer"
              @click="reviewOpen = true"
              >Edit Review</a
            >
          </template>

          <template v-if="reviewOpen">
            <textarea
              cols="30"
              rows="10"
              :placeholder="`What did you think about ${info.title}?`"
              class="p-3 w-full rounded-md resize-none"
              v-model="review"
            ></textarea>
            <a
              @click="saveReview"
              class="inline-block mt-6 py-4 px-7 rounded-md transition-colors bg-gray-600 hover:bg-gray-900 text-white mr-6 cursor-pointer"
              >Save Review</a
            >
          </template>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import { projectAuth, projectFirestore, firebase } from "@/firebase/config";

export default {
  props: ["book"],
  data() {
    return {
      info: this.$route.params.book,
      currentUser: projectAuth.currentUser.email,
      markedAsRead: null,
      savedForLater: null,
      reviewOpen: false,
      review: null,
      cleanSnippet: null,
    };
  },
  metaInfo() {
    return {
      title: `The Bookshelf | ${this.info.title}`,
    };
  },
  methods: {
    saveBookToLibrary() {
      projectFirestore
        .collection("users")
        .doc(this.currentUser)
        .update({
          library: firebase.firestore.FieldValue.arrayUnion(
            this.$route.params.book
          ),
        })
        .then((this.markedAsRead = true));
    },
    saveBookForLater() {
      projectFirestore
        .collection("users")
        .doc(this.currentUser)
        .update({
          savedBooks: firebase.firestore.FieldValue.arrayUnion(
            this.$route.params.book
          ),
        })
        .then((this.savedForLater = true));
    },
    removeBookFromSavedBooks() {
      projectFirestore
        .collection("users")
        .doc(this.currentUser)
        .update({
          savedBooks: firebase.firestore.FieldValue.arrayRemove(
            this.$route.params.book
          ),
        })
        .then((this.savedForLater = false));
    },
    removeBookFromLibrary() {
      projectFirestore
        .collection("users")
        .doc(this.currentUser)
        .update({
          library: firebase.firestore.FieldValue.arrayRemove(
            this.$route.params.book
          ),
        })
        .then((this.markedAsRead = false));
    },
    saveReview() {
      this.removeBookFromLibrary();
      this.$route.params.book.review = this.review;
      this.reviewOpen = false;
      this.saveBookToLibrary();
    },
  },
  mounted() {
    this.cleanSnippet = this.info.snippet.replace(/(<([^>]+)>)/gi, "");

    // Check if the book is the user's 'savedBooks' array
    projectFirestore
      .collection("users")
      .doc(this.currentUser)
      .get()
      .then((doc) => {
        doc.data().savedBooks.forEach((book) => {
          if (book.title === this.info.title) {
            this.savedForLater = true;
          }
        });
      });

    // Check if the book is the user's 'library' array
    projectFirestore
      .collection("users")
      .doc(this.currentUser)
      .get()
      .then((doc) => {
        doc.data().library.forEach((book) => {
          if (book.title === this.info.title) {
            this.markedAsRead = true;
          }
        });
      });
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  .book-container {
    margin-bottom: -12%;
  }

  .book-image {
    height: 25rem;
  }
}
</style>
