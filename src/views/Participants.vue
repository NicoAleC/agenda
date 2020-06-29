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
              color="black"
              dark
              x-large
              outlined
              @click="sendData(selectedParticipant, true)"
              >New Participant</v-btn
            >
          </v-col>
        </v-layout>
        <v-expansion-panels popout>
          <v-expansion-panel
            v-for="(participant, i) in searching"
            :key="i"
            hide-actions
          >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="5" sm="3" md="2">
                  <v-avatar color="orange">
                    <span class="white--text headline">{{
                      participant.name | capitalizeAvatar
                    }}</span>
                  </v-avatar>
                </v-col>

                <v-col class="hidden-xs-only" sm="5" md="3">
                  <strong v-html="participant.name" class="list-participant">{{
                    participant.name
                  }}</strong>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <strong v-html="participant.contactNumber"></strong>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon
                    size="35"
                    class="mr-2"
                    @click="
                      addParticipantToAScheduleAppointment(
                        participant.name,
                        participant.contactNumber,
                        participant.participantId,
                        name
                      )
                    "
                    >mdi-plus</v-icon
                  >
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon
                    size="35"
                    class="mr-2"
                    @click="sendData(participant, false)"
                    >mdi-pencil</v-icon
                  >
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon
                    size="35"
                    @click="deleteItem(participant.participantId)"
                    >mdi-delete</v-icon
                  >
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
        >Participante creado correctamente</v-snackbar
      >

      <v-snackbar v-model="alert" color="orange" top right :timeout="timeout">
        <strong>{{
          changeName
            ? "Successfully created participant"
            : "The Participant is already in the appointment"
        }}</strong>
      </v-snackbar>
      <v-snackbar v-model="alert2" color="orange" top right :timeout="timeout">
        <strong>{{
          changeNameTwo
            ? "¡Participant successfully added to the appointment!"
            : "Participant edited correctly"
        }}</strong>
      </v-snackbar>

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
    newMovement: false,
    dialog: false,
    alert: false,
    alert2: false,

    timeout: 3000,
    changeName: null,
    changeNameTwo: null,
    name: "Dentist"
  }),
  methods: {
    ...mapActions([
      "addParticipant",
      "updateParticipant",
      "deleteParticipant",
      "addParticipantToAnAppointment"
    ]),

    addParticipantToAScheduleAppointment(name, contact, id, appointmen) {
      if (this._findParticipant(appointmen, id) == -1) {
        this.addParticipantToAnAppointment({
          name: name,
          contactNumber: contact,
          participantId: id,
          appointmentName: appointmen
        });
        this.alert2 = true;
        this.changeNameTwo = true;
      } else {
        this.alert = true;
        this.changeName = false;
      }
    },
    _findParticipant(appo, members) {
      const found = this.appointments.findIndex(
        appoint => appoint.name == appo
      );
      const appointmentFound = this.appointments[found].participants.findIndex(
        participants => participants.participantId == members
      );
      return appointmentFound;
    },
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
        participantId: newOne.participantId
      });
      this.alert = true;
      this.changeName = true;
    },
    updateNewParticipant(newOne) {
      this.updateParticipant({
        name: newOne.name,
        contactNumber: newOne.contactNumber,
        participantId: newOne.participantId
      });
      this.alert2 = true;
      this.changeNameTwo = false;
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
    ...mapGetters(["getParticipants", "getScheduled"]),
    participants() {
      return this.getParticipants;
    },
    appointments() {
      return this.getScheduled;
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
