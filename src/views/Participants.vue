<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <h1 id="participants-title">Participants</h1>

      <v-row justify="center">
        <v-layout row justify-space-around>
          <v-col class="text-left">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by Name or Phone"
              outlined
              autocomplete="off"
              rounded
            ></v-text-field>
          </v-col>

          <v-col class="text-right">
            <v-btn
              color="primary"
              dark
              x-large
              class="ma-2"
              @click="sendData(selectedParticipant,true)"
            >New Participant</v-btn>
          </v-col>
        </v-layout>
        <v-expansion-panels popout>
          <v-expansion-panel v-for="(participant, i) in searching" :key="i" hide-actions>
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="5" sm="3" md="2">
                  <v-avatar color="orange">
                    <span class="white--text headline">{{ participant.name | capitalizeAvatar }}</span>
                  </v-avatar>
                </v-col>

                <v-col class="hidden-xs-only" sm="5" md="3">
                  <strong v-html="participant.name" class="list-participant">{{ participant.name }}</strong>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <strong v-html="participant.contactNumber"></strong>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon size="35" class="mr-2" @click="sendData(participant,false)">mdi-plus</v-icon>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon size="35" class="mr-2" @click="sendData(participant,false)">mdi-pencil</v-icon>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon size="35" @click="deleteItem(participant.participantId)">mdi-delete</v-icon>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-snackbar
        v-model="alert"
        type="success"
        color="primary"
        top
        right
        :timeout="timeout"
      >Participante creado correctamente</v-snackbar>
      <ParticipantsDialog
        :selectedParticipant="selectedParticipant"
        :newMovement="newMovement"
        :dialog="dialog"
        @close="dialog = false"
        @addNewParticipant="addNewParticipant"
        @updateNewParticipant="updateNewParticipant"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ParticipantsDialog from "@/components/ParticipantsDialog.vue";

export default {
  name: "App",

  components: {
    ParticipantsDialog
  },

  data: () => ({
    selectedParticipant: {},
    search: "",
    idparticipant: "",
    newMovement: false,
    dialog: false,
    participantindex: null,
    alert: false,
    timeout: 3000
  }),
  methods: {
    ...mapActions(["addParticipant", "updateParticipant", "deleteParticipant"]),

    deleteItem(idparticipant) {
      let confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        this.deleteParticipant({
          participantId: idparticipant
        });
        return true;
      } else {
        return false;
      }
    },
    findIndex(code) {
      const identification = this.participants.findIndex(
        part => part.participantId === code
      );
      console.log(identification);
      return identification;
    },
    firstElement(name) {
      let first = name.charAt(0);
      return first;
    },
    sendData(selectedParticipant, newMovement) {
      this.selectedParticipant = {
        ...selectedParticipant
      };
      this.dialog = true;
      this.newMovement = newMovement;
    },
    addNewParticipant(newOne) {
      this.addParticipant({
        name: newOne.name,
        contactNumber: newOne.contactNumber,
        participantId: newOne.participantId,
        index: this.findIndex(newOne.participantId)
      });
      this.alert = true;
      console.log(this.findIndex(newOne.participantId));
    },
    updateNewParticipant(newOne) {
      this.updateParticipant({
        name: newOne.name,
        contactNumber: newOne.contactNumber,
        participantId: newOne.participantId
      });
    }
  },
  filters: {
    capitalizeAvatar: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase();
    }
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participants() {
      return this.getParticipants;
    },
    searching: function() {
      if (this.search !== "") {
        const searchs = this.search.toLowerCase();
        return this.participants.filter(part => {
          return (
            part.name.toLowerCase().indexOf(searchs) >= 0 ||
            part.contactNumber.toLowerCase().indexOf(searchs) >= 0
          );
        });
      } else {
        return this.participants;
      }
    }
  }
};
</script>
