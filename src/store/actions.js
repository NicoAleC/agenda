" use strict";

const addAgenda = ({ commit }, newAgenda) => {
  commit("mutateaddAgenda", newAgenda);
};

const deleteAgenda = ({ commit }, agendaID) => {
  commit("mutatedeleteAgenda", agendaID);
};

const idlooked = ({ commit }, agendaLookde) => {
  commit("mutateLookedAgenda", agendaLookde);
};

const updateAgenda = ({ commit }, agendaLookde) => {
  commit("mutateupdateAgenda", agendaLookde);
};
const addParticipant = ({ commit }, item) => {
  commit("mutateParticipantList", item);
};
const updateParticipant = ({ commit }, item) => {
  commit("mutateParticipantUpdate", item);
};
const deleteParticipant = ({ commit }, deletepart) => {
  commit("mutateParticipantDelete", deletepart);
};
const addParticipantToAnAppointment = ({ commit }, addAppointment) => {
  commit("mutateParticipantAddAppointment", addAppointment);
};
const deleteParticipantFromAnAppointment = ({ commit }, addAppointment) => {
  commit("mutateParticipantDeleteAppointment", addAppointment);
};

export default {
  addAgenda,
  deleteAgenda,
  idlooked,
  updateAgenda,
  addParticipant,
  updateParticipant,
  deleteParticipant,
  addParticipantToAnAppointment,
  deleteParticipantFromAnAppointment,



  addScheduledAppointment({ commit }, appointmentToAdd) {
    commit("mutateScheduledAppointmentList", appointmentToAdd);
  },
  updateScheduledAppointment({ commit }, appointmentToUpdate) {
    commit("mutateUpdateAppointment", appointmentToUpdate);
  },
  deleteScheduledAppointment({ commit }, appointmentToDelete) {
    commit("mutateDeleteAppointment", appointmentToDelete);
  },


  addPostponed({ commit }, newPostponed) {
    commit("mutateAddPostponed", newPostponed);
  },
  updatePostponed({ commit }, upPostponed) {
    commit("mutateUpdatePostponed", upPostponed);
  },
  deletePostponed({ commit }, delPostponed) {
    commit("mutateDeletePostponed", delPostponed);
  },
  addAppointmentsToAgendas({ commit }, appointmentToAdd) {
    commit("mutateAddAppointmentsToAgendas", appointmentToAdd);
  }
};
