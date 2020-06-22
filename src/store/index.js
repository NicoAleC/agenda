import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    participants: [
      {
        participantId: "PART-001",
        name: "Person A",
        contactNumber: "70710101"
      }
    ]
  },
  actions: {
    addParticipant({ commit }, item) {
      commit("mutateParticipantList", item);
    },
    updateParticipant({ commit }, item) {
      commit("mutateParticipantUpdate", item);
    },
    deleteParticipant({ commit }, item) {
      commit("mutateParticipantDelete", item);
    },
  },
  mutations: {
    mutateParticipantList(state, newParticipant) {
      state.participants.push(newParticipant);
    },
    mutateParticipantUpdate(state, participantId) {
      const foudAccountIndex = state.participants.findIndex(
        part => part.participantId === participantId.id
      );
      console.log(foudAccountIndex);
      state.participants[foudAccountIndex].name = participantId.name;
    },
    mutateParticipantDelete(state, code) {
      // const identification = state.participants.findIndex(
      // part => part.participantId === code
      //);
      state.participants = state.participants.filter(
        account => account.participantId !== code
      );
    }
  },
  getters: {
    getParticipants(state) {
      return state.participants;
    }
  },
  modules: {}
});
