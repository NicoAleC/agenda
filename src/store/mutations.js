" use strict";

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

  mutateParticipantAddAppointment(state, addAppoint) {
    const foundAccountIndex = state.scheduledAppointments.findIndex(
      part => part.id === addAppoint.appointmentName
    );
    console.log("Index" + foundAccountIndex);
    state.scheduledAppointments[foundAccountIndex].participants.push({
      participantId: addAppoint.participantId,
      name: addAppoint.name,
      contactNumber: addAppoint.contactNumber
    });
  },

  mutateParticipantDelete(state, code) {
    let appointments = state.scheduledAppointments;
    let participantFound;
    appointments.forEach(appoint => {
      appoint.participants.forEach(myParticipants => {
        if (code.participantId == myParticipants.participantId) {
          participantFound = myParticipants.participantId;
        }
      });
    });
    if (participantFound == undefined) {
      state.participants = state.participants.filter(
        account => account.participantId !== code.participantId
      );
    } else {
      alert("The participant is on an appointment therefore cannot be removed");
    }
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
    state.scheduledAppointments[
      deleteAppoint.appointmentName
    ].participants = state.scheduledAppointments[
      deleteAppoint.appointmentName
    ].participants.filter(
      appoint => appoint.participantId !== deleteAppoint.participantId
    );
  },
  mutateAddPostponed(state, addPost) {
    state.postponedAppointments.push(addPost);
  },
  mutateUpdatePostponed(state, updatedPost) {
    const toUpdate = state.postponedAppointments.findIndex(
      post => post.id === updatedPost.id
    );
    if (toUpdate >= 0) {
      state.postponedAppointments.splice(toUpdate, 1, updatedPost);
    }
  },
  mutateDeletePostponed(state, deletePost) {
    state.postponedAppointments = state.postponedAppointments.filter(
      post => post.id !== deletePost.id
    );
  },
  mutateAddAppointmentsToAgendas(state, appointmentToAdd) {
    const index = state.agendas.findIndex(
      agenda => agenda.agendaId === appointmentToAdd.agendaId
    );
    if (index > -1) {
      state.agendas[index].appointments.push(appointmentToAdd);
    }
  },
};
