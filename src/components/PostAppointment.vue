<template>
  <div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Postponed",
  data() {
    return {
      name: "",
      description: "",
      valid: true,
      menu_date: false,
      showCurrent: true,
      menu_end_hour: false,
      menu_start_hour: false
    };
  },
  props: {
    newMovement: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    scheduledAppointment: {
      type: Object,
      default: function() {
        return {
          id: "",
          name: "",
          description: "",
          date: new Date().toISOString().substr(0, 10),
          startHour: "",
          endHour: "",
          agendaId: "",
          participants: []
        };
      }
    }
  },
  methods: {
    ...mapActions([
      "addPostponed",
      "updatePostponed",
      "deletePostponed",
      "addScheduledAppointment"
    ]),
    addPostponedApp() {
      this.addPostponed({
        name: this.name,
        description: this.description
      });
      this.name = "";
      this.description = "";
    },
    updatePostponedApp() {
      this.updatePostponed({
        name: this.name,
        description: this.description
      });

      this.name = "";
      this.description = "";
    },
    deletePostponedApp() {
      this.deletePostponed({
        name: this.name,
        description: this.description
      });

      this.name = "";
      this.description = "";
    },
    schedulePostponed(scheduleData) {
      this.deletePostponed({
        name: this.name,
        description: this.description
      });

      this.addScheduledAppointment({
        id: scheduleData.id,
        name: this.name,
        description: this.description,
        date: scheduleData.date,
        startHour: scheduleData.startHour,
        endHour: scheduleData.endHour
      });

      this.name = "";
      this.description = "";
    },
    getParticipantsList: function() {
      let list = [];
      this.participants.forEach(element => {
        list.push(element.name);
      });
      return list;
    }
  },
  computed: {
    ...mapGetters([
      "getPostponed",
      "getScheduledAppointments",
      "getParticipants"
    ]),
    postponedAppointments() {
      return this.getPostponed;
    },
    scheduledAppintments() {
      return this.getScheduledAppointments;
    },
    participants() {
      return this.getParticipants;
    }
  }
};
</script>
