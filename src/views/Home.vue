<template>
  <div id="home">
    <v-row id="Home-first-table" class="fill-height">
      <v-col>
        <v-toolbar dark color="#5E35B1">
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
          >
          </v-select>
          <v-spacer></v-spacer>
          <v-btn
            id="home-btn-addAgenda"
            icon
            @click.stop="toggleComponentAgendas"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon @click.stop="toggleComponentDeleteAgendas">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon @click.stop="toggleComponentUpdateAgendas"
              >mdi-rename-box</v-icon
            >
          </v-btn>
        </v-toolbar>
        <v-sheet height="64">
          <v-toolbar flat color="#81D4FA">
            <v-btn outlined class="mr-4" color="white--text" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="white--text" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
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
    },
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ]
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.agendasGet.forEach(concatAgendas => {
      concatAgendas.appointments.forEach(appointmentsIn => {
        this.events.push(appointmentsIn);
      });
    });
  },
  watch: {
    choosedAgenda: function(newSelectedAgenda) {
      this.events = [];
      let agendaFound = this.agendasGet.find(
        element => element.agendaId === newSelectedAgenda.agendaId
      );
      agendaFound.appointments.forEach(appointmentsIn => {
        this.events.push(appointmentsIn);
      });
      this.setId();
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
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    setId() {
      this.idlooked(this.choosedAgenda.agendaId);
    }
  }
};
</script>
