// mocked device data
const mockedDevices = [
    {
      id: 1,
      name: 'POLAR SIEH0025SDA/SO1H0025SDA',
      watts: 2500,
      typeId: 1,
      forScanning: 0,
      scanned: 12
    },
    {
      id: 2,
      name: 'Bosch Climate 5000 9000BTU',
      watts: 2900,
      typeId: 1,
      forScanning: 10,
      scanned: 0
    },
    {
      id: 3,
      name: 'Bosch Climate 8500 9000BTU',
      watts: 2900,
      typeId: 1,
      forScanning: 13,
      scanned: 12
    },
    {
      id: 4,
      name: 'DAIKIN FTXG20LS/RXG20L klíma Emura - ezüst',
      watts: 2100,
      typeId: 1,
      forScanning: 0,
      scanned: 50
    },
    {
      id: 5,
      name: 'DAIKIN FTXZ25N/RXZ25N',
      watts: 2500,
      typeId: 1,
      forScanning: 33,
      scanned: 42
    },
    {
      id: 6,
      name: 'DAIKIN FLXS50B/RXS50L',
      watts: 4900,
      typeId: 1,
      forScanning: 10,
      scanned: 0
    },
    {
      id: 7,
      name: 'Polar MO4H080SAX multi kültéri egység',
      watts: 8100,
      typeId: 2,
      forScanning: 0,
      scanned: 0
    },
];

// mocked device types
const mockedDeviceTypes = [
    { type: 'split', id: 1 },
    { type: 'multi split', id: 2 },
];  

import Vue from 'vue'

export const devices = {
    namespaced: true,
    state: {
        devices: mockedDevices,
        deviceTypes : mockedDeviceTypes
    },
    getters: {
    },
    actions: {
        // *** DEVICES ***
        saveNewDevice({ commit }, newDevice) {
            // INSERT backend call here
            newDevice.id = Math.floor(Math.random() * Math.floor(100000)) + 10; // temporary: random, get it from backend instead
            commit('addDevice', newDevice);
        },
        updateDevice({ commit }, editedDevice) {
            // INSERT backend call here
            commit('editDevice', editedDevice);
        },
        deleteDevice({ commit }, deviceId) {
            // INSERT backend call here
            commit('removeDevice', deviceId);
        },

        // *** DEVICE TYPES ****
        saveNewDeviceType({ commit }, newDeviceType) {
            // INSERT backend call here
            newDeviceType.id = Math.floor(Math.random() * Math.floor(100000)) + 10; // temporary: random, get it from backend instead
            commit('addDeviceType', newDeviceType);
        },
        updateDeviceType({ commit }, editedDeviceType) {
            // INSERT backend call here
            commit('editDeviceType', editedDeviceType);
        },
        deleteDeviceType({ commit }, deviceTypeId) {
            // INSERT backend call here
            commit('removeDeviceType', deviceTypeId);
        }
    },
    mutations: {
        // *** DEVICES ***
        addDevice(state,  newDevice) {
            state.devices.push(JSON.parse(JSON.stringify(newDevice))); // add a clone of the modal values
        },
        editDevice(state, editedDevice) {
            Vue.set(    // vue.set is needed to trigger reacivity
                state.devices, 
                state.devices.findIndex(d => d.id == editedDevice.id), 
                editedDevice
            );
        },
        removeDevice(state, deviceId) {
            state.devices = state.devices.filter(t => t.id != deviceId);
        },

        // *** DEVICE TYPES ***
        addDeviceType(state,  newDeviceType) {
            state.deviceTypes.push(JSON.parse(JSON.stringify(newDeviceType))); // add a clone of the modal values
        },
        editDeviceType(state, editedDeviceType) {
            state.deviceTypes.filter(t => t.id == editedDeviceType.id)[0].type = editedDeviceType.type;
        },
        removeDeviceType(state, deviceTypeId) {
            state.deviceTypes = state.deviceTypes.filter(t => t.id != deviceTypeId);
        }
    }
}