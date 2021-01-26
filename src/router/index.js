import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import SavedBooks from "../views/SavedBooks.vue";
import Library from "../views/Library.vue";

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
