<template>
  <nav>
    <ul>
      <li><router-link to="#">My Library</router-link></li>
      <li><router-link to="#">Saved Books</router-link></li>
    </ul>
    <router-link :to="{ name: 'Search' }">Search for Books</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
