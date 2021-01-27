<template>
  <article>
    <h1>{{ this.$route.params.book.volumeInfo.title }}</h1>
    <p>{{ this.$route.params.book.volumeInfo.description }}</p>
  </article>
</template>

<script>
export default {
  props: ["book"],
};
</script>

<style></style>
