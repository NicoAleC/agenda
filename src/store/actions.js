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
    }
};