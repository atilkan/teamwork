import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

function loadView(page: string) {
  // This makes views lazy loaded
  // Also no need to import every view manually
  return () => import(`@/views/${page}.vue`)
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: { name: "users" },
  },
  {
    path: "/users",
    name: "users",
    component: loadView("users"),
  },
  {
    path: "*",
    name: "four-o-four",
    component: loadView("four-o-four"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
