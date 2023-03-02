import { createRouter, createWebHistory } from '@ionic/vue-router';
import InProcessTodosView from "@/views/InProcessTodosView.vue";
import IsDoneTodosView from "@/views/IsDoneTodosView.vue";
import CurrenciesView from "@/views/СurrenciesView.vue";
import MapView from "@/views/MapView.vue";

const routes = [
  {
    path: "/",
    redirect: {name: "inProcess"},
  },
  {
    path: '/in-process',
    name: "inProcess",
    component: InProcessTodosView,
  },
  {
    path: '/is-done',
    name: "isDone",
    component: IsDoneTodosView,
  },
  {
    path: '/currencies',
    name: "currencies",
    component: CurrenciesView,
  },
  {
    path: '/map',
    name: "map",
    component: MapView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
