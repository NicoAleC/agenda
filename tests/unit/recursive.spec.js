/* eslint-disable no-unused-vars */
import Appointments from "@/views/Appointments.vue";
import Scheduling from "@/components/Scheduling.vue";
import VueRouter from "vue-router";

import { assert } from "chai";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockAppointments from "./mockAppointments";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
import { iterator } from 'core-js/fn/symbol';

describe(" Scheduled Appointments CRUD", () => {
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
    wrapper = mount(Scheduling, {
      store,
      vuetify,
      localVue,
      router
    });
    const appointment1 = {
      id: "APP-2",
      name: " Test ",
      description: " Unit Test ",
      date: "2020-08-24",
      startHour: "11:00",
      endHour: "12:00"
    };
    const appointment2 = {
      id: "APP-2",
      name: " Test ",
      description: " Unit Test ",
      date: "2020-08-23",
      startHour: "11:00",
      endHour: "12:00"
    };
    const aux1 = wrapper.vm.$store.state.scheduledAppointments;
    wrapper.vm.createRecursive(appointment1, appointment2);
    const aux2 = wrapper.vm.$store.state.scheduledAppointments;
    assert.equal(aux1, aux2);
  });

  it.only("Recreates the appointment selected the times it specifies", () => {
    wrapper = mount(Scheduling, {
      store,
      vuetify,
      localVue,
      router
    });
    const appointment1 = {
      id: "APP-2",
      name: " Test ",
      description: " Unit Test ",
      date: "2020-08-24",
      startHour: "11:00",
      endHour: "12:00"
    };
    const appointment2 = {
      id: "APP-2",
      name: " Test ",
      description: " Unit Test ",
      date: "2020-08-23",
      startHour: "11:00",
      endHour: "12:00"
    };
    const aux1 = wrapper.vm.$store.state.scheduledAppointments;
    wrapper.vm.createRecursive(appointment1, appointment2);
    const aux2 = wrapper.vm.$store.state.scheduledAppointments;
    assert.equal(aux1 + 4, aux2);
  });
});
