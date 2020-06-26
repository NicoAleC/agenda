"use strict";

const addAgenda = ({ commit }, newAgenda) => {
  commit("mutateaddAgenda", newAgenda);
};

const deleteAgenda = ({ commit }, agendaID) => {
  commit("mutatedeleteAgenda", agendaID);
};

const idlooked = ({ commit }, agendaLookde) => {
  commit("mutateLookedAgenda", agendaLookde);
};

const updateAgenda = ({ commit }, agendaLookde) => {
  commit("mutateupdateAgenda", agendaLookde);
};

export default {
  addAgenda,
  deleteAgenda,
  idlooked,
  updateAgenda
};
