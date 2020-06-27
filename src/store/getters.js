"use strict";

export default {
  getParticipants(state) {
    return state.participants;
  },
  getPostponed(state) {
    return state.postponedAppointments;
  }
};
