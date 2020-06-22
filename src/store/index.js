import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    participants: [
      {
        participantId: "PART-001",
        name: "Mariana",
        contactNumber: "4356795"
      },
      {
        participantId: "PART-002",
        name: "Pablo Rivas",
        contactNumber: "69501045"
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
    deleteParticipant({ commit }, deletepart) {
      commit("mutateParticipantDelete", deletepart);
    }
  },
  mutations: {
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
    }
  },
  getters: {
    getParticipants(state) {
      return state.participants;
    }
  },
  modules: {}
});
