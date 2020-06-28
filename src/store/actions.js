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
    deleteParticipantFromAnAppointment({ commit }, addAppointment) {
        commit("mutateParticipantDeleteAppointment", addAppointment);
    },

};