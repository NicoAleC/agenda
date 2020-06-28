<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            {{
            newMovement ? "New Participant" : " Update a Participant"
            }}
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="text-center">
                  <v-avatar color="red" size="100">
                    <span
                      class="white--text headline"
                    >{{ selectedParticipant.name | capitalizeAvatar }}</span>
                  </v-avatar>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="selectedParticipant.name"
                    label="Name"
                    :counter="25"
                    :rules="rules.nameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="selectedParticipant.contactNumber"
                    label="PhoneNumber"
                    :counter="9"
                    :rules="rules.phoneRules"
                    required
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
              :disabled="!valid"
              text
              @click="
                emitUpdateAndAdd(
                  selectedParticipant.name,
                  selectedParticipant.contactNumber,
                  selectedParticipant.participantId)"
            >{{ newMovement ? "SAVE" : "UPDATE" }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ParticipantsDialog",
  data: () => ({
    valid: true,
    rules: {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      phoneRules: [
        v => !!v || "Phone is required",
        v => (v && v.length >= 7) || "Phone must be at least 7 characters",
        v => (v && v.length <= 9) || "Phone must be less than  9 characters"
      ]
    }
  }),
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
  filters: {
    capitalizeAvatar: function(value) {
      if (!value) return "";
      value = value.toString();
      let name = value.split(" ")[0];
      let lastName = value.substring(name.length).trim();

      let fullName =
        value.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
      return fullName;
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
