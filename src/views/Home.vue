<template>
  <div id="home">
    <v-row id="Home-first-table" class="fill-height">
      <v-col>
        <v-toolbar dark color="#5E35B1">
          <v-toolbar-title text-color="#FFFFFF" class="white--text"
            >Agendas</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-select
            v-model="choosedAgenda"
            :hint="`${choosedAgenda.agendaId}, ${choosedAgenda.description}`"
            :items="idNameGetAgendas"
            item-text="name"
            item-value="agendaId"
            label="ALL"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn
            id="home-btn-addAgenda"
            icon
            @click.stop="toggleComponentAgendas"
            class="mx-4"
          >
            Add
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon @click.stop="toggleComponentDeleteAgendas" class="mx-4">
            Del
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click.stop="toggleComponentUpdateAgendas" class="mx-4">
            Edit
            <v-icon>mdi-rename-box</v-icon>
          </v-btn>
          <!-- <v-btn -->
          <!-- icon -->
          <!-- color="#FFFFFF" -->
          <!-- v-on:click="redirectAppointments()" -->
          <!-- class="mx-14" -->
          <!-- > -->
          <!-- Appointments -->
          <!-- <v-icon>mdi-mailbox</v-icon> -->
          <!-- </v-btn> -->
          <router-link
            :to="{
              name: 'Appointments',
              params: { agendaId: choosedAgenda.agendaId }
            }"
            style="text-decoration: none; color: white;"
          >
            Appointments
            <v-icon @click="sendAgenda()">mdi-mailbox</v-icon>
          </router-link>
        </v-toolbar>
      </v-col>
      <agendas ref="newAgenda" v-model="dialogAgendas" />
      <updateAgenda ref="updateAgendas" v-model="dialogUpdateAgenda" />
      <DeleteAgenda ref="supressAgenda" v-model="dialogDeleteAgenda" />
    </v-row>
  </div>
</template>
<script>
import agendas from "../components/CreateAgenda.vue";
import updateAgenda from "../components/UpdateAgenda.vue";
import DeleteAgenda from "../components/DeleteAgenda.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    agendas,
    updateAgenda,
    DeleteAgenda
  },
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    toSend: "",
    dialogAgendas: false,
    dialogUpdateAgenda: false,
    dialogDeleteAgenda: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    choosedAgenda: {
      agendaId: "ANG-0",
      description: "All your meetings",
      name: "all"
    }
  }),

  watch: {
    choosedAgenda: function(newSelectedAgenda) {
      this.events = [];
      let agendaFound = this.agendasGet.find(
        element => element.agendaId === newSelectedAgenda.agendaId
      );
      this.setId();
      console.log(agendaFound);
    }
  },
  computed: {
    ...mapGetters(["getAgendas"]),
    agendasGet() {
      return this.getAgendas;
    },

    idNameGetAgendas() {
      let idNameAgenda = [];
      this.getAgendas.forEach(agendas => {
        idNameAgenda.push({
          agendaId: agendas.agendaId,
          description: agendas.description,
          name: agendas.name
        });
      });
      return idNameAgenda;
    }
  },
  methods: {
    ...mapActions(["idlooked"]),
    toggleComponentAgendas() {
      this.dialogAgendas = !this.dialogAgendas;
    },
    toggleComponentDeleteAgendas() {
      this.dialogDeleteAgenda = !this.dialogDeleteAgenda;
    },
    toggleComponentUpdateAgendas() {
      this.dialogUpdateAgenda = !this.dialogUpdateAgenda;
    },
    setId() {
      this.idlooked(this.choosedAgenda.agendaId);
    }
  }
};
</script>
