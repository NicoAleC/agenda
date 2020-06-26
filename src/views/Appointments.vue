<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <h1>Appointments</h1>

      <v-row justify="center">
        <v-layout row justify-space-around>
          <v-col class="text-left">
            <v-btn
              x-large
              class="mb-2"
              @click="sendData(scheduledAppointment, true)"
              >New Appointment</v-btn
            >
          </v-col>
        </v-layout>
        <v-expansion-panels popout>
          <v-expansion-panel
            v-for="(appointment, i) in scheduledAppointments"
            :key="i"
            hide-actions
          >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="5" sm="3" md="2">
                  <v-avatar color="orange">
                    <span class="white--text headline">{{
                      appointment.name | capitalizeAvatar
                    }}</span>
                  </v-avatar>
                </v-col>

                <v-col class="hidden-xs-only" sm="5" md="3">
                  <strong v-html="appointment.name" class="list-participant">{{
                    appointment.name
                  }}</strong>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <strong v-html="appointment.description"></strong>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <strong v-html="appointment.date"></strong>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <strong v-html="appointment.startHour"></strong>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon
                    size="30"
                    class="mr-2"
                    @click="sendData(scheduledAppointments, false)"
                    >mdi-pencil</v-icon
                  >
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  <v-icon
                    size="30"
                    @click="deleteItem(scheduledAppointments.name)"
                    >mdi-delete</v-icon
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-sheet tile height="54" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="View by"
        ></v-select>
        <v-spacer></v-spacer>

        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents"
        ></v-calendar>
      </v-sheet>
      <Scheduling
        :scheduledAppointment="scheduledAppointment"
        :newMovement="newMovement"
        :dialog="dialog"
        @close="dialog = false"
        @addAppointment="addAppointment"
        @updateAppointment="updateAppointment"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Scheduling from "@/components/Scheduling.vue";

export default {
  name: "Appointments",

  components: {
    Scheduling
  },

  data: () => ({
    scheduledAppointment: {},
    newMovement: false,
    dialog: false,
    type: "month",
    mode: "stack",
    types: ["month", "week", "day"],
    value: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    events: [
      {
        name: "Dentist",
        start: "2020-06-18 10:00",
        end: "2020-06-18 11:00",
        color: "green"
      }
    ]
  }),
  methods: {
    ...mapActions([
      "addScheduledAppointment",
      "updateScheduledAppointment",
      "deleteScheduledAppointment"
    ]),

    deleteAppointment() {
      let confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        return true;
      } else {
        return false;
      }
    },

    sendData(scheduledAppointment, newMovement) {
      this.scheduledAppointment = {
        ...scheduledAppointment,
        index: this.participantindex
      };
      this.dialog = true;
      this.newMovement = newMovement;
    },
    addAppointment: function(appointmentToAdd) {
      this.addScheduledAppointment({
        name: appointmentToAdd.name,
        description: appointmentToAdd.description,
        date: appointmentToAdd.date,
        startHour: appointmentToAdd.startHour,
        endHour: appointmentToAdd.endHour
      });

      this.events.push({
        name: appointmentToAdd.name,
        start: `${appointmentToAdd.date} ${appointmentToAdd.startHour}`,
        end: `${appointmentToAdd.date} ${appointmentToAdd.endHour}`,
        color: this.colors[this.rnd(0, this.colors.length - 1)]
      });
    },

    updateAppointment: function(appointmentToUpdate) {
      this.updateScheduledAppointment({
        name: appointmentToUpdate.name,
        description: appointmentToUpdate.description,
        date: appointmentToUpdate.date,
        startHour: appointmentToUpdate.startHour,
        endHour: appointmentToUpdate.endHour
      });
    },

    getEvents() {
      /* this.getScheduledAppointments.forEach(element => {
        this.events.push({
          name: element.name,
          start: `${element.date} ${element.startHour}`,
          end: `${element.date} ${element.endHour}`,
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      });*/
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
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
    ...mapGetters(["getScheduledAppointments"]),
    scheduledAppointments() {
      return this.getScheduledAppointments;
    }
  }
};
</script>
