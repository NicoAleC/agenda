"use strict";

const mutateaddAgenda = (state, newAgenda) => {
  state.agendas.push(newAgenda);
  alert("Created Agenda :" + newAgenda.name);
};

const mutatedeleteAgenda = (state, agendaID) => {
  var indexOfItem;
  const value = state.agendas.find(item => item.agendaId === agendaID);
  indexOfItem = state.agendas.indexOf(value);
  if (value !== null) {
    state.agendas.splice(indexOfItem, 1);
  }
  state.idToPass = "";
  alert("Deleted Agenda :" + agendaID);
};
const mutateupdateAgenda = (state, toUpdateAgenda) => {
  state.agendas.forEach(updateAgenda => {
    if (updateAgenda.agendaId === toUpdateAgenda.agendaId) {
      updateAgenda.name = toUpdateAgenda.name;
      updateAgenda.description = toUpdateAgenda.description;
      updateAgenda.startHour = toUpdateAgenda.startHour;
      updateAgenda.endHour = toUpdateAgenda.endHour;
    }
  });
  alert("Updated name Account to:" + toUpdateAgenda.name);
};

const mutateLookedAgenda = (state, lookedAgenda) => {
  state.idToPass = lookedAgenda;
};
export default {
  mutateaddAgenda,
  mutatedeleteAgenda,
  mutateLookedAgenda,
  mutateupdateAgenda,
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

  mutateScheduledAppointmentList(state, appointmentToAdd) {
    state.scheduledAppointments.push(appointmentToAdd);
  },

  mutateUpdateAppointment(state, appointmentToUpdate) {
    const index = state.scheduledAppointments.findIndex(
      appointment => appointment.id === appointmentToUpdate.id
    );
    if (index > -1) {
      state.scheduledAppointments[index] = appointmentToUpdate;
    }
  },
  mutateDeleteAppointment(state, deleteScheduledAppointment) {
    state.scheduledAppointments = state.scheduledAppointments.filter(
      appointment => appointment.id !== deleteScheduledAppointment
    );
  },

  mutateParticipantDeleteAppointment(state, deleteAppoint) {
    const foundAccountIndex = state.scheduledAppointments.findIndex(
      part => part.name === deleteAppoint.appointmentName
    );
    state.scheduledAppointments[
      foundAccountIndex
    ].participants = state.scheduledAppointments[
      foundAccountIndex
    ].participants.filter(
      appoint => appoint.participantId !== deleteAppoint.participantId
    );
  }
};
