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
              <v-flex v-for="(post,index) in postponedAppointments" :key="index">
                <v-card min-width="300" color="#cee5ce" elevation="4">
                  <v-card-text>
                    <p class="display-1 text--primary">{{post.name}}</p>
                    <div>{{post.description}}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon color="#304050">
                      <v-icon>mdi-calendar-today</v-icon>
                    </v-btn>

                    <v-btn icon color="#304050">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <v-btn icon color="#304050">
                      <v-icon>mdi-pencil</v-icon>
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
    addPostponedApp() {
      this.addPostponed({
        name: this.name,
        description: this.description
      });
      this.name = "";
      this.description = "";
    },
    updatePostponedApp() {
      this.updatePostponed({
        name: this.name,
        description: this.description
      });

      this.name = "";
      this.description = "";
    },
    deletePostponedApp() {
      this.deletePostponed({
        name: this.name,
        description: this.description
      });

      this.name = "";
      this.description = "";
    },
    schedulePostponed(scheduleData) {
      this.deletePostponed({
        name: this.name,
        description: this.description
      });

      this.addScheduledAppointment({
        id: scheduleData.id,
        name: this.name,
        description: this.description,
        date: scheduleData.date,
        startHour: scheduleData.startHour,
        endHour: scheduleData.endHour
      });

      this.name = "";
      this.description = "";
    },
    getParticipantsList: function() {
      let list = [];
      this.participants.forEach(element => {
        list.push(element.name);
      });
      return list;
    },
    getColor() {
      var color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      console.log(color);
      return color;
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
