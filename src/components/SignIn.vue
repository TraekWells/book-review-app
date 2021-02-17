<template>
  <article class="sign-in bg-gray-50 py-12 h-screen">
    <div class="container px-10">
      <form
        @submit.prevent="signIn"
        class="bg-white p-10 rounded-md shadow-md md:w-1/2 mx-auto"
      >
        <h1 class="text-center mb-8 font-serif text-gray-700">
          Sign In
        </h1>
        <div class="form-field flex flex-col mb-8">
          <label for="email" class="mb-3">Email Address</label>
          <input
            type="text"
            id="email"
            class="p-3 bg-gray-100 rounded"
            placeholder="Enter your email address"
            v-model="email"
          />
        </div>
        <div class="form-field flex flex-col mb-8">
          <label for="password" class="mb-3">Password</label>
          <input
            type="password"
            id="password"
            class="p-3 bg-gray-100 rounded"
            placeholder="*******"
            v-model="password"
          />
        </div>
        <p class="text-red-700 text-center">{{ feedback }}</p>
        <button
          class="p-3 w-full rounded-md text-white bg-gray-700 transition-colors hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>
      <p class="text-center mt-8">
        Don't have an account?
        <router-link
          :to="{ name: 'SignUp' }"
          class="text-blue-600 underline hover:text-blue-900 transition-colors"
          >Sign up</router-link
        >
      </p>
    </div>
  </article>
</template>

<script>
import { projectAuth } from "@/firebase/config";

export default {
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    signIn() {
      if (this.email && this.password) {
        projectAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please fill in both fields";
      }
    },
  },
};
</script>

<style></style>
