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

export default {
  addAgenda,
  deleteAgenda,
  idlooked,
  updateAgenda,
  addParticipant({ commit }, item) {
    commit("mutateParticipantList", item);
  },
  updateParticipant({ commit }, item) {
    commit("mutateParticipantUpdate", item);
  },
  deleteParticipant({ commit }, deletepart) {
    commit("mutateParticipantDelete", deletepart);
  },
  addParticipantToAnAppointment({ commit }, addAppointment) {
    commit("mutateParticipantAddAppointment", addAppointment);
  },

  addScheduledAppointment({ commit }, appointmentToAdd) {
    commit("mutateScheduledAppointmentList", appointmentToAdd);
  },
  updateScheduledAppointment({ commit }, appointmentToUpdate) {
    commit("mutateUpdateAppointment", appointmentToUpdate);
  },
  deleteScheduledAppointment({ commit }, appointmentToDelete) {
    commit("mutateDeleteAppointment", appointmentToDelete);
  },

  deleteParticipantFromAnAppointment({ commit }, addAppointment) {
    commit("mutateParticipantDeleteAppointment", addAppointment);
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
