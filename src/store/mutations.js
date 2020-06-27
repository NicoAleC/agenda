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
  mutateupdateAgenda
};
