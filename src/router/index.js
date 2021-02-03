import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import SavedBooks from "../views/SavedBooks.vue";
import Library from "../views/Library.vue";
import BookDetails from "../views/BookDetails.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/saved-books",
    name: "SavedBooks",
    component: SavedBooks,
  },
  {
    path: "/library",
    name: "Library",
    component: Library,
  },
  {
    path: "/books/:title",
    name: "BookDetails",
    component: BookDetails,
    props: { book: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
