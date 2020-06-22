<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span id="move" class="headline">Participants</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field autocomplete="off" v-model="selectedParticipant.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  autocomplete="off"
                  v-model="selectedParticipant.contactNumber"
                  label="PhoneNumber"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              emitUpdateAndAdd(
                selectedParticipant.name,
                selectedParticipant.contactNumber,
                selectedParticipant.participantId
              )
            "
          >{{ newMovement ? "SAVE" : "UPDATE" }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ParticipantsDialog",
  data() {
    return {
      participantName: "",
      participantPhone: ""
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
    selectedParticipant: {
      type: Object,
      default: function() {
        return {
          participantId: "",
          name: "",
          contactNumber: "",
          index: null
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getParticipants"]),
    participants() {
      return this.getParticipants;
    }
  },
  methods: {
    ...mapActions(["updateParticipant"]),

    emitUpdateAndAdd(names, contactNumber, id) {
      if (this.newMovement) {
        this.$emit("addNewParticipant", {
          name: names,
          contactNumber: contactNumber,
          participantId: this.generateId()
        });
      } else {
        this.$emit("updateNewParticipant", {
          name: names,
          contactNumber: contactNumber,
          participantId: id
        });
      }

      this.reset();
    },

    generateId() {
      const numberOfParticipants = this.participants.length;
      let newId = 0;
      if (numberOfParticipants > 0) {
        const lastId = this.participants[numberOfParticipants - 1]
          .participantId;
        newId = parseInt(lastId.split("-")[1]) + 1;
      }
      const part = "PART - " + newId;
      console.log(part);
      return part;
    },
    reset() {
      this.$emit("close");
      this.selectedParticipant.name = "";
      this.selectedParticipant.contactNumber = "";
    }
  }
};
</script>
