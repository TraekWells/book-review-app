<template>
  <article class="sign-up bg-gray-100 py-12">
    <div class="container">
      <form
        @submit.prevent="signUp"
        class="bg-white p-10 rounded-md shadow-md w-1/3 mx-auto"
      >
        <h1 class="text-center mb-8">Sign Up</h1>
        <div class="form-field flex flex-col mb-4">
          <label for="email" class="mb-3">Email Address</label>
          <input
            type="text"
            id="email"
            class="p-3 bg-gray-100 rounded"
            placeholder="Enter your email address"
            v-model="email"
          />
          <p v-if="emailFeedback" class="text-red-700 text-sm">
            {{ emailFeedback }}
          </p>
        </div>
        <div class="form-field flex flex-col mb-4">
          <label for="password" class="mb-3">Password</label>
          <input
            type="password"
            id="password"
            class="p-3 bg-gray-100 rounded"
            placeholder="*******"
            v-model="password"
          />
          <p v-if="passwordFeedback" class="text-red-700 text-sm">
            {{ passwordFeedback }}
          </p>
        </div>
        <div class="form-field flex flex-col mb-4">
          <label for="password" class="mb-3">Confirm Password</label>
          <input
            type="password"
            id="password"
            class="p-3 bg-gray-100 rounded"
            placeholder="*******"
            v-model="confirmPassword"
          />
        </div>
        <h3 class="text-xl my-4">Favorite Genres</h3>
        <div class="favorite-genres grid grid-cols-3 gap-4 text-center mb-4">
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="action"
              value="action"
              v-model="genres"
            />
            <label for="action">Action</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="horror"
              value="horror"
              v-model="genres"
            />
            <label for="horror">Horror</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="adventure"
              value="adventure"
              v-model="genres"
            />
            <label for="adventure">Adventure</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="sci-fi"
              value="sci-fi"
              v-model="genres"
            />
            <label for="sci-fi">Sci-Fi</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="fiction"
              value="fiction"
              v-model="genres"
            />
            <label for="fiction">Fiction</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="comics"
              value="comics"
              v-model="genres"
            />
            <label for="comics">Comics</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="mystery"
              value="mystery"
              v-model="genres"
            />
            <label for="mystery">Mystery</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="fantasy"
              value="fantasy"
              v-model="genres"
            />
            <label for="fantasy">Fantasy</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="romance"
              value="romance"
              v-model="genres"
            />
            <label for="romance">Romance</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="Suspense"
              value="suspense"
              v-model="genres"
            />
            <label for="Suspense">Suspense</label>
          </div>
          <div class="form-field custom-checkbox mb-4">
            <input
              type="checkbox"
              id="thriller"
              value="thriller"
              v-model="genres"
            />
            <label for="thriller">Thriller</label>
          </div>
        </div>
        <button class="border border-gray-200 p-3 w-full rounded-md">
          Sign Up
        </button>
      </form>
      <p class="text-center mt-8">
        Already have an account?
        <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
      </p>
    </div>
  </article>
</template>

<script>
import { projectFirestore, projectAuth } from "@/firebase/config";

export default {
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      emailFeedback: null,
      passwordFeedback: null,
      genres: [],
    };
  },
  methods: {
    signUp() {
      if (!this.email) {
        this.emailFeedback = "Please enter an email address";
      } else if (!this.password) {
        this.passwordFeedback = "Please enter a password";
      } else if (this.password !== this.confirmPassword) {
        this.passwordFeedback = "Passwords don't match";
      } else {
        let reference = projectFirestore.collection("users").doc(this.email);
        reference.get().then((doc) => {
          if (doc.exists) {
            this.emailFeedback = "This email already exists";
          } else {
            projectAuth
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                reference
                  .set({
                    bookshelf: null,
                    favoriteGenres: this.genres,
                    library: null,
                    user_id: cred.user.uid,
                  })
                  .then(() => {
                    this.$router.push({ name: "Home" });
                  });
              })
              .catch((err) => {
                console.log(err);
                this.passwordFeedback = err.message;
              });
            this.emailFeedback = "This email is free to use";
          }
        });
      }
    },
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
