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
    ...mapActions(["addPostponed", "updatePostponed", "deletePostponed"]),
    addPostponedApp() {
      this.addPostponed({
        name: this.name,
        description: this.description
      });
    },
    updatePostponedApp() {
      this.updatePostponed({
        name: this.name,
        description: this.description
      });
    },
    deletePostponedApp() {
      this.deletePostponed({
        name: this.name,
        description: this.description
      });
    }
  },
  computed: {
    ...mapGetters(["getPostponed"]),
    postponedAppointments() {
      return this.getPostponed;
    }
  }
};
</script>
