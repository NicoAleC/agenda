<template>
  <div class="test">
    <h1 id="test">Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Test",
  components: {},
  data: () => ({
    name: "",
    contact: "",
    id: "",
    appointment: ""
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