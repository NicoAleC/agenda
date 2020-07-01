import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import Participants from "@/views/Participants.vue";
import Test from "@/views/Test.vue";

//import store from "@/store";
import mockParticipant from "./mockParticipants";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
let store;

describe("Participants CRUD", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: mockParticipant,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });
  it.only("Default participants", () => {
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    let expectedLength = 2;
    const participants = wrapper.vm.$store.state.participants;
    assert.equal(participants.length, expectedLength);
  });

  it.only("Add participants work rigth", () => {
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    const expectedLength = 3;
    const numberOfParticipants = wrapper.vm.$store.state.participants.length;
    wrapper.vm.addNewParticipant({
      name: "Pablo",
      contactNumber: "69501045",
      participantId: "Part1"
    });
    assert.equal(numberOfParticipants + 1, expectedLength);
  });
  it.only("Rendering participants after add one", async () => {
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    await wrapper.vm.addNewParticipant({
      name: "Renata",
      contactNumber: "69501045",
      participantId: "Part4"
    });
    await wrapper.vm.$forceUpdate();
    const list = wrapper.findAll(".list-participant");
    assert.strictEqual(list.at(3).text(), "Renata");
  });

  it.only("Editing a participant is enable", () => {
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    const participants = wrapper.vm.$store.state.participants;
    wrapper.vm.updateNewParticipant({
      name: "Anonimo",
      contactNumber: "69501045",
      participantId: "PART-001"
    });
    assert.isTrue(participants[0].name === "Anonimo");
  });

  it.only("The title should be rendered", () => {
    global.requestAnimationFrame = cb => cb();
    global.alert = message => {
      console.log(message);
    };
    const expectedTitle = "Participants";
    const wrapper = mount(Participants, {
      store,
      localVue,
      vuetify,
      stubs: ["VTextField", "VSnackbar"]
    });

    const titleInComponent = wrapper.find("#participants-title");

    assert.equal(titleInComponent.text(), expectedTitle);
  });
  it.only("Should Add participant to an appointment, just add", () => {
    const wrapper = mount(Test, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    const expectedLength = 2;
    const numberOfParticipants =
      wrapper.vm.$store.state.scheduledAppointments[0].participants.length;
    //console.log(numberOfParticipants);

    wrapper.vm.addParticipantToAScheduleAppointment(
      "Pablo",
      "69501045",
      "PART-004",
      "APP-1"
    );
    assert.equal(numberOfParticipants + 1, expectedLength);
  });
  it("Should Delete participant from an appointment, just delete", () => {
    const wrapper = mount(Test, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "Snackbar"]
    });
    const expectedLength = 1;
    const numberOfParticipants =
      wrapper.vm.$store.state.scheduledAppointments[0].participants.length;
    wrapper.vm.deleteParticipantToAScheduleAppointment("APP-1", "PART-004");

    assert.equal(numberOfParticipants - 1, expectedLength);
  });
  it("Should not be able to add a participant that is already in the appointment", () => {
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    const expectedLength = 2;
    const number =
      wrapper.vm.$store.state.scheduledAppointments[0].participants.length;
    console.log(number);
    wrapper.vm.$router.push({
      name: "Participants",
      params: { id: "Dentist" }
    });

    wrapper.vm.addParticipantToAScheduleAppointment(
      "Pablo Marmol",
      "69501045",
      "PART-005"
    );
    const numberOfParticipants =
      wrapper.vm.$store.state.scheduledAppointments[0].participants.length;
    console.log(numberOfParticipants);
    assert.equal(numberOfParticipants, expectedLength);
  });
  it("Delete participants work right", () => {
    global.alert = () => {};
    global.confirm = () => true;
    const wrapper = mount(Participants, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField", "VSnackbar"]
    });
    const initiallength = wrapper.vm.$store.state.participants;
    wrapper.vm.deleteItem("PART-001");
    assert.equal(initiallength.length - 1, 3);
  });
});
