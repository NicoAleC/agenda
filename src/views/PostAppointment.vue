<template>
  <div>
    <v-toolbar color="#89c1a1">
      <v-toolbar-title>Postponed Appointments</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="#304050" v-on:click="redirectHome()" class="mx-9">
        Home
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        icon
        color="#304050"
        v-on:click="redirectAppointments()"
        class="mx-16"
      >
        Appointments
        <v-icon>mdi-mailbox</v-icon>
      </v-btn>
    </v-toolbar>
    <PostAppointment />
  </div>
</template>

<script>
import PostAppointment from "@/components/PostAppointment.vue";
export default {
  name: "Postponed",
  components: { PostAppointment },
  methods: {
    redirectHome() {
      this.$router.push("/");
    },
    redirectAppointments() {
      this.$router.push("appointments/ANG-0");
    }
  }
};
</script>
