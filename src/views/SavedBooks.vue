<template>
  <div>
    <header class="bg-gray-800 text-white mb-20 py-16">
      <div class="container flex flex-col items-center">
        <h1 class="text-5xl mb-5">Saved Books</h1>
        <p class="text-xl max-w-2xl leading-relaxed mb-10 text-center">
          A list of books that you've saved for later.
        </p>
      </div>
    </header>
    <main class="container px-7 md:px-20 mx-auto">
      <Loading v-if="loading" />
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <template v-for="(book, index) in savedBooks">
          <BookCard :book="book" :key="index" />
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { projectAuth, projectFirestore } from "@/firebase/config";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";

export default {
  components: {
    BookCard,
    Loading,
  },
  data() {
    return {
      savedBooks: [],
      loading: true,
    };
  },
  metaInfo: {
    titleTemplate: "%s | Saved Books",
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
          data.savedBooks.forEach((book) => {
            this.savedBooks.push(book);
          });
          this.loading = false;
        });
      });
  },
};
</script>

<style></style>
