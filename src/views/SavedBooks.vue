<template>
  <div>
    <header class="bg-gray-800 text-white mb-20 py-16">
      <div class="container flex flex-col items-center">
        <h1 class="text-5xl mb-5">Saved Books</h1>
        <p class="text-xl max-w-2xl leading-relaxed mb-10 text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          temporibus iste ut a facere, voluptatem dolorum, repudiandae maxime
          doloremque non, fuga nobis error blanditiis omnis impedit hic porro
          neque sunt.
        </p>
      </div>
    </header>
    <main class="container px-7 md:px-20 mx-auto">
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

export default {
  components: {
    BookCard,
  },
  data() {
    return {
      savedBooks: [],
    };
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
        });
      });
  },
};
</script>

<style></style>
