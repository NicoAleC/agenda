import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
Vue.use(Vuex);

const state = {
  participants: [
    {
      participantId: "PART-001",
      name: "Maria  Quiroga",
      contactNumber: "4356795"
    },
    {
      participantId: "PART-002",
      name: "Pablo Rivas",
      contactNumber: "69501045"
    }],
  scheduledAppointments: [
    {
      name: "Dentist",
      description: "I need to go to dentist",
      date: "06/18/2020",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-0001",
      participants: []
    }]
};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
