<template>
  <div>
    <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar color="#89c1a1">
            <v-toolbar-title>Postponed Appointments</v-toolbar-title>
          </v-toolbar>

          <v-container grid-list-lg>
            <v-spacer></v-spacer>
            <v-layout row>
              <v-flex
                v-for="(post, index) in postponedAppointments"
                :key="index"
              >
                <v-card min-width="300" color="#cee5ce" elevation="4">
                  <v-card-text>
                    <p class="display-1 text--primary">{{ post.name }}</p>
                    <div>{{ post.description }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      color="#304050"
                      v-on:click="schedulePostponedApp(post)"
                    >
                      <v-icon>mdi-calendar-today</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="#304050"
                      v-on:click="updatePostponedApp(post)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="#304050"
                      v-on:click="deletePostponedApp(post)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Postponed",
  data() {
    return {
      name: "",
      description: "",
      valid: true,
      menu_date: false,
      showCurrent: true,
      menu_end_hour: false,
      menu_start_hour: false
    };
  },
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
  methods: {
    ...mapActions([
      "addPostponed",
      "updatePostponed",
      "deletePostponed",
      "addScheduledAppointment"
    ]),
    addPostponedApp(postApp) {
      this.addPostponed(postApp);
    },
    updatePostponedApp(postApp) {
      this.updatePostponed(postApp);
    },
    deletePostponedApp(postApp) {
      this.deletePostponed(postApp);
    },
    schedulePostponed(postApp) {
      this.deletePostponed(postApp);
      var scheduleData = {
        id: "APP-2",
        date: "2020-06-26",
        startHour: "11:00",
        endHour: "12:00"
      };
      this.addScheduledAppointment({
        id: scheduleData.id,
        name: postApp.name,
        description: postApp.description,
        date: scheduleData.date,
        startHour: scheduleData.startHour,
        endHour: scheduleData.endHour
      });
    }
  },
  computed: {
    ...mapGetters([
      "getPostponed",
      "getScheduledAppointments",
      "getParticipants"
    ]),
    postponedAppointments() {
      return this.getPostponed;
    },
    scheduledAppintments() {
      return this.getScheduledAppointments;
    },
    participants() {
      return this.getParticipants;
    }
  }
};
</script>
