<template>
  <div>
    <v-toolbar color="#68DAD5">
      <v-toolbar-title>Appointments</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="#304050"
        v-if="route !== 'ANG-0'"
        v-on:click="sendData(scheduledAppointment, true)"
        class="mx-5"
      >
        Add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon color="#304050" v-on:click="redirectHome()" class="mx-6">
        Home
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon color="#304050" v-on:click="redirectPostponed()" class="mx-10">
        Postponed
        <v-icon>mdi-watch</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="my-10" grid-list-md>
      <v-sheet tile height="64" class="d-flex">
        <v-btn icon class="ma-5" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar" class="ma-5">{{ $refs.calendar.title }}</v-toolbar-title>
        <v-btn icon class="ma-5" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-col sm="3">
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-3"
            label="View by"
          ></v-select>
        </v-col>
      </v-sheet>
      <v-sheet height="800">
        <v-calendar
          class="ma-4"
          ref="calendar"
          v-model="value"
          :type="type"
          :events="events"
          :event-color="getEventColor"
          @click:event="showAppointment"
          @change="drawAppointments"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card min-width="500px" flat>
            <v-toolbar :color="selectedAppointment.color" dark>
              <v-row justify="center">
                <v-toolbar-title v-html="selectedAppointment.name"></v-toolbar-title>
              </v-row>
            </v-toolbar>
            <v-card-text>
              <div class="mt-8 text-center">Description: {{ appointmentE.description }}</div>
              <div class="mt-8 text-center">
                Duration: {{ appointmentE.startHour }} -
                {{ appointmentE.endHour }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-col class="grey--text text-truncate hidden-sm-and-down" align="center">
                <v-icon size="35" @click="sendData(appointmentE, false)">mdi-pencil</v-icon>
              </v-col>

              <v-col class="grey--text text-truncate hidden-sm-and-down" align="center">
                <router-link
                  :to="{
                    name: 'Participants',
                    params: { id: appointmentE.id }
                  }"
                >
                  <v-icon size="35">mdi-account</v-icon>
                </router-link>
              </v-col>
              <v-col class="grey--text text-truncate hidden-sm-and-down" align="center">
                <v-icon size="35" @click="sendDialog(appointmentE)">mdi-account-check</v-icon>
              </v-col>
              <v-col class="grey--text text-truncate hidden-sm-and-down" align="center">
                <v-icon size="35" @click="deleteAppointment(appointmentE.id)">mdi-delete</v-icon>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <Scheduling
        :scheduledAppointment="scheduledAppointment"
        :newMovement="newMovement"
        :dialog="dialog"
        @close="dialog = false"
        @addAppointment="addAppointment"
        @updateAppointment="updateAppointment"
      />
      <ParticipantsAppointment
        :scheduledAppointment="scheduledAppointment"
        :dialog2="dialog2"
        @close="dialog2 = false"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Scheduling from "@/components/Scheduling.vue";
import ParticipantsAppointment from "@/components/ParticipantsAppointment.vue";

export default {
  name: "Appointments",

  components: {
    Scheduling,
    ParticipantsAppointment
  },

  data: () => ({
    scheduledAppointment: {},
    appointmentE: {},
    newMovement: false,
    dialog: false,
    dialog2: false,
    type: "month",
    types: ["month", "week", "day"],
    value: "",
    selectedAppointment: {},
    selectedElement: null,
    selectedOpen: false,
    route: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    events: []
  }),
  methods: {
    ...mapActions([
      "addScheduledAppointment",
      "updateScheduledAppointment",
      "deleteScheduledAppointment",
      "addPostponed",
      "addAppointmentsToAgendas"
    ]),
    redirectHome() {
      this.$router.push("/");
    },
    redirectPostponed() {
      this.$router.push("/appointments");
      this.$router.push("postponed");
    },
    sendData: function(scheduledAppointment, newMovement) {
      this.scheduledAppointment.agendaId = this.$route.params.agendaId;
      this.scheduledAppointment = {
        ...scheduledAppointment
      };
      this.dialog = true;
      this.newMovement = newMovement;
    },
    sendDialog: function(scheduledAppointment) {
      this.scheduledAppointment = {
        ...scheduledAppointment
      };
      this.dialog2 = true;
    },

    addAppointment: function(appointmentToAdd) {
      this.addScheduledAppointment(appointmentToAdd);
      this.setEvents(appointmentToAdd);
      this.scheduledAppointment = appointmentToAdd;
    },

    addAppointmentToAgenda: function() {
      this.addAppointmentsToAgendas(this.scheduledAppointment);
    },

    updateAppointment: function(appointmentToUpdate) {
      this.updateScheduledAppointment(appointmentToUpdate);

      this.events = this.events.filter(
        event => event.id !== appointmentToUpdate.id
      );
      this.setEvents(appointmentToUpdate);
    },

    deleteAppointment: function(deleteScheduledAppointment) {
      if (this._validateDeleteAppointment(deleteScheduledAppointment)) {
        if (
          confirm(
            "This appointment cannot be deleted, do you want to postpone it??"
          )
        ) {
          //Postponing

          return true;
        }
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.deleteScheduledAppointment(deleteScheduledAppointment);
          this.events = this.events.filter(
            event => event.id !== deleteScheduledAppointment
          );
          this.selectedOpen = false;
          return true;
        }
      }
    },

    _validateDeleteAppointment(appointmentId) {
      let now = new Date();
      let year = parseInt(now.getFullYear());
      let month = parseInt(now.getMonth() + 1);
      let day = parseInt(now.getDate());

      let date_appointment = "";
      this.scheduledAppointments.forEach(element => {
        if (element.id === appointmentId) {
          date_appointment = element.date;
        }
      });

      let app = date_appointment.split("-");

      return (
        parseInt(app[0]) === year &&
        parseInt(app[1]) === month &&
        parseInt(app[2]) === day
      );
    },

    getEventColor(event) {
      return event.color;
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    setEvents: function(app) {
      this.events.push({
        id: app.id,
        name: app.name,
        start: `${app.date} ${app.startHour}`,
        end: `${app.date} ${app.endHour}`,
        color: this.colors[this.rnd(0, this.colors.length - 1)]
      });
    },

    showAppointment: function({ nativeEvent, event }) {
      const open = () => {
        this.selectedAppointment = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 15);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 15);
      } else {
        open();
      }

      nativeEvent.stopPropagation();

      this.scheduledAppointments.forEach(element => {
        if (element.id === this.selectedAppointment.id) {
          this.appointmentE = element;
        }
      });
    },
    drawAppointments: function() {
      this.events = [];
      this.route = this.$route.params.agendaId;

      this.scheduledAppointments.forEach(element => {
        if (this.route === "ANG-0") {
          this.setEvents(element);
        } else if (element.agendaId === this.route) {
          this.setEvents(element);
        }
      });
    },
    addPostponed(postApp) {
      const newPost = {
        id: this.lastIdPostponed() + 1,
        name: postApp.name,
        description: postApp.description
      };
      this.addPostponed(newPost);
    },
    lastIdPostponed() {
      return Math.max.apply(
        Math,
        this.postponedAppointments.map(post => post.id)
      );
    }
  },

  computed: {
    ...mapGetters(["getScheduledAppointments", "getPostponed", "getAgendas"]),
    scheduledAppointments() {
      return this.getScheduledAppointments;
    },
    draw() {
      return this.events;
    },
    postponedAppointments() {
      return this.getPostponed;
    },

    agendas_list() {
      return this.getAgendas;
    }
  }
};
</script>
