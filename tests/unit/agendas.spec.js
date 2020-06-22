import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/Agendas.vue";

describe("Agendas.vue", () => {
    let localVue;
    let vuetify;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        localVue.use(Vuetify);

        vuetify = new Vuetify();
    });

    it.only("Create New Agenda", () => {
        const wrapper = mount(Agenda, {
            store,
            vuetify,
            localVue
        });
        const newAgenda = { name: "Prueba" };
        let expectedLength = wrapper.vm.$store.state.agendas.length + 1;
        wrapper.vm.create(newAgenda);
        assert.equal(wrapper.vm.$store.state.agendas.length, expectedLength);
    });
    it.only("Editing Agenda", () => {
        const wrapper = mount(Agenda, {
            store,
            vuetify,
            localVue
        });
        const updatedAgenda = { name: "hola" };
        wrapper.vm.update(updatedAgenda);
        wrapper.vm.$store.state.agendas.find(elment => elment.name === updatedAgenda.name);
        assert.equal(elment , updatedAgenda);
    });
    it.only("Delete Agenda", () => {
        const wrapper = mount(Agenda, {
            store,
            vuetify,
            localVue
        });
        const deleteAgenda = { name: "hola" };
        let expectedLength = wrapper.vm.$store.state.agendas.length + 1;
        wrapper.vm.delete(deleteAgenda);
        assert.equal(expectedLength, wrapper.vm.$store.state.agendas.length);
    });
});
