<template>
  <div class="test">
    <v-container class="my-10" grid-list-md>
      <h1 id="test">Home</h1>
      <v-layout row justify-space-around>
        <v-col class="text-left"></v-col>

        <v-col class="text-right">
          <v-btn
            color="primary"
            dark
            x-large
            class="ma-2"
            v-on:click="$router.push('participants')"
          >Añadir Participantes</v-btn>

          <v-btn color="primary" dark x-large class="ma-2" v-on:click="sendData()">Mis Participantes</v-btn>
        </v-col>
      </v-layout>

      <ParticipantsAppointment :dialog="dialog" @close="dialog = false" />
    </v-container>
  </div>
</template>

<script>
import ParticipantsAppointment from "@/components/ParticipantsAppointment.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Test",
  components: { ParticipantsAppointment },
  data: () => ({
    name: "",
    contact: "",
    id: "",
    appointment: "",
    dialog: false
  }),
  methods: {
    ...mapActions([
      "addParticipantToAnAppointment",
      "deleteParticipantFromAnAppointment"
    ]),
    addParticipantToAScheduleAppointment(name, contact, id, appointment) {
      this.addParticipantToAnAppointment({
        name: name,
        contactNumber: contact,
        participantId: id,
        appointmentName: appointment
      });
    },
    deleteParticipantToAScheduleAppointment(appointment, participantId) {
      this.deleteParticipantFromAnAppointment({
        participantId: participantId,
        appointmentName: appointment
      });
    },
    sendData() {
      /*this.selectedParticipant = {
        ...selectedParticipant
      };*/
      this.dialog = true;
      //this.newMovement = newMovement;
    }
  },
  computed: {
    ...mapGetters(["getScheduled"]),
    scheduled() {
      return this.getScheduled;
    }
  }
};
</script>