"use strict";

export default {
    getParticipants(state) {
        return state.participants;
    },
    getScheduled(state) {
        return state.scheduledAppointments;
    }
};