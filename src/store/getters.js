"use strict";

const getAgendas = state => {
  return state.agendas;
};
const getIdAgendas = state => {
  return state.idManagement;
};
const getIdLooked = state => {
  return state.idToPass;
};
export default {
  getAgendas,
  getIdAgendas,
  getIdLooked
};
