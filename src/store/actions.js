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