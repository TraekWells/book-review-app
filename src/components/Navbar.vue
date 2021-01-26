<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'Library' }">My Library</router-link></li>
      <li>
        <router-link :to="{ name: 'SavedBooks' }">Saved Books</router-link>
      </li>
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
