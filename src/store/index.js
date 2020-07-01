import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  idToPass: "",
  agendas: [
    {
      agendaId: "ANG-1",
      name: "Work",
      description: "My Agenda to manage my workd",
      startHour: "08:00",
      endHour: "20:00",
      appointments: [
        {
          id: "APP-1",
          name: "Dentist",
          description: "I need to go to dentist",
          date: "2020-06-18",
          startHour: "10:00",
          endHour: "11:00",
          agendaId: "ANG-1",
          participants: [
            {
              participantId: "PART-003",
              name: "Andy Villarroel",
              contactNumber: "77905861"
            }
          ]
        }
      ]
    },
    {
      agendaId: "ANG-2",
      name: "Home",
      description: "My Agenda to manage home",
      startHour: "05:00",
      endHour: "22:00",
      appointments: [
        {
          id: "APP-2",
          name: "Doctor",
          description: "I need to go to the hospital",
          date: "2020-06-20",
          startHour: "15:00",
          endHour: "20:00",
          agendaId: "ANG-2",
          participants: []
        }
      ]
    }
  ],
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
    },
    {
      participantId: "PART-003",
      name: "Andy Villarroel",
      contactNumber: "77905861"
    }
  ],
  scheduledAppointments: [
    {
      id: "APP-1",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-18",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-1",

      participants: [
        {
          participantId: "PART-003",
          name: "Andy Villarroel",
          contactNumber: "77905861"
        }
      ]
    },
    {
      id: "APP-2",
      name: "Doctor",
      description: "I need to go to the hospital",
      date: "2020-06-20",
      startHour: "15:00",
      endHour: "20:00",
      agendaId: "ANG-2",

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
      name: "PickUps",
      description: "Must pickup Amazon items"
    },
    {
      id: 2,
      name: "Deposit",
      description: "I need to deposit cash"
    },
    {
      id: 3,
      name: "Opening Krusty Krab 2",
      description: "Attend to the inaguration of KK2"
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
