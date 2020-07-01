<template>
  <div>
    <v-dialog v-model="show" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Delete Agenda</span>
        </v-card-title>
        <v-col cols="12">
          <label>{{ getID }}</label>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click.stop="
            show = false;
            name = '';
          "
          >No</v-btn
        >
        <v-btn color="blue darken-1" text @click.stop="removeAgenda(getID)"
          >Yes</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Agendas",
  props: {
    value: Boolean,
    msg: String
  },
  data() {
    return {
      name: ""
    };
  },
  watch: {
    msg: function() {
      this.name = this.msg;
    }
  },
  methods: {
    ...mapActions(["deleteAgenda"]),
    removeAgenda(idToRemove) {
      let agendaFound = this.agendasGet.find(
        element => element.agendaId === this.getID
      );
      if (idToRemove !== "" && agendaFound.appointments.length === 0) {
        this.deleteAgenda(idToRemove);
      } else {
        alert("This Agenda Can't be Removed");
      }
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
