import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import SavedBooks from "../views/SavedBooks.vue";
import Library from "../views/Library.vue";
import BookDetails from "../views/BookDetails.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import { projectAuth } from "@/firebase/config";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/saved-books",
      name: "SavedBooks",
      component: SavedBooks,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/library",
      name: "Library",
      component: Library,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/books/:title",
      name: "BookDetails",
      component: BookDetails,
      props: { book: true },
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  // Check if the route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // Check auth state
    let user = projectAuth.currentUser;
    if (user) {
      // User is signed in, continue as normal
      next();
    } else {
      // No user is detected
      next({ name: "SignIn" });
    }
  } else {
    next();
  }
});

export default router;
