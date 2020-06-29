<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="605px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title
            class="text-center"
          >{{ newMovement ? "New Appointment" : " Update Appointment " }}</v-card-title>
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
                      :landscape="true"
                      class="mt-4"
                      min="2020-06-10"
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
                      :min="agenda_start_hour"
                      color="grey darken-1"
                      :landscape="true"
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
                      :max="agenda_end_hour"
                      color="grey darken-1"
                      :landscape="true"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-select v-model="scheduledAppointment.agendaId" label="Agenda"></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" outlined color="indigo" text @click="cancel">Cancel</v-btn>
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              text
              v-if="_validateData() && newMovement"
              @click="addAppointment()"
            >{{ "SAVE" }}</v-btn>
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              text
              v-if="!newMovement"
              @click="updateAppointment()"
            >{{ "UPDATE" }}</v-btn>
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
    now: new Date().toISOString().substr(0, 10),
    menu_date: false,
    showCurrent: true,
    menu_end_hour: false,
    menu_start_hour: false,
    agenda_start_hour: "5:00",
    agenda_end_hour: "23:30"
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

    participant_list() {
      return this.getParticipants;
    },

    selectOptions() {
      return this.getParticipants.map(participant => participant.name);
    },

    getParticipantsList: function() {
      let list = [];
      this.participants.forEach(element => {
        list.push(element.name);
      });
      return list;
    }
  },
  methods: {
    addAppointment: function() {
      if (this._validateData()) {
        if (
          this._validateStartAndEndHour(
            this.scheduledAppointment.startHour,
            this.scheduledAppointment.endHour
          ) &&
          this._validateAgendaHours(
            this.agenda_start_hour,
            this.agenda_end_hour,
            this.scheduledAppointment.startHour,
            this.scheduledAppointment.endHour
          )
        ) {
          if (this._validateDateFormat(this.scheduledAppointment.date)) {
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
            alert("You cannot enter an appointments on a past date");
          }
        } else {
          alert(
            "The time format inserted for the start and end of the appointment is incorrect."
          );
        }
      } else {
        alert("You must complete all fields.");
      }
      this.cancel();
    },

    updateAppointment: function() {
      this._validateDateFormat();
      if (this._validateData()) {
        if (
          this._validateStartAndEndHour(
            this.scheduledAppointment.startHour,
            this.scheduledAppointment.endHour
          ) &&
          this._validateAgendaHours(
            this.agenda_start_hour,
            this.agenda_end_hour,
            this.scheduledAppointment.startHour,
            this.scheduledAppointment.endHour
          )
        ) {
          if (this._validateDateFormat(this.scheduledAppointment.date)) {
            this.$emit("updateAppointment", {
              id: this.scheduledAppointment.id,
              name: this.scheduledAppointment.name,
              description: this.scheduledAppointment.description,
              date: this.scheduledAppointment.date,
              startHour: this.scheduledAppointment.startHour,
              endHour: this.scheduledAppointment.endHour
            });
          } else {
            alert("You cannot enter an appointments on a past date");
          }
        } else {
          alert(
            "The time format inserted for the start and end of the appointment is incorrect."
          );
        }
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

    _validateData() {
      return (
        this.scheduledAppointment.name !== "" &&
        this.scheduledAppointment.description !== "" &&
        this.scheduledAppointment.date !== "" &&
        this.scheduledAppointment.startHour !== "" &&
        this.scheduledAppointment.endHour !== ""
      );
    },

    _validateStartAndEndHour(startHour, endHour) {
      let start = startHour.split(":");
      let end = endHour.split(":");
      //hour[0], minutes[1] -> 24h format
      return (
        (parseInt(start[0]) === parseInt(end[0]) &&
          parseInt(start[1]) < parseInt(end[1])) ||
        parseInt(start[0]) < parseInt(end[0])
      );
    },

    _validateAgendaHours(agenda_start, agenda_end, app_start, app_end) {
      let ag_start = agenda_start.split(":");
      let ag_end = agenda_end.split(":");
      let start = app_start.split(":");
      let end = app_end.split(":");
      return (
        ((parseInt(ag_start[0]) === parseInt(start[0]) &&
          parseInt(start[1]) >= parseInt(ag_start[1])) ||
          parseInt(ag_start[0]) < parseInt(start[0])) &&
        ((parseInt(ag_end[0]) === parseInt(end[0]) &&
          parseInt(end[1]) <= parseInt(ag_end[1])) ||
          parseInt(ag_end[0]) > parseInt(end[0]))
      );
    },

    _validateDateFormat(appointmentDate) {
      //let now = new Date().toISOString().substr(0, 10);
      let now = new Date();
      let year = parseInt(now.getFullYear());
      let day = parseInt(now.getDate());
      let month = parseInt(now.getMonth() + 1);
      //let hour = parseInt(now.getHours());
      let app_date = appointmentDate.split("-");
      //let app_hour = startHour.split(":");
      return (
        parseInt(app_date[0]) >= year &&
        parseInt(app_date[1]) >= month &&
        parseInt(app_date[2]) >= day
      );
    }
  }
};
</script>
