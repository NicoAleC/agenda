<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Postponed",
  data() {
    return {
      name: "",
      description: ""
    };
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
    }
  },
  computed: {
    ...mapGetters(["getPostponed", "getScheduledAppointments"]),
    postponedAppointments() {
      return this.getPostponed;
    },
    scheduledAppintments() {
      return this.getScheduledAppointments;
    }
  }
};
</script>
