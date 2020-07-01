<template>
  <div>
    <div class="postList">
      <v-layout>
        <v-flex>
          <v-card>
            <v-container grid-list-lg>
              <v-spacer></v-spacer>
              <v-layout row>
                <v-flex v-for="post in postponedAppointments" :key="post.id">
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
                        v-on:click="
                          id = post.id;
                          name = post.name;
                          description = post.description;
                          dialogRes = true;
                        "
                      >
                        <v-icon>mdi-calendar-today</v-icon>
                      </v-btn>
                      <v-btn
                        v-on:click="
                          id = post.id;
                          name = post.name;
                          description = post.description;
                          dialogEdit = true;
                        "
                        icon
                        color="#304050"
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
    <div class="dialogEdit">
      <v-dialog max-width="600px" v-model="dialogEdit">
        <v-card>
          <v-card-title>
            <h4>Edit Postponed Appointment</h4>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="rules.nameRule"
              ></v-text-field>
              <v-textarea
                label="Description"
                v-model="description"
                :rules="rules.lengthRule"
              ></v-textarea>
              <v-btn
                class="success mx-0 mt-3"
                @click="
                  dialogEdit = false;
                  updatePostponedApp({
                    id: id,
                    name: name,
                    description: description
                  });
                "
                >Save</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="dialogReschedule">
      <v-dialog max-width="800px" v-model="dialogRes">
        <v-card>
          <v-card-title>
            <h4>Reschedule Postponed Appointment</h4>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form>
              <v-text-field
                readonly
                auto-grow
                label="Name"
                v-model="name"
              ></v-text-field>
              <v-textarea
                readonly
                auto-grow
                label="Description"
                v-model="description"
              ></v-textarea>
              <v-select
                v-model="idAgenda"
                :items="getAgendasList"
                :rules="rules.agenda"
                label="Agenda"
                item-text="name"
                item-value="agendaId"
                :hint="idAgenda"
                persistent-hint
                return-value
              ></v-select>
              <v-text-field
                readonly
                label="Date"
                v-model="date"
                v-on:click="datePopup = true"
              ></v-text-field>
              <v-menu
                v-model="datePopup"
                :close-on-content-click="false"
                :nudge-right="40"
                offset-y
                min-width="250px"
              >
                <v-date-picker
                  v-model="date"
                  @input="datePopup = false"
                ></v-date-picker>
              </v-menu>
              <div class="TimePickers">
                <v-row justify="space-around" align="center">
                  <v-col style="width: 290px; flex: 0 1 auto">
                    <h2>Start Hour</h2>
                    <v-time-picker
                      v-model="startHour"
                      :max="endHour"
                    ></v-time-picker>
                  </v-col>
                  <v-col style="width: 290px; flex: 0 1 auto">
                    <h2>End Hour</h2>
                    <v-time-picker
                      v-model="endHour"
                      :min="startHour"
                    ></v-time-picker>
                  </v-col>
                </v-row>
              </div>
              <v-select
                v-model="participantsList"
                :items="participants"
                :rules="rules.agenda"
                label="Participants"
                multiple
                item-text="name"
                item-value="participantId"
                return-value
              ></v-select>
              <v-btn class="success mx-0 mt-3" @click="packReschedule()"
                >Reschedule</v-btn
              >
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
      id: "",
      name: "",
      description: "",
      idAgenda: "",
      date: new Date().toISOString().substr(0, 10),
      startHour: "",
      endHour: "",
      participantsList: [],
      dialogEdit: false,
      dialogRes: false,
      datePopup: false,
      rules: {
        lengthRule: [
          v => v.length <= 256 || "Field must be less than 256 characters"
        ],
        nameRule: [
          v => !!v || "Name is required",
          v => v.length <= 32 || "Name must be less than 32 characters"
        ],
        agendaRule: [v => !!v || "Item is required"]
      }
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
      const newPost = {
        id: this.lastId() + 1,
        name: postApp.name,
        description: postApp.description
      };
      this.addPostponed(newPost);
    },
    updatePostponedApp(postApp) {
      this.updatePostponed(postApp);
    },
    deletePostponedApp(postApp) {
      this.deletePostponed(postApp);
    },
    schedulePostponed(postApp) {
      this.deletePostponed(postApp);
      this.addScheduledAppointment({
        id: postApp.idAgenda,
        name: postApp.name,
        description: postApp.description,
        date: postApp.date,
        startHour: postApp.startHour,
        endHour: postApp.endHour,
        participants: postApp.participants
      });
    },
    lastId() {
      return Math.max.apply(
        Math,
        this.postponedAppointments.map(post => post.id)
      );
    },
    checkEmptyFields() {
      return (
        this.id === "" ||
        this.name === "" ||
        this.description === "" ||
        this.idAgenda === "" ||
        this.startHour === "" ||
        this.endHour === ""
      );
    },
    packReschedule() {
      if (!this.checkEmptyFields()) {
        this.dialogRes = false;
        this.schedulePostponed({
          id: this.id,
          idAgenda: this.idAgenda,
          name: this.name,
          description: this.description,
          date: this.date,
          startHour: this.startHour,
          endHour: this.endHour,
          participants: this.participantsList
        });
      }
    }
  },
  computed: {
    ...mapGetters([
      "getPostponed",
      "getScheduledAppointments",
      "getParticipants",
      "getAgendas"
    ]),
    postponedAppointments() {
      return this.getPostponed;
    },
    scheduledAppointments() {
      return this.getScheduledAppointments;
    },
    participants() {
      return this.getParticipants;
    },
    getAgendasList() {
      return this.getAgendas;
    }
  }
};
</script>
