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
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
      description: "Must pickup Amazon items"
    },{
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
      description: "Must pickup Amazon items"
    },{
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
      description: "Must pickup Amazon items"
    },{
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
      description: "Must pickup Amazon items"
    },{
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
      description: "Must pickup Amazon items"
    },{
      name: "Dentist",
      description: "I need to go to dentist"
    },
    {
      name: "Amazon",
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
