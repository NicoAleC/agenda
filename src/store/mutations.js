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
        /* let foudAccountIndex = 0;
         while (foudAccountIndex == 0) {
             if (state.scheduledAppointments[foudAccountIndex].participants.length === 0) {
                 console.log(state.scheduledAppointments[foudAccountIndex].participants.length);
                
             } else {
                 foudAccountIndex++;
             }
         }*/

        state.participants = state.participants.filter(
            account => account.participantId !== code.participantId
        );

    },
    mutateParticipantAddAppointment(state, addAppoint) {
        const foundAccountIndex = state.scheduledAppointments.findIndex(
            part => part.name === addAppoint.appointmentName
        );
        // console.log("Index" + foundAccountIndex);
        state.scheduledAppointments[foundAccountIndex].participants.push({
            participantId: addAppoint.participantId,
            name: addAppoint.name,
            contactNumber: addAppoint.contactNumber
        });
    },
    mutateParticipantDeleteAppointment(state, deleteAppoint) {
        const foundAccountIndex = state.scheduledAppointments.findIndex(
            part => part.name === deleteAppoint.appointmentName
        );
        state.scheduledAppointments[foundAccountIndex].participants = state.scheduledAppointments[
            foundAccountIndex
        ].participants.filter(appoint => appoint.participantId !== deleteAppoint.participantId);
    }
};