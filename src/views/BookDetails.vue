<template>
  <div class="book-details">
    <header class="bg-gray-800 text-white mb-20 py-20 relative">
      <div class="container flex">
        <div v-if="info.image" class="book-container w-auto mr-16">
          <img
            :src="info.image"
            alt=""
            class="book-image object-cover rounded-md mr-8"
          />
        </div>
        <div class="w-auto max-w-2xl">
          <p class="text-green-300 font-bold uppercase mb-3">
            {{ info.author }}
          </p>
          <h1 class="text-5xl mb-5">
            {{ info.title }}
          </h1>
          <p v-if="info.snippet" class="flex-grow text-md mb-10">
            {{ info.snippet }}
          </p>

          <div class="buttons flex">
            <a
              @click="saveBookToLibrary"
              class="py-4 px-7 rounded-md transition-colors bg-gray-600 hover:bg-gray-900 text-white mr-6"
              >Mark as Read</a
            >
            <a
              @click="saveBookForLater"
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
            {{ info.description }}
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
import { projectAuth, projectFirestore, firebase } from "@/firebase/config";

export default {
  props: ["book"],
  data() {
    return {
      info: this.$route.params.book,
    };
  },
  methods: {
    saveBookToLibrary() {
      let currentUser = projectAuth.currentUser.email;
      let saveBook = {
        author: this.info.author,
        title: this.info.title,
        description: this.info.description,
        ...(this.info.snippet && {
          snippet: this.info.snippet,
        }),
        ...(this.info.image && {
          image: this.info.image,
        }),
        review: null,
      };

      projectFirestore
        .collection("users")
        .doc(currentUser)
        .update({
          library: firebase.firestore.FieldValue.arrayUnion(saveBook),
        })
        .then(console.log("It worked"));
    },
    saveBookForLater() {
      let currentUser = projectAuth.currentUser.email;
      let saveBook = {
        author: this.info.author,
        title: this.info.title,
        description: this.info.description,
        ...(this.info.snippet && {
          snippet: this.info.snippet,
        }),
        ...(this.info.image && {
          image: this.info.image,
        }),
        review: null,
      };

      projectFirestore
        .collection("users")
        .doc(currentUser)
        .update({
          savedBooks: firebase.firestore.FieldValue.arrayUnion(saveBook),
        })
        .then(console.log("It worked"));
    },
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
