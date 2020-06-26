import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Participants from "../views/Participants.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/participants",
    name: "Participants",
    component: Participants
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: () => import("../views/Appointments.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
