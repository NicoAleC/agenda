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
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="scheduledAppointment.startHour"
                    label="Start Hour"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="scheduledAppointment.endHour"
                    label="End Hour"
                    required
                  ></v-text-field>
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
              :disabled="!valid"
              text
              @click="emitData()"
              >{{ newMovement ? "SAVE" : "UPDATE" }}</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "scheduledAppointments",
  data: () => ({
    valid: true,
    menu_date: false,
    showCurrent: true,
    scheduledAppointment: {
      name: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      startHour: "",
      endHour: "",
      agendaId: "",
      participants: [],
      index: null
    }
  }),
  props: {
    newMovement: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    }
    /*,
    scheduledAppointment: {
      type: Object,
      default: function() {
        return {
          name: "",
          contactNumber: "",
          index: null
        };
      }
    }*/
  },
  computed: {
    ...mapGetters(["getScheduledAppointments"]),
    scheduledAppointments() {
      return this.getScheduledAppointments;
    }
  },
  methods: {
    ...mapActions(["updateScheduledAppointment"]),

    emitData: function() {
      if (this.newMovement) {
        this.$emit("addAppointment", {
          name: this.scheduledAppointment.name,
          description: this.scheduledAppointment.description,
          date: this.scheduledAppointment.date,
          startHour: this.scheduledAppointment.startHour,
          endHour: this.scheduledAppointment.endHour
        });
      } else {
        this.$emit("updateAppointment", {
          name: this.scheduledAppointment.name,
          description: this.scheduledAppointment.description,
          date: this.scheduledAppointment.date,
          startHour: this.scheduledAppointment.startHour,
          endHour: this.scheduledAppointment.endHour
        });
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
    _validateData() {
      return (
        this.scheduledAppointment.name !== "" &&
        this.scheduledAppointment.description !== "" &&
        this.scheduledAppointment.date !== "" &&
        this.scheduledAppointment.startHour !== "" &&
        this.scheduledAppointment.endHour !== "" &&
        this.scheduledAppointment.agendaId !== ""
      );
    }
  }
};
</script>
<style></style>
