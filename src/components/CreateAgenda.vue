<template>
  <div>
    <v-dialog v-model="show" persistent max-width="500px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-card-title>
          <span class="headline">Create Agenda</span>
        </v-card-title>
        <v-col cols="12">
          <v-text-field
            id="CTA-Name"
            v-model="name"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            id="CTA-BeginH"
            v-model="beginning"
            label="Biggining Hour[00:00]24H"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            id="CTA-EndH"
            v-model="ending"
            label="Ending Hour[00:00]24H"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            id="CTA-Desc"
            v-model="description"
            label="Description"
            required
          ></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            class="ma-2"
            text
            @click.stop="
              show = false;
              name = '';
            "
            >Cancel</v-btn
          >
          <v-btn
            id="CTA-btn-Create"
            color="blue darken-1"
            class="ma-2"
            text
            @click.stop="newAgenda"
            >Create</v-btn
          >
        </v-card-actions>
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
      beginning: "",
      ending: "",
      description: ""
    };
  },
  computed: {
    ...mapGetters(["getAgendas"]),
    agendasGet() {
      return this.getAgendas;
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions(["addAgenda"]),
    createAgendaID() {
      let idGenerated = "ANG-";
      idGenerated =
        idGenerated +
        `${Number(
          this.agendasGet[this.agendasGet.length - 1].agendaId.split("-", 2)[1]
        ) + 1}`;
      return idGenerated;
    },
    newAgenda() {
      if (
        this.name === "" &&
        this.description === "" &&
        this.beginning === "" &&
        this.ending === ""
      ) {
        alert("Fill all the Components");
      } else {
        const newAgenda = {
          agendaId: this.createAgendaID(),
          name: this.name,
          description: this.description,
          startHour: this.beginning,
          endHour: this.ending,
          appointments: []
        };
        this.show = false;
        this.name = "";
        this.description = "";
        this.beginning = "";
        this.ending = "";
        this.addAgenda(newAgenda);
      }
    }
  }
};
</script>
