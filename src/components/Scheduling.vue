<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="605px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="text-center">
            {{ newMovement ? "New Appointment" : " Update Appointment " }}
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="scheduledAppointment.name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="scheduledAppointment.description"
                    label="Description"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menu_date"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="scheduledAppointment.date"
                        label="Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="scheduledAppointment.date"
                      @input="menu_date = false"
                      color="grey darken-1"
                      :landscape="$vuetify.breakpoint.smAndUp"
                      class="mt-4"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menu_start_hour"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="250px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="scheduledAppointment.startHour"
                        label="Start Hour"
                        v-bind="attrs"
                        v-on="on"
                        readonly
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      label="Start"
                      v-model="scheduledAppointment.startHour"
                      @input="menu_start_hour = false"
                      class="mt-4"
                      format="24hr"
                      :max="scheduledAppointment.endHour"
                      color="grey darken-1"
                      :landscape="$vuetify.breakpoint.mdAndUp"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menu_end_hour"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="250px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="scheduledAppointment.endHour"
                        label="End Hour"
                        v-bind="attrs"
                        v-on="on"
                        readonly
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      label="End"
                      v-model="scheduledAppointment.endHour"
                      @input="menu_end_hour = false"
                      class="mt-4"
                      format="24hr"
                      :min="scheduledAppointment.startHour"
                      color="grey darken-1"
                      :landscape="$vuetify.breakpoint.mdAndUp"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="scheduledAppointment.participants"
                    :items="getParticipantsList()"
                    attach
                    chips
                    label="Add Participants"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" outlined color="indigo" text @click="cancel"
              >Cancel</v-btn
            >
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              text
              v-if="newMovement"
              @click="addAppointment()"
              >{{ "SAVE" }}</v-btn
            >
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              text
              v-if="!newMovement"
              @click="updateAppointment()"
              >{{ "UPDATE" }}</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Scheduling",
  data: () => ({
    valid: true,
    menu_date: false,
    showCurrent: true,
    menu_end_hour: false,
    menu_start_hour: false
  }),
  props: {
    newMovement: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    scheduledAppointment: {
      type: Object,
      default: function() {
        return {
          id: "",
          name: "",
          description: "",
          date: new Date().toISOString().substr(0, 10),
          startHour: "",
          endHour: "",
          agendaId: "",
          participants: []
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getScheduledAppointments"]),
    ...mapGetters(["getParticipants"]),

    scheduledAppointments() {
      return this.getScheduledAppointments;
    },
    participants() {
      return this.getParticipants;
    }
  },
  methods: {
    addAppointment: function() {
      if (this._validateData()) {
        this.$emit("addAppointment", {
          id: this.getAppointmentId(),
          name: this.scheduledAppointment.name,
          description: this.scheduledAppointment.description,
          date: this.scheduledAppointment.date,
          startHour: this.scheduledAppointment.startHour,
          endHour: this.scheduledAppointment.endHour,
          participants: this.scheduledAppointment.participants
        });
      } else {
        alert("You must complete all fields");
      }
      this.cancel();
    },
    updateAppointment: function() {
      if (this._validateData()) {
        this.$emit("updateAppointment", {
          id: this.scheduledAppointment.id,
          name: this.scheduledAppointment.name,
          description: this.scheduledAppointment.description,
          date: this.scheduledAppointment.date,
          startHour: this.scheduledAppointment.startHour,
          endHour: this.scheduledAppointment.endHour
        });
      } else {
        alert("You must complete all fields");
      }

      this.cancel();
    },

    cancel() {
      this.$emit("close");
      this.scheduledAppointment.name = "";
      this.scheduledAppointment.description = "";
      this.scheduledAppointment.date = "";
      this.scheduledAppointment.startHour = "";
      this.scheduledAppointment.endHour = "";
    },

    getAppointmentId: function() {
      let newId = 1;
      let numberOfAppointments = this.scheduledAppointments.length;
      if (numberOfAppointments > 0) {
        let lastId = this.scheduledAppointments[numberOfAppointments - 1].id;
        newId = parseInt(lastId.split("-")[1]) + 1;
      }
      return "APP-" + newId;
    },

    getParticipantsList: function() {
      let list = [];
      this.participants.forEach(element => {
        list.push(element.name);
      });
      return list;
    },

    _validateData() {
      return (
        this.scheduledAppointment.name !== "" &&
        this.scheduledAppointment.description !== "" &&
        this.scheduledAppointment.date !== "" &&
        this.scheduledAppointment.startHour !== "" &&
        this.scheduledAppointment.endHour !== ""
      );
    }
  }
};
</script>
<style></style>
