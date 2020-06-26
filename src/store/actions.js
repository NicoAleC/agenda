/* eslint-disable prettier/prettier */
"use strict";

export default {
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
    }
};