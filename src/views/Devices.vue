<template>
    <div>
        <!-- Keszulekek tablazat -->
        <v-card>
            <v-card-title>
                <v-btn fab dark small color="indigo" @click.native="prepareDeviceModalForNewDevice()">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <span class="headline">
                    Készülékek
                </span>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchDevices" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
                <div>
                  <v-btn color="purple" dark>QR nyomtatás</v-btn>
                </div>
            </v-card-title>
            <v-data-table :headers="headerDevices" :items="devices" :search="searchDevices" hide-actions no-data-text="nincsenek készülékek">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.watts }}</td>
                    <td class="text-xs-left">{{ getDeviceTypeNameFromId(props.item.typeId) }}</td>
                    <td class="text-xs-right">{{ props.item.forScanning }}</td>
                    <td class="text-xs-right">{{ props.item.scanned }}</td>
                    <td class="text-xs-right">
                      <v-btn dark fab small color="red" v-if="props.item.forScanning + props.item.scanned == 0">
                        <v-icon dark @click.native="deleteDevice(props.item.id)">delete</v-icon>
                      </v-btn>
                      <v-btn color="info" @click.native="prepareDeviceModalForEditDevice(props.item.id)">szerkesztés</v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Nincs találat "{{ searchDevices }}" kifejezésre.
                </v-alert>
            </v-data-table>
        </v-card>

        <!-- Keszulek tipusok tablazat -->
        <v-card class="mt-4">
            <v-card-title>
                <v-btn fab dark small color="indigo">
                  <v-icon dark @click.native="prepareDeviceTypeModalForNewDevice()">add</v-icon>
                </v-btn>
                <span class="headline">
                    Készülék típusok
                </span>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headerTypes" :items="types" hide-actions no-data-text="nincsenek készülék típusok">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ getDeviceCountForTypeId(props.item.id) }}</td>
                    <td class="text-xs-right">
                        <v-btn dark fab small color="red" v-if="getDeviceCountForTypeId(props.item.id) == 0">
                          <v-icon dark @click.native="deleteDeviceType(props.item.id)">delete</v-icon>
                        </v-btn>
                        <v-btn color="info" @click.native="prepareDeviceTypeModalForEditDevice(props.item.id)">szerkesztés</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <!-- Keszulekek form dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="deviceDialog.visible" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Készülék</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="deciveForm" v-model="deviceDialog.valid">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Megnevezés" required :rules="requiredRule" v-model="deviceDialog.values.name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field label="Watt érték" type="number" required :rules="requiredRule" v-model="deviceDialog.values.watts"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          :items="deviceTypeListForSelector"
                          label="Típus"
                          v-model="deviceDialog.values.typeId"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="deviceDialog.visible = false">Mégsem</v-btn>
                <v-btn color="info" @click.native="deviceDialog.values.id ? editDevice() : addNewDevice()" :disabled="!deviceDialog.valid">
                  <span v-if="this.deviceDialog.values.id">Mentés</span>
                  <span v-if="!this.deviceDialog.values.id">Hozzáadás</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <!-- Keszulekek tipus form dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="deviceTypeDialog.visible" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Készülék típus</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="deciveTypeForm" v-model="deviceTypeDialog.valid">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Típus megnevezés" required :rules="requiredRule" v-model="deviceTypeDialog.values.type"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="deviceTypeDialog.visible = false">Mégsem</v-btn>
                <v-btn color="info" @click.native="deviceTypeDialog.values.id ? editDeviceType(deviceTypeDialog.values.id) : addNewDeviceType()" :disabled="!deviceTypeDialog.valid">
                  <span v-if="this.deviceTypeDialog.values.id">Mentés</span>
                  <span v-if="!this.deviceTypeDialog.values.id">Hozzáadás</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    methods: {
      // *** DEVICES ***
      // prepare device modal for new device entry
      prepareDeviceModalForNewDevice() {
        this.$refs.deciveForm.reset();
        this.deviceDialog.values.id = null;
        this.deviceDialog.visible = true;
      },
      // prepare device modal for editing device
      prepareDeviceModalForEditDevice(id) {
        this.deviceDialog.values = JSON.parse(JSON.stringify(this.devices.filter(d => d.id == id)[0])); // clone values to form
        this.deviceDialog.visible = true;
      },
      // adds new device
      addNewDevice() {
        this.$store.dispatch('devices/saveNewDevice', this.deviceDialog.values);
        this.deviceDialog.visible = false;
      },
      // edits device
      editDevice() {
        this.$store.dispatch('devices/updateDevice', this.deviceDialog.values);
        this.deviceDialog.visible = false;
      },
      // deletes device
      deleteDevice(id) {
        this.$store.dispatch('devices/deleteDevice', id);
      },

      // *** DEVICE TYPES ***
      // prepare device type modal for new device entry
      prepareDeviceTypeModalForNewDevice() {
        this.$refs.deciveTypeForm.reset();
        this.deviceTypeDialog.values.id = null;
        this.deviceTypeDialog.visible = true;
      },
      // prepare device type modal for editing device
      prepareDeviceTypeModalForEditDevice(id) {
        this.deviceTypeDialog.values = JSON.parse(JSON.stringify(this.types.filter(t => t.id == id)[0])); // clone values to form
        this.deviceTypeDialog.visible = true;
      },
      // adds new device type
      addNewDeviceType() {
        this.$store.dispatch('devices/saveNewDeviceType', this.deviceTypeDialog.values);
        this.deviceTypeDialog.visible = false;
      },
      // edits device type
      editDeviceType() {
        this.$store.dispatch('devices/updateDeviceType', this.deviceTypeDialog.values);
        this.deviceTypeDialog.visible = false;
      },
      // deletes device type
      deleteDeviceType(id) {
        this.$store.dispatch('devices/deleteDeviceType', id);
      },
      // number of devices with a certain type
      getDeviceCountForTypeId(id) {
        return this.devices.filter(t => t.typeId == id).length;
      },
      // get device type name from device type ID
      getDeviceTypeNameFromId(id) {
        return this.types.filter(t => t.id == id)[0].type;
      }
    },
    data () {
      return {
        searchDevices: '',
        deviceDialog: {
          visible: false,
          valid: true,
          values: { name: '', watts: '', typeId: 0, id: null, forScanning: 0, scanned: 0 }
        },
        deviceTypeDialog: {
          visible: false,
          valid: true,
          values: { type: '', id: null, amount: 0 }
        },
        requiredRule: [ v => !!v || 'kötelező mező' ],
        headerDevices: [
          { text: 'Megnevezés', align: 'left', value: 'name' },
          { text: 'Watt pontok', align: 'right', value: 'watts' },
          { text: 'Típus', align: 'right', value: 'type' },
          { text: 'QR scannelhető', align: 'right', value: 'forScanning' },
          { text: 'QR scannelt', align: 'right', value: 'scanned' },
          { text: ''}
        ],
        headerTypes: [
          { text: 'Típus', align: 'left', value: 'name' },
          { text: 'Készülék db', align: 'right', value: 'amount' },
          { text: ''}
        ]
      }  
    },
    computed: {
      // data coming from vuex store
      ...mapState('devices', { 
        devices: 'devices', 
        types: 'deviceTypes'
      }),
      // generates device type array for selector element
      deviceTypeListForSelector() {
        return this.types.map(t => ({ text: t.type, value: t.id }));
      }  
    }
  }
</script>