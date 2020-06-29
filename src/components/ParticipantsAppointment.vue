<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>My Participants</v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-expansion-panels popout>
                <v-expansion-panel
                  v-for="(participant, i) in participantList"
                  :key="i"
                  hide-actions
                >
                  <v-expansion-panel-header>
                    <v-row align="center" class="spacer" no-gutters>
                      <v-col cols="5" sm="3" md="2">
                        <v-avatar color="orange">
                          <span
                            class="white--text headline"
                          >{{ participant.name | capitalizeAvatar }}</span>
                        </v-avatar>
                      </v-col>

                      <v-col class="hidden-xs-only" sm="5" md="3">
                        <strong
                          v-html="participant.name"
                          class="list-participant"
                        >{{ participant.name }}</strong>
                      </v-col>

                      <v-col class="text-no-wrap" cols="5" sm="3">
                        <strong v-html="participant.contactNumber"></strong>
                      </v-col>

                      <v-col class="grey--text text-truncate hidden-sm-and-down">
                        <v-icon
                          size="35"
                          @click="deleteParticipantToAScheduleAppointment(name,participant.participantId)"
                        >mdi-delete</v-icon>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ParticipantsAppointment",
  components: {},
  data: () => ({ valid: true, name: "Dentist" }),
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(["deleteParticipantFromAnAppointment"]),
    deleteParticipantToAScheduleAppointment(appointment, participantId) {
      let confirmation = confirm(
        "Are you sure you want to delete this participant?"
      );
      if (confirmation) {
        this.deleteParticipantFromAnAppointment({
          participantId: participantId,
          appointmentName: appointment
        });
        return true;
      } else {
        return false;
      }
    },
    reset() {
      this.$emit("close");
    }
  },
  computed: {
    ...mapGetters(["getScheduled"]),
    scheduled() {
      return this.getScheduled;
    },
    participantList: function() {
      const id = this.scheduled.findIndex(
        appointment => appointment.name === "Dentist"
      );
      if (id !== -1) {
        return this.scheduled[id].participants;
      } else {
        return [];
      }
    }
  },
  filters: {
    capitalizeAvatar: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase();
    }
  }
};
</script>
