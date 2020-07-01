import { assert } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";

import CreateAgenda from "@/components/CreateAgenda.vue";
import DeleteAgenda from "@/components/DeleteAgenda.vue";
import UpdateAgenda from "@/components/UpdateAgenda.vue";
import mockAgendas from "./mockAgendas";

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

describe("Home.vue", () => {
  let localVue;
  let vuetify;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuetify);

    vuetify = new Vuetify();
  });

  it.only("Create New Agenda", () => {
    global.alert = message => {
      console.log(message);
    };
    const store = new Vuex.Store({
      state: mockAgendas,
      actions,
      mutations,
      getters,
      modules: {}
    });
    const wrapper = mount(CreateAgenda, {
      store,
      vuetify,
      localVue
    });
    var idGenerated = "ANG-";
    idGenerated =
      idGenerated +
      `${Number(
        wrapper.vm.$store.state.agendas[
          wrapper.vm.$store.state.agendas.length - 1
        ].agendaId.split("-", 2)[1]
      ) + 1}`;
    assert.equal(wrapper.vm.createAgendaID(), idGenerated);
    const expecteLength = wrapper.vm.$store.state.agendas.length + 1;
    wrapper.vm.addAgenda({
      agendaId: idGenerated,
      name: "prueba",
      description: "prueba",
      startHour: "prueba",
      endHour: "prueba",
      appointments: []
    });
    assert.equal(wrapper.vm.$store.state.agendas.length, expecteLength);
  });
  it.only("Delte Agenda", () => {
    global.alert = message => {
      console.log(message);
    };
    const store = new Vuex.Store({
      state: mockAgendas,
      actions,
      mutations,
      getters,
      modules: {}
    });
    const wrapper = mount(DeleteAgenda, {
      store,
      vuetify,
      localVue
    });
    const expecteLength = wrapper.vm.$store.state.agendas.length - 1;
    wrapper.vm.deleteAgenda("ANG-3");
    assert.equal(wrapper.vm.$store.state.agendas.length, expecteLength);
  });
  it.only("Update Agenda", () => {
    global.alert = message => {
      console.log(message);
    };
    const store = new Vuex.Store({
      state: mockAgendas,
      actions,
      mutations,
      getters,
      modules: {}
    });
    const wrapper = mount(UpdateAgenda, {
      store,
      vuetify,
      localVue
    });
    const toUpdate = {
      agendaId: "ANG-1",
      name: "cambiado",
      startHour: "10:00",
      endingHour: "12:00",
      description: "changed"
    };
    wrapper.vm.updateAgenda(toUpdate);
    let agendaFound = wrapper.vm.$store.state.agendas.find(
      element => element.agendaId === "ANG-1"
    );
    assert.equal(agendaFound.name, toUpdate.name);
  });
});
