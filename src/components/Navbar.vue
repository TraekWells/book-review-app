<template>
  <nav class="py-7 shadow-md">
    <div
      class="container mx-auto flex items-center justify-center md:justify-between flex-wrap"
    >
      <ul class="flex text-gray-700 mb-5 md:mb-0">
        <li>
          <router-link :to="{ name: 'Home' }" class="p-4">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Library' }" class="p-4"
            >My Library</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'SavedBooks' }" class="p-4"
            >Bookshelf</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'Search' }"
            class="text-gray-700 py-3 px-4 border-gray-700 hover:text-white hover:border-transparent hover:bg-gray-700 transition-colors border bw rounded-md"
            >Search for Books</router-link
          >
        </li>
      </ul>
      <ul class="flex text-gray-700 mb-5 md:mb-0">
        <li v-if="!user">
          <router-link :to="{ name: 'SignUp' }" class="p-4"
            >Sign Up</router-link
          >
        </li>
        <li v-if="!user">
          <router-link :to="{ name: 'SignIn' }" class="p-4"
            >Sign In</router-link
          >
        </li>
        <li v-if="user">
          <a @click="logOut" class="p-4 cursor-pointer">Log Out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { projectAuth } from "@/firebase/config";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logOut() {
      projectAuth.signOut().then(() => {
        this.$router.push({ name: "SignIn" });
      });
    },
  },
  created() {
    // let user = projectAuth.currentUser;
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style></style>
