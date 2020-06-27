import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Participants from "../views/Participants.vue";
import Postponed from "../views/PostAppointment.vue";

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
    path: "/postponed",
    name: "Postponed",
    component: Postponed
  }
];

const router = new VueRouter({
  routes
});

export default router;
