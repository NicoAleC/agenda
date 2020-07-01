<template>
  <div>
    <v-dialog v-model="show" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Agenda</span>
        </v-card-title>
        <v-col cols="12">
          <v-text-field v-model="name" label="Name" required></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field
            v-model="startHour"
            label="Biggining Hour[00:00]24H"
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field
            v-model="endingHour"
            label="Ending Hour[00:00]24H"
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click.stop="
            show = false;
            name = '';
          "
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click.stop="updating">Update</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Agendas",
  props: {
    value: Boolean
  },
  data() {
    return {
      name: "",
      startHour: "",
      endingHour: "",
      description: ""
    };
  },

  methods: {
    ...mapActions(["updateAgenda"]),
    updating() {
      let agendaFound = this.agendasGet.find(
        element => element.agendaId === this.getID
      );
      if (agendaFound.appointments.length > 0) {
        this.updateAgenda({
          agendaId: agendaFound.agendaId,
          name: this.name,
          startHour: agendaFound.startHour,
          endHour: agendaFound.endHour,
          description: this.description
        });
      } else {
        this.updateAgenda({
          agendaId: agendaFound.agendaId,
          name: this.name,
          startHour: this.startHour,
          endingHour: this.endingHour,
          description: this.description
        });
      }
      this.show = false;
      this.name = "";
      this.description = "";
      this.startHour = "";
      this.endingHour = "";
    }
  },
  computed: {
    ...mapGetters(["getAgendas", "getIdLooked"]),
    agendasGet() {
      return this.getAgendas;
    },
    getID() {
      return this.getIdLooked;
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
