<template>
  <div>
    <header class="bg-gray-800 text-white mb-20 py-16">
      <div class="container flex flex-col items-center">
        <h1 class="text-5xl mb-5">My Library</h1>
        <p class="text-xl max-w-2xl leading-relaxed mb-10 text-center">
          A list of the books you've read. Feel free to write a short review
          about it so you can remember what you thought about it.
        </p>
      </div>
    </header>
    <main class="container px-7 md:px-20 mx-auto">
      <Loading v-if="loading" />
      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <template v-for="(book, index) in library">
          <BookCard :book="book" :key="index" />
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { projectAuth, projectFirestore } from "@/firebase/config";
import Loading from "@/components/Loading";
import BookCard from "@/components/BookCard";

export default {
  components: {
    BookCard,
    Loading,
  },
  data() {
    return {
      library: [],
      loading: true,
    };
  },
  metaInfo: {
    titleTemplate: "%s | My Library",
  },
  mounted() {
    let currentUser = projectAuth.currentUser.uid;

    projectFirestore
      .collection("users")
      .where("user_id", "==", currentUser)
      .get()
      .then((user) => {
        user.docs.forEach((doc) => {
          let data = doc.data();
          data.library.forEach((book) => {
            this.library.push(book);
          });
          this.loading = false;
        });
      });
  },
};
</script>

<style></style>
