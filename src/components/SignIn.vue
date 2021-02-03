<template>
  <article class="sign-in bg-gray-100 py-12">
    <div class="container">
      <form class="bg-white p-10 rounded-md shadow-md w-1/3 mx-auto">
        <h1 class="text-center mb-8">Sign In</h1>
        <div class="form-field flex flex-col mb-4">
          <label for="email" class="mb-3">Email Address</label>
          <input
            type="text"
            id="email"
            class="p-3 bg-gray-100 rounded"
            placeholder="Enter your email address"
          />
        </div>
        <div class="form-field flex flex-col mb-4">
          <label for="password" class="mb-3">Password</label>
          <input
            type="password"
            id="password"
            class="p-3 bg-gray-100 rounded"
            placeholder="*******"
          />
        </div>
      </form>
      <p class="text-center mt-8">
        Don't have an account?
        <router-link :to="{ name: 'SignUp' }">Sign in</router-link>
      </p>
    </div>
  </article>
</template>

<script>
export default {};
</script>

<style></style>
