" use strict";

const getAgendas = state => {
  return state.agendas;
};
const getIdAgendas = state => {
  return state.idManagement;
};
const getIdLooked = state => {
  return state.idToPass;
};
const getParticipants = state => {
  return state.participants;
};

export default {
  getAgendas,
  getIdAgendas,
  getIdLooked,
  getParticipants,


  getScheduledAppointments(state) {
    return state.scheduledAppointments;
  },
  getPostponed(state) {
    return state.postponedAppointments;
  }
};
