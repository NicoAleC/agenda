import Appointments from "@/views/Appointments.vue";
import Scheduling from "@/components/Scheduling.vue";

import { assert } from "chai";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";

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
    global.alert = message => {
      console.log(message);
    };

    const wrapper = mount(Scheduling, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });

    const isValid = wrapper.vm._validateData();
    assert.isFalse(isValid);
  });

  it.only(" Validate add schedule appointment. ", () => {
    const wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });

    const appointmentToAdd = {
      id: "APP-2",
      name: " Test ",
      description: " Unit Test ",
      date: "2020-06-26",
      startHour: "11:00",
      endHour: "12:00"
    };
    wrapper.vm.addAppointment(appointmentToAdd);

    assert.include(
      JSON.stringify(wrapper.vm.$store.state.scheduledAppointments),
      appointmentToAdd.name
    );
    //console.log("AddList:" +  JSON.stringify(wrapper.vm.$store.state.scheduledAppointments));
  });

  it.only(" Validate Update Schedule appointment. ", () => {
    global.alert = () => {};
    global.confirm = () => true;

    const wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });

    const appointmentToUpdate = {
      id: "APP-2",
      name: " Appointment to Update ",
      description: " Update Unit Test ",
      date: "2020-06-26",
      startHour: "11:00",
      endHour: "12:00"
    };
    wrapper.vm.updateAppointment(appointmentToUpdate);
    //console.log("UpdateList:" + JSON.stringify(wrapper.vm.$store.state.scheduledAppointments));

    assert.include(
      JSON.stringify(wrapper.vm.$store.state.scheduledAppointments),
      appointmentToUpdate.name
    );
  });

  it.only(" Validate delete schedule appointment. ", () => {
    global.alert = () => {};
    global.confirm = () => true;

    const wrapper = shallowMount(Appointments, {
      store,
      vuetify,
      localVue,
      stubs: ["VTextField"]
    });

    const appointmentToDelete = "APP-2";

    wrapper.vm.deleteAppointment(appointmentToDelete);
    //console.log("DeleteList:" +  JSON.stringify(wrapper.vm.$store.state.scheduledAppointments));

    assert.notInclude(
      JSON.stringify(wrapper.vm.$store.state.scheduledAppointments),
      appointmentToDelete
    );
  });
  it.only(" Validate that the start and end hours are correct", () => {
    global.alert = () => {};

    const wrapper = shallowMount(Scheduling, {
      store,
      vuetify: { iconfont: "md" },
      localVue,
      stubs: ["VTextField"]
    });

    let start = "15:08";
    let end = "12:00";

    //console.log(wrapper.vm._validateStartAndEndHour(start, end));

    const isValid = wrapper.vm._validateStartAndEndHour(start, end);
    assert.isFalse(isValid);

    let agendaStart = "6:00";
    let agendaEnd = "23:50";
    start = "5:00";
    end = "23:00";

    const isValidAgendaHours = wrapper.vm._validateAgendaHours(
      agendaStart,
      agendaEnd,
      start,
      end
    );
    assert.isFalse(isValidAgendaHours);
  });
});
