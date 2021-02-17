<template>
  <nav class="py-7 px-3 shadow-md flex items-center justify-between">
    <router-link
      :to="{ name: 'Home' }"
      class="p-3 z-20 font-black text-gray-700 text-2xl font-serif transition-colors"
      >TheBookShelf</router-link
    >
    <div class="z-20">
      <a
        ref="menuButton"
        @click="toggleMobileMenu"
        class="text-gray-700 md:hidden cursor-pointer py-3 px-4 border-gray-700 hover:text-white hover:border-transparent hover:bg-gray-700 transition-colors border bw rounded-md"
        >Menu</a
      >
    </div>
    <div
      ref="menu"
      class="hidden container mx-auto md:flex items-center md:justify-between flex-wrap"
    >
      <ul
        class="flex flex-col md:flex-row text-gray-700 mb-5 md:mb-0 items-center"
      >
        <li class="mr-3">
          <router-link
            :to="{ name: 'Library' }"
            class="p-3 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >My Library</router-link
          >
        </li>
        <li class="mr-3">
          <router-link
            :to="{ name: 'SavedBooks' }"
            class="p-3 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >Saved Books</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'Search' }"
            class="text-gray-700 block py-3 px-4 border-gray-700 hover:text-white hover:border-transparent hover:bg-gray-700 transition-colors border bw rounded-md"
            >Search for Books</router-link
          >
        </li>
      </ul>
      <ul
        class="flex flex-col md:flex-row text-gray-700 mb-5 md:mb-0 items-center"
      >
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
        <li v-if="user" class="mr-10">
          <p>Welcome back {{ user.email }}</p>
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
      menuIsOpen: false,
    };
  },
  methods: {
    logOut() {
      projectAuth.signOut().then(() => {
        this.$router.push({ name: "SignIn" });
      });
    },
    openMobileNav() {
      if (!this.menuIsOpen) {
        this.$refs.menuButton.textContent = "Close";
        this.$refs.menu.classList.remove("hidden");
        this.$refs.menu.classList.add("open");

        this.menuIsOpen = !this.menuIsOpen;
      } else {
        return;
      }
    },
    closeMobileNav() {
      if (this.menuIsOpen) {
        this.$refs.menuButton.textContent = "Menu";
        this.$refs.menu.classList.add("hidden");
        this.$refs.menu.classList.remove("open");

        this.menuIsOpen = !this.menuIsOpen;
      } else {
        return;
      }
    },
    toggleMobileMenu() {
      if (this.menuIsOpen) {
        this.closeMobileNav();
      } else {
        this.openMobileNav();
      }
    },
  },
  watch: {
    $route() {
      this.closeMobileNav();
    },
  },
  created() {
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

<style>
.open {
  background-color: white;
  position: fixed;
  padding: 10rem 3rem 3rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 1000%;
}

.open ul {
  margin-bottom: 4rem;
}

.open li {
  margin-right: 0;
  margin-bottom: 2.5rem;
}
</style>
