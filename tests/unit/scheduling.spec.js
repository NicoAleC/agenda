import Appointments from "@/views/Appointments.vue";
import Scheduling from "@/components/Scheduling.vue";

import { assert } from "chai";
import { mount, createLocalVue, shallowMount } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import mockAppointments from "./mockAppointments";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";

let store;

describe(" Scheduled Appointments CRUD", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: mockAppointments,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });

  it.only(" Validate that the Appointment data is not empty", () => {
    const wrapper = mount(Scheduling);
    const isValid = wrapper.vm._validateData();
    assert.isFalse(isValid);
  });
  /*it("Validate data shoudl pass if data enter", async () => {
    const wrapper = mount(Scheduling);

    wrapper.vm.$data.name = "test";
    wrapper.vm.$data.description = "Unit test";
    wrapper.vm.$data.date = "06/25/2020";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "14:30";
    wrapper.vm.$data.agendID = "AGN-0002";

    const isValid = wrapper.vm._validateData();
    assert.isTrue(isValid);
  });*/
  it.only(" Validate add schedule appointment ", () => {
    global.alert = message => {
      console.log(message);
    };

    const wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });

    const appointmentToAdd = {
      name: " Test ",
      description: " Unit Test ",
      date: "2020-06-26",
      startHour: "11:00",
      endHour: "12:00"
    };
    wrapper.vm.addAppointment(appointmentToAdd);

    assert.include(
      JSON.stringify(wrapper.vm.scheduledAppointments),
      appointmentToAdd.name
    );
  });
  //it.only(" Update appointment ", () => {
  /*global.alert = message => {
    console.log(message);
  };

    const wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });*/
  //});
});
