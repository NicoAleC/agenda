<template>
  <div>
    <div class="postList">
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar color="#89c1a1">
              <v-toolbar-title>Postponed Appointments</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon color="#304050">
                <v-icon>mdi-home</v-icon>
              </v-btn>
              <v-btn icon color="#304050">
                <v-icon>mdi-face</v-icon>
              </v-btn>
              <v-btn icon color="#304050">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
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
                      <v-btn icon color="#304050" v-on:click="function(){name = post.name; description=post.description; dialogRes = true}">
                        <v-icon>mdi-calendar-today</v-icon>
                      </v-btn>
                      <v-btn
                        v-on:click="function(){name = post.name; description=post.description; dialogEdit = true}"
                        icon
                        color="#304050"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="#304050" v-on:click="deletePostponedApp(post)">
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
    <div class=dialogEdit>
      <v-dialog max-width="600px" v-model="dialogEdit">
        <v-card>
          <v-card-title>
            <h4>Edit Postponed Appointment</h4>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form>
              <p>Name:</p>
              <h1 class="display-1 text--primary">{{name}}</h1>
              <v-textarea label="Description" v-model="description"></v-textarea>
              <v-btn
                class="success mx-0 mt-3"
                @click="function(){dialogEdit=false; updatePostponedApp({name: name, description: description})}"
              >Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
     <div class=dialogReschedule>
      <v-dialog max-width="600px" v-model="dialogRes">
        <v-card>
          <v-card-title>
            <h4>Reschedule Postponed Appointment</h4>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form>
              <p>Name:</p>
              <h1 >{{name}}</h1>
              <p>Description:</p>
              <h1>{{description}}</h1>
              <v-btn
                class="success mx-0 mt-3"
                @click="function(){dialogRes=false}"
              >Reschedule</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
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
      dialogEdit: false,
      dialogRes: false
    };
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
