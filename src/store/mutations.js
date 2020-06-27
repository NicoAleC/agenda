/* eslint-disable prettier/prettier */
"use strict";

export default {
    mutateParticipantList(state, newParticipant) {
        state.participants.push(newParticipant);
    },

    mutateParticipantUpdate(state, participantId) {
        const foudAccountIndex = state.participants.findIndex(
            part => part.participantId === participantId.participantId
        );
        state.participants[foudAccountIndex].name = participantId.name;
        state.participants[foudAccountIndex].contactNumber =
            participantId.contactNumber;
    },
    mutateParticipantDelete(state, code) {

        state.participants = state.participants.filter(
            account => account.participantId !== code.participantId
        );
    },
    mutateParticipantAddAppointment(state, addAppoint) {
        const foundAccountIndex = state.participants.findIndex(
            part => part.participantId === addAppoint.participantId
        );
        state.scheduledAppointments[foundAccountIndex].participants.push({
            participantId: addAppoint.participantId,
            name: addAppoint.name,
            contactNumber: addAppoint.contactNumber
        });
    },
    mutateAddPostponed(state, addPost) {
        state.postponedAppointments.push(addPost);
    },
    mutateUpdatePostponed(state, updatedPost) {
        const toUpdate = state.postponedAppointments.findIndex(post => post.name === updatedPost.name);
        if (toUpdate >= 0) {
            state.postponedAppointments.splice(toUpdate,1,updatedPost);
        }
    },
    mutateDeletePostponed(state, deletePost) {
        state.postponedAppointments = state.postponedAppointments.filter(post => post.name !== deletePost.name);
    }
};