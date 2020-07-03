import Appointments from "@/views/Appointments.vue";
import VueRouter from "vue-router";

import { assert } from "chai";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockAppointments from "./mockAppointments";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";

describe("Recursive tests", () => {
  let localVue;
  let vuetify;
  let router;
  let store;
  let wrapper;

  before(() => {
    global.alert = message => {
      console.log(message);
    };
  });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);
    localVue.use(VueRouter);

    vuetify = new Vuetify();
    router = new VueRouter({
      routes: []
    });
    store = new Vuex.Store({
      state: mockAppointments,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });

  it.only("Doesn't allow a starting date higer than the ending date", () => {
    wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      router,
      mocks: {
        $vuetify: { breakpoint: {} }
      }
    });
    wrapper.vm.selectedToRepeat = wrapper.vm.scheduledAppointments[0];
    wrapper.vm.rStartDate = "2020-07-03";
    wrapper.vm.rEndDate = "2020-07-01";
    const aux1 = wrapper.vm.$store.state.scheduledAppointments.length;
    wrapper.vm.addRecursive();
    const aux2 = wrapper.vm.$store.state.scheduledAppointments.length;
    assert.equal(aux1, aux2);
  });

  it.only("Recreates the appointment selected the times it specifies", () => {
    wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      router,
      mocks: {
        $vuetify: { breakpoint: {} }
      }
    });
    wrapper.vm.selectedToRepeat = wrapper.vm.scheduledAppointments[0];
    wrapper.vm.rStartDate = "2020-07-03";
    wrapper.vm.rEndDate = "2020-07-05";
    const aux1 = wrapper.vm.$store.state.scheduledAppointments.length;
    wrapper.vm.addRecursive();
    const aux2 = wrapper.vm.$store.state.scheduledAppointments.length;
    assert.equal(aux1 + 3, aux2);
  });
});
