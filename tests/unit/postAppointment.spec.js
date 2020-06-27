import Vuex from "vuex";
import Vuetify from "vuetify";
import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
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
    const wrapper = mount(PostAppointment, { store, localVue, vuetify });
    wrapper.setData({ name: "Test", description: "default description" });
    let expectedLenght =
      wrapper.vm.$store.state.postponedAppointments.length + 1;
    wrapper.vm.addPostponedApp();
    assert.equal(
      expectedLenght,
      wrapper.vm.$store.state.postponedAppointments.length
    );
  });
  it.only("Edit a postponed appointment", () => {
    const wrapper = mount(PostAppointment, { store, localVue, vuetify });
    const updatedPostponed = {
      name: "Test",
      description: "updated description"
    };
    wrapper.setData({ name: "Test", description: "updated description" });
    wrapper.vm.updatePostponedApp();
    const foundPost = wrapper.vm.$store.state.postponedAppointments.find(
      appoint => appoint.name === updatedPostponed.name
    );
    assert.equal(updatedPostponed.name, foundPost.name);
    assert.equal(updatedPostponed.description, foundPost.description);
  
  });
  it.only("Delete a postponed appointment", () => {
    const wrapper = mount(PostAppointment, { store, localVue, vuetify });
    wrapper.setData({ name: "Test", description: "updated description" });
    let expectedLenght =
      wrapper.vm.$store.state.postponedAppointments.length - 1;
    wrapper.vm.deletePostponedApp();
    assert.equal(
      expectedLenght,
      wrapper.vm.$store.state.postponedAppointments.length
    );
  });
});
