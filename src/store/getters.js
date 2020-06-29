"use strict";

export default {
  getParticipants(state) {
    return state.participants;
  },
  getPostponed(state) {
    return state.postponedAppointments;
  },
  getScheduledAppointments(state) {
    return state.scheduledAppointments;
  },
  getAgendas(state){
    return state.agendas;
  }
};
