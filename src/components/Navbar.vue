<template>
  <nav class="py-4 shadow-md">
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
            >Saved Books</router-link
          >
        </li>
      </ul>
      <router-link
        :to="{ name: 'Search' }"
        class="text-gray-700 py-2 px-4 border-gray-700 hover:text-white hover:border-transparent hover:bg-gray-700 transition-colors border bw rounded-md"
        >Search for Books</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
