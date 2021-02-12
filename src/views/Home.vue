<template>
  <div>
    <header class="bg-gray-800 text-white mb-20 px-6 md:px-0 py-16 relative">
      <div class="container sm:flex flex-col items-center">
        <h1 class="text-5xl mb-5">Logbook</h1>
        <p class="text-xl max-w-2xl leading-relaxed mb-10 md:text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          temporibus iste ut a facere, voluptatem dolorum, repudiandae maxime
          doloremque non, fuga nobis error blanditiis omnis impedit hic porro
          neque sunt.
        </p>
        <SearchForm @books="sendResults" class="md:absolute md:-bottom-7" />
      </div>
    </header>
    <main class="container px-7 md:px-20 mx-auto">
      <div v-if="!searchResults" class="recommended">
        <h2 class="text-center mb-10">Recommended For You</h2>
        <Loading v-if="loading" />
        <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <template v-for="(book, index) in recommendedBooks">
            <BookCard :book="book" :key="index" />
          </template>
        </div>
      </div>
      <div v-else class="search-results">
        <h2 class="text-center">Search Results</h2>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <template v-for="(book, index) in searchResults">
            <BookCard :book="book" :key="index" />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import SearchForm from "@/components/SearchForm";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import { projectAuth, projectFirestore } from "@/firebase/config";

export default {
  components: {
    SearchForm,
    BookCard,
    Loading,
  },
  data() {
    return {
      searchResults: null,
      recommendedBooks: [],
      interests: null,
      loading: true,
    };
  },
  methods: {
    sendResults(payload) {
      this.searchResults = payload;
    },
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
          this.interests = data.favoriteGenres.join().replaceAll(",", "+");

          const api = `https://www.googleapis.com/books/v1/volumes?q=${this.interests}&printType=books&langRestrict=en&maxResults=30&key=${process.env.VUE_APP_API_KEY}`;

          axios
            .get(api)
            .then((response) => {
              response.data.items.forEach((book) => {
                let bookObject = {
                  author: book.volumeInfo.authors[0],
                  title: book.volumeInfo.title,
                  description: book.volumeInfo.description,
                  ...(book.searchInfo.textSnippet && {
                    snippet: book.searchInfo.textSnippet,
                  }),
                  ...(book.volumeInfo.imageLinks && {
                    image: book.volumeInfo.imageLinks.thumbnail,
                  }),
                  review: null,
                };
                this.recommendedBooks.push(bookObject);
                this.loading = false;
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  },
};
</script>

<style></style>
