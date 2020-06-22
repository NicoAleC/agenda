/* eslint-disable prettier/prettier */
import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import Participants from "@/views/Participants.vue";
import store from "@/store";

describe("Participants.vue", () => {
    let localVue;
    let vuetify;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        localVue.use(Vuetify);

        vuetify = new Vuetify();
    });
    it.only("Default participants", () => {
        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue
        });
        let expectedLength = 1;
        const participants = wrapper.vm.participants;
        assert.equal(participants.length, expectedLength);
    });
    it.only("Delete participants works right", () => {
        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue
        });
        const initiallength = wrapper.vm.participants;
        wrapper.vm.delete("PART-001");
        assert.equal(initiallength.length, 1);
    });
    it.only("Don`t add participants if some fields are empty", () => {

        global.alert = message => {
            console.log(message);
        };

        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue
        });
        const expectedLength = 2;
        const numberOfParticipants = wrapper.vm.participants;
        wrapper.vm.addNewParticipant("Pablo Rivas", "69501045");
        assert.equal(numberOfParticipants.length, expectedLength);
    });
    it.only("Don't update any participant if new name is not filled", () => {
        const localVue = createLocalVue();


        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue
        });
        const participants = wrapper.vm.participants;
        wrapper.vm.update("Anonimo", "69501045", "PART-001");
        assert.isTrue(participants[0].name === "Anonimo");
    });

    it.only("The title should be rendered", () => {
        const expectedTitle = "Participants";
        const wrapper = mount(Participants, {
            store,
            localVue,
            vuetify
        });

        const titleInComponent = wrapper.find("#participants-title");

        assert.equal(titleInComponent.text(), expectedTitle);
    });

});
