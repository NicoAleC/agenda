import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Participants from "../views/Participants.vue";
import Postponed from "../views/PostAppointment.vue";
import Test from "../views/Test.vue";
import Appointments from "../views/Appointments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/participants/:id",
    name: "Participants",
    component: Participants
  },
  {
    path: "/postponed",
    name: "Postponed",
    component: Postponed
  },
  {
    path: "/appointments/:agendaId",
    name: "Appointments",
    component: Appointments
    //component: () => import("../views/Appointments.vue")
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: Appointments
    //component: () => import("../views/Appointments.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  }
];

const router = new VueRouter({
  routes
});

export default router;
