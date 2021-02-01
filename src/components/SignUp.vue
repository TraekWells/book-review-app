<template>
  <article class="sign-up bg-gray-100 py-12">
    <div class="container">
      <form class="bg-white p-10 rounded-md shadow-md w-2/3 mx-auto">
        <h1 class="text-center mb-8">Sign Up</h1>
        <div class="form-field flex flex-col mb-4">
          <label for="name" class="mb-3">Name</label>
          <input
            type="text"
            id="name"
            class="p-3 bg-gray-100 rounded"
            placeholder="Enter your name"
          />
        </div>
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
    </div>
  </article>
</template>

<script>
export default {};
</script>

<style></style>
