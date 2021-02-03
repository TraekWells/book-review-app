<template>
  <article class="sign-up bg-gray-100 py-12">
    <div class="container">
      <form class="bg-white p-10 rounded-md shadow-md w-1/3 mx-auto">
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
        <div class="form-field flex flex-col mb-4">
          <label for="password" class="mb-3">Confirm Password</label>
          <input
            type="password"
            id="password"
            class="p-3 bg-gray-100 rounded"
            placeholder="*******"
          />
        </div>
        <h3 class="text-xl my-4">Favorite Genres</h3>
        <div class="favorite-genres grid grid-cols-3 gap-4 text-center">
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="action" />
            <label for="action">Action</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="horror" />
            <label for="horror">Horror</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="adventure" />
            <label for="adventure">Adventure</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="sci-fi" />
            <label for="sci-fi">Sci-Fi</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="fiction" />
            <label for="fiction">Fiction</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="comics" />
            <label for="comics">Comics</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="mystery" />
            <label for="mystery">Mystery</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="fantasy" />
            <label for="fantasy">Fantasy</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="romance" />
            <label for="romance">Romance</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="Suspense" />
            <label for="Suspense">Suspense</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input type="checkbox" id="thriller" />
            <label for="thriller">Thriller</label>
          </div>
        </div>
      </form>
      <p class="text-center mt-8">
        Already have an account?
        <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes);
  },
};
</script>

<style>
.custom-checkbox label {
  display: block;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.custom-checkbox label:hover {
  border: 2px solid #bbbbbb;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
}

.custom-checkbox input:checked ~ label {
  border: 2px solid black;
}
</style>
