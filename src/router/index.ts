import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

function loadView(page: string) {
  return () => import(`@/views/${page}.vue`)
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: { name: "planets" },
  },
  {
    path: "/planets",
    name: "planets",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: loadView("planets"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
