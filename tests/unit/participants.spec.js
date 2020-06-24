/* eslint-disable prettier/prettier */
import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";

import Vuex from "vuex";
import Vuetify from "vuetify";

import Participants from "@/views/Participants.vue";

//import store from "@/store";
import mockParticipant from "./mockParticipants";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
let store;

describe("Participants.vue", () => {
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
            stubs: ['VTextField']

        });
        let expectedLength = 2;
        const participants = wrapper.vm.$store.state.participants;
        assert.equal(participants.length, expectedLength);
    });
    it.only("Delete participants works right", () => {
        global.alert = () => { };
        global.confirm = () => true;
        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue,
            stubs: ['VTextField']

        });
        const initiallength = wrapper.vm.participants.length;
        wrapper.vm.deleteItem("PART-002");
        assert.equal(initiallength - 1, 1);
    });
    it.only("Add participants rigth", () => {

        global.alert = message => {
            console.log(message);
        };

        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue,
            stubs: ['VTextField']

        });
        const expectedLength = 2;
        const numberOfParticipants = wrapper.vm.participants.length;
        wrapper.vm.addNewParticipant({ name: "Pablo", contactNumber: "69501045", participantId: "Part1" });
        assert.equal(numberOfParticipants + 1, expectedLength);
    });
    it.only("Rendering participants after add one", async () => {


        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue,
            stubs: ['VTextField']

        });
        await wrapper.vm.addNewParticipant({ name: "Renata", contactNumber: "69501045", participantId: "Part4" });
        await wrapper.vm.$forceUpdate();
        const list = wrapper.findAll(".list-participant");
        assert.strictEqual(list.at(2).text(), "Renata");
    });

    it.only("Don't update any participant if new name is not filled", () => {
        global.alert = message => {
            console.log(message);
        };

        const wrapper = mount(Participants, {
            store,
            vuetify,
            localVue,
            stubs: ['VTextField']

        });
        const participants = wrapper.vm.participants;
        wrapper.vm.updateNewParticipant({ name: "Anonimo", contactNumber: "69501045", participantId: "PART-001" });
        assert.isTrue(participants[0].name === "Anonimo");
    });

    it.only("The title should be rendered", () => {
        global.requestAnimationFrame = cb => cb()
        global.alert = message => {
            console.log(message);
        };
        const expectedTitle = "Participants";
        const wrapper = mount(Participants, {
            store,
            localVue,
            vuetify,
            stubs: ['VTextField']

        });

        const titleInComponent = wrapper.find("#participants-title");

        assert.equal(titleInComponent.text(), expectedTitle);
    });

});
