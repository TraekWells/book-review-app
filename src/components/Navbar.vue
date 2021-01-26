<template>
  <nav class="py-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <ul class="flex text-gray-700">
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
        class="text-gray-700 p-2 border-gray-700 border bw rounded-md"
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
