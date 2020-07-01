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

const addScheduledAppointment = ({ commit }, appointmentToAdd) => {
  commit("mutateScheduledAppointmentList", appointmentToAdd);
};

const updateScheduledAppointment = ({ commit }, appointmentToUpdate) => {
  commit("mutateUpdateAppointment", appointmentToUpdate);
};

const deleteScheduledAppointment = ({ commit }, appointmentToDelete) => {
  commit("mutateDeleteAppointment", appointmentToDelete);
};

const addAppointmentsToAgendas = ({ commit }, appointmentToAdd) => {
  commit("mutateAddAppointmentsToAgendas", appointmentToAdd);
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
  addScheduledAppointment,
  updateScheduledAppointment,
  deleteScheduledAppointment,
  addAppointmentsToAgendas,

  addPostponed({ commit }, newPostponed) {
    commit("mutateAddPostponed", newPostponed);
  },
  updatePostponed({ commit }, upPostponed) {
    commit("mutateUpdatePostponed", upPostponed);
  },
  deletePostponed({ commit }, delPostponed) {
    commit("mutateDeletePostponed", delPostponed);
  }
};
