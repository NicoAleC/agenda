<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <h1 id="participants-title">Participants</h1>
      <div v-for="data in getParticipants" :key="(data.selectedDate)">
        <div>data.name</div>
        <div>data.contactNumber</div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {},

  data: () => ({
    selectedMovement: {},
    name: "",
    cellphone: "",
    idparticipant: ""
  }),
  methods: {
    ...mapActions(["addParticipant", "updateParticipant", "deleteParticipant"]),

    addNewParticipant(name, cellphone) {
      this.addParticipant({
        name: name,
        cellphone: cellphone
      });
    },
    update(name, cellphone, idparticipant) {
      this.updateParticipant({
        name: name,
        cellphone: cellphone,
        id: idparticipant
      });
    },
    delete(idparticipant) {
      this.deleteParticipant({
        code: idparticipant
      });
    }
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participants() {
      return this.getParticipants;
    }
  }
};
</script>
