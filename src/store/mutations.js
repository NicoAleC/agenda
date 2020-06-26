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
    mutateScheduledAppointmentList(state, appointmentToAdd) {
        state.scheduledAppointments.push(appointmentToAdd);
      },
    
    mutateUpdateAppointment(state, appointmentToUpdate) {
        const FoundAppointment = state.scheduledAppointments.findIndex(
          appointment => appointment.name === appointmentToUpdate.name
        );
    
        state.scheduledAppointments[FoundAppointment].name =
          appointmentToUpdate.name;
        state.scheduledAppointments[FoundAppointment].description =
          appointmentToUpdate.description;
        state.scheduledAppointments[FoundAppointment].date =
          appointmentToUpdate.date;
        state.scheduledAppointments[FoundAppointment].startHour =
          appointmentToUpdate.startHour;
        state.scheduledAppointments[FoundAppointment].endHour =
          appointmentToUpdate.endHour;
      },
      mutateDeleteAppointment(state, deleteScheduledAppointment) {
        state.scheduledAppointments = state.scheduledAppointments.filter(
          appointment => appointment.name !== deleteScheduledAppointment.name
        );
      }
};