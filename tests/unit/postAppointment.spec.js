import Vuex from "vuex";
import Vuetify from "vuetify";
import { assert } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import PostAppointment from "@/components/PostAppointment.vue";
import mockPostAppointment from "./mockPostAppointment";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";

describe("Postponed Appointments", () => {
  let localVue;
  let vuetify;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: mockPostAppointment,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });
  it.only("Add a postponed appointment", () => {
    const wrapper = shallowMount(PostAppointment, { store, localVue, vuetify });
    const newPostponed = { name: "Test", description: "default description" };
    let expectedLenght =
      wrapper.vm.$store.state.postponedAppointments.length + 1;
    wrapper.vm.addPostponedApp(newPostponed);
    assert.equal(
      expectedLenght,
      wrapper.vm.$store.state.postponedAppointments.length
    );
  });
  it.only("Edit a postponed appointment", () => {
    const wrapper = shallowMount(PostAppointment, { store, localVue, vuetify });
    const updatedPostponed = {
      name: "Test",
      description: "updated description"
    };
    wrapper.vm.updatePostponedApp(updatedPostponed);
    const foundPost = wrapper.vm.$store.state.postponedAppointments.find(
      appoint => appoint.name === updatedPostponed.name
    );
    assert.equal(updatedPostponed.name, foundPost.name);
    assert.equal(updatedPostponed.description, foundPost.description);
  });
  it.only("Delete a postponed appointment", () => {
    const wrapper = shallowMount(PostAppointment, { store, localVue, vuetify });
    const toDeletePostponed = {
      name: "Test",
      description: "updated description"
    };
    let expectedLenght =
      wrapper.vm.$store.state.postponedAppointments.length - 1;
    wrapper.vm.deletePostponedApp(toDeletePostponed);
    assert.equal(
      expectedLenght,
      wrapper.vm.$store.state.postponedAppointments.length
    );
  });
  it.only("Scheduling a postponed appointment should appear on the Appointments list and leave the postponed list", () => {
    const wrapper = shallowMount(PostAppointment, { store, localVue, vuetify });
    const toBeAppointed = { name: "Tobe", description: "description" };
    wrapper.vm.addPostponedApp(toBeAppointed);
    let currentLengthP =
      wrapper.vm.$store.state.postponedAppointments.length - 1;
    let currentLengthA =
      wrapper.vm.$store.state.scheduledAppointments.length + 1;
    const appointmentRenewed = {
      id: "APP-2",
      name: toBeAppointed.name,
      description: toBeAppointed.description,
      date: "2020-06-26",
      startHour: "11:00",
      endHour: "12:00"
    };
    wrapper.vm.schedulePostponed(appointmentRenewed);
    assert.equal(
      currentLengthP,
      wrapper.vm.$store.state.postponedAppointments.length
    );
    assert.equal(
      currentLengthA,
      wrapper.vm.$store.state.scheduledAppointments.length
    );
  });
});
