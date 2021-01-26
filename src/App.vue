<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

body {
  height: 100vh;
}
</style>
