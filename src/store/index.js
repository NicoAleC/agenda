import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
Vue.use(Vuex);

const state = {
  agendas: [
    {
      agendaId: "ANG-0001",
      name: "Work",
      description: "My Agenda to manage my workd",
      startHour: "10:00",
      endHour: "16:00"
    },
    {
      agendaId: "ANG-0002",
      name: "Hobby",
      description: "My Agenda to manage Hobbies",
      startHour: "9:00",
      endHour: "10:00"
    }
  ],
  participants: [
    {
      participantId: "PART-001",
      name: "Mariana",
      contactNumber: "4356795"
    },
    {
      participantId: "PART-002",
      name: "Pablo Rivas",
      contactNumber: "69501045"
    }
  ],
  scheduledAppointments: [
    {
      name: "Dentist",
      description: "I need to go to dentist",
      date: "06/18/2020",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-0001",
      participants: []
    },
    {
      name: "Soccer Practice",
      description: "I must go to soccer practice",
      date: "06/19/2020",
      startHour: "8:00",
      endHour: "10:00",
      agendaId: "ANG-0001",
      participants: []
    }
  ],
  postponedAppointments: [
    {
      id: 0,
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      id: 1,
      name: "Amazon",
      description: "Must pickup Amazon items"
    },
    {
      id: 2,
      name: "Dentist 1",
      description: "I need to go to dentist"
    },
    {
      id: 3,
      name: "Amazon 1",
      description: "Must pickup Amazon items"
    }
  ]
};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
